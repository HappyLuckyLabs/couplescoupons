require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { ServerClient } = require('postmark');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const postmark = process.env.POSTMARK_API_KEY
  ? new ServerClient(process.env.POSTMARK_API_KEY)
  : null;

async function fixOrder(orderId) {
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

    console.log('📦 Fixing order:', order.order_number);

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

    console.log('✅ Updated order to paid');

    // Send email
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
        console.log('✅ Sent email to:', order.buyer_email);
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }
    }

    console.log('\n🎉 Order fixed!');
    console.log(`   Access URL: ${order.access_url}`);

  } catch (error) {
    console.error('Failed:', error);
  }
}

const orderId = process.argv[2] || '7b35d105-b610-410f-a4b7-607848e43681';
fixOrder(orderId);
