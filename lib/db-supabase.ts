import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Use Supabase REST API instead of Prisma for better serverless compatibility
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper functions to mimic Prisma API
export const db = {
  couponPack: {
    findMany: async (options?: { where?: any; orderBy?: any; take?: number }) => {
      let query = supabase.from('cc_coupon_packs').select('*');

      if (options?.where?.isActive !== undefined) {
        query = query.eq('is_active', options.where.isActive);
      }

      if (options?.orderBy?.displayOrder) {
        query = query.order('display_order', { ascending: options.orderBy.displayOrder === 'asc' });
      }

      if (options?.take) {
        query = query.limit(options.take);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    findUnique: async (options: { where: { id?: string; slug?: string }; include?: any }) => {
      let query = supabase.from('cc_coupon_packs').select('*');

      if (options.where.id) {
        query = query.eq('id', options.where.id);
      } else if (options.where.slug) {
        query = query.eq('slug', options.where.slug);
      }

      const { data, error } = await query.single();
      if (error) throw error;

      // If include coupons, fetch them separately
      if (options.include?.coupons && data) {
        const { data: coupons, error: couponsError } = await supabase
          .from('cc_coupon_templates')
          .select('*')
          .eq('pack_id', data.id)
          .order('display_order', { ascending: true })
          .limit(options.include.coupons.take || 1000);

        if (!couponsError) {
          return { ...data, coupons: coupons || [] };
        }
      }

      return data;
    }
  },

  order: {
    create: async (options: { data: any }) => {
      const { data, error } = await supabase
        .from('cc_orders')
        .insert(options.data)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (options: { where: { id: string }; data: any }) => {
      const { data, error } = await supabase
        .from('cc_orders')
        .update(options.data)
        .eq('id', options.where.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    findUnique: async (options: { where: { id?: string; accessCode?: string }; include?: any }) => {
      let query = supabase.from('cc_orders').select('*');

      if (options.where.id) {
        query = query.eq('id', options.where.id);
      } else if (options.where.accessCode) {
        query = query.eq('access_code', options.where.accessCode);
      }

      const { data, error } = await query.single();
      if (error) throw error;
      return data;
    }
  },

  promoCode: {
    findUnique: async (options: { where: { code: string } }) => {
      const { data, error } = await supabase
        .from('cc_promo_codes')
        .select('*')
        .eq('code', options.where.code)
        .single();

      if (error) return null;
      return data;
    }
  },

  couponTemplate: {
    findMany: async (options: { where: { packId: string }; orderBy?: any }) => {
      let query = supabase.from('cc_coupon_templates').select('*');

      query = query.eq('pack_id', options.where.packId);

      if (options.orderBy?.displayOrder) {
        query = query.order('display_order', { ascending: options.orderBy.displayOrder === 'asc' });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  },

  userCoupon: {
    create: async (options: { data: any }) => {
      const { data, error } = await supabase
        .from('cc_user_coupons')
        .insert(options.data)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    findMany: async (options: { where: { orderId: string }; orderBy?: any }) => {
      let query = supabase.from('cc_user_coupons').select('*');

      query = query.eq('order_id', options.where.orderId);

      if (options.orderBy?.displayOrder) {
        query = query.order('display_order', { ascending: options.orderBy.displayOrder === 'asc' });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },

    findUnique: async (options: { where: { id: string }; include?: any }) => {
      let query = supabase.from('cc_user_coupons').select('*');

      query = query.eq('id', options.where.id);

      const { data, error } = await query.single();
      if (error) throw error;

      // If include order, fetch it
      if (options.include?.order && data) {
        const { data: order } = await supabase
          .from('cc_orders')
          .select('*')
          .eq('id', data.order_id)
          .single();

        return { ...data, order };
      }

      return data;
    },

    update: async (options: { where: { id: string }; data: any }) => {
      const { data, error } = await supabase
        .from('cc_user_coupons')
        .update(options.data)
        .eq('id', options.where.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  faq: {
    findMany: async (options: { where?: { isPublished: boolean }; orderBy?: any }) => {
      let query = supabase.from('cc_faqs').select('*');

      if (options.where?.isPublished !== undefined) {
        query = query.eq('is_published', options.where.isPublished);
      }

      if (options.orderBy?.displayOrder) {
        query = query.order('display_order', { ascending: options.orderBy.displayOrder === 'asc' });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  }
};
