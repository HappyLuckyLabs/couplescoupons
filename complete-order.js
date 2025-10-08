require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const { ServerClient } = require('postmark');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const postmark = process.env.POSTMARK_API_KEY
  ? new ServerClient(process.env.POSTMARK_API_KEY)
  : null;

async function completeOrder(orderId) {
  const now = new Date().toISOString();

  try {
    // Get order
    const { data: order, error: orderError } = await supabase
      .from('cc_orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found:', orderError);
      return;
    }

    console.log('📦 Processing order:', order.order_number);
    console.log('   Pack:', order.pack_name);
    console.log('   Buyer:', order.buyer_email);

    // Get coupon templates for this pack
    const { data: templates, error: templatesError } = await supabase
      .from('cc_coupon_templates')
      .select('*')
      .eq('pack_id', order.pack_id)
      .order('display_order', { ascending: true });

    if (templatesError) {
      console.error('Error fetching templates:', templatesError);
      return;
    }

    console.log(`   Creating ${templates.length} coupons...`);

    // Create user coupons
    const userCoupons = templates.map((template) => ({
      id: uuidv4(),
      order_id: order.id,
      coupon_template_id: template.id,
      title: template.title,
      description: template.description,
      icon_url: template.icon_url,
      tip: template.tip,
      is_redeemed: false,
      display_order: template.display_order,
      created_at: now,
      updated_at: now
    }));

    const { error: couponsError } = await supabase
      .from('cc_user_coupons')
      .insert(userCoupons);

    if (couponsError) {
      console.error('Error creating coupons:', couponsError);
      return;
    }

    console.log('   ✅ Created coupons');

    // Update order status
    const { error: updateError } = await supabase
      .from('cc_orders')
      .update({
        status: 'paid',
        confirmation_email_sent_at: now,
        gift_email_sent_at: now,
        updated_at: now
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      return;
    }

    console.log('   ✅ Updated order to paid');

    // Send emails
    console.log('   📧 Sending emails...');

    if (postmark) {
      try {
        await postmark.sendEmailWithTemplate({
          From: 'noreply@couplescoupons.com',
          To: order.buyer_email,
          TemplateAlias: 'coupon-pack',
          TemplateModel: {
            buyer_name: order.buyer_name,
            receiver_name: order.receiver_name,
            pack_name: order.pack_name,
            order_number: order.order_number,
            access_code: order.access_code,
            access_url: order.access_url,
            custom_message: order.custom_message || '',
            pdf_url: order.pdf_url || '',
          },
        });
        console.log('   ✅ Sent confirmation email');
      } catch (emailError) {
        console.error('   ❌ Email error:', emailError.message);
      }
    } else {
      console.log('   ⚠️  Postmark not configured, skipping emails');
    }

    console.log('\n🎉 Order completed successfully!');
    console.log(`   Access URL: ${order.access_url}`);

  } catch (error) {
    console.error('Failed to complete order:', error);
  }
}

// Get order ID from command line or use the one from the JSON
const orderId = process.argv[2] || '7b35d105-b610-410f-a4b7-607848e43681';
completeOrder(orderId);
