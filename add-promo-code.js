require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addPromoCode() {
  const now = new Date().toISOString();

  try {
    const { data, error } = await supabase
      .from('cc_promo_codes')
      .insert({
        id: uuidv4(),
        code: 'CC100',
        description: '100% discount for testing',
        discount_type: 'percentage',
        discount_value: 100,
        is_active: true,
        created_at: now,
        updated_at: now
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating promo code:', error);
      return;
    }

    console.log('✅ Created promo code: CC100 (100% off)');
    console.log(data);
  } catch (error) {
    console.error('Failed:', error);
  }
}

addPromoCode();
