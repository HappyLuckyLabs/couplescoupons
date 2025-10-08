/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

// Helper to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// Helper to convert camelCase to snake_case
function toSnakeCase(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

// Database helper functions matching Prisma API
export const db = {
  couponPack: {
    findMany: async ({ where, orderBy, take }: { where?: { isActive?: boolean }; orderBy?: { displayOrder?: string }; take?: number } = {}) => {
      let query = supabase.from("cc_coupon_packs").select("*");

      if (where?.isActive !== undefined) {
        query = query.eq("is_active", where.isActive);
      }

      if (orderBy?.displayOrder) {
        const order = orderBy.displayOrder === "asc" ? true : false;
        query = query.order("display_order", { ascending: order });
      }

      if (take) {
        query = query.limit(take);
      }

      const { data, error } = await query;
      if (error) throw error;
      return toCamelCase(data || []);
    },

    findUnique: async ({ where, include }: { where: { id?: string; slug?: string }; include?: { coupons?: { take?: number; orderBy?: { displayOrder?: string } } } }) => {
      let query = supabase.from("cc_coupon_packs").select("*");

      if (where.id) {
        query = query.eq("id", where.id);
      } else if (where.slug) {
        query = query.eq("slug", where.slug);
      }

      const { data: pack, error } = await query.single();
      if (error) {
        // PGRST116 means no rows found, return null instead of throwing
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      // If include coupons
      if (include?.coupons && pack) {
        let couponsQuery = supabase
          .from("cc_coupon_templates")
          .select("*")
          .eq("pack_id", pack.id);

        if (include.coupons.orderBy?.displayOrder) {
          const order = include.coupons.orderBy.displayOrder === "asc" ? true : false;
          couponsQuery = couponsQuery.order("display_order", { ascending: order });
        } else {
          couponsQuery = couponsQuery.order("display_order", { ascending: true });
        }

        couponsQuery = couponsQuery.limit(include.coupons.take || 1000);

        const { data: coupons } = await couponsQuery;

        return toCamelCase({ ...pack, coupons: coupons || [] });
      }

      return toCamelCase(pack);
    },
  },

  order: {
    create: async ({ data }: any) => {
      // Generate UUID and timestamps if not provided (Prisma did this automatically)
      const now = new Date().toISOString();
      const dataWithDefaults = {
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        ...data,
      };

      const { data: order, error } = await supabase
        .from("cc_orders")
        .insert(toSnakeCase(dataWithDefaults))
        .select()
        .single();

      if (error) throw error;
      return toCamelCase(order);
    },

    update: async ({ where, data }: any) => {
      // Add updatedAt timestamp (Prisma @updatedAt did this automatically)
      const dataWithTimestamp = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const { data: order, error } = await supabase
        .from("cc_orders")
        .update(toSnakeCase(dataWithTimestamp))
        .eq("id", where.id)
        .select()
        .single();

      if (error) throw error;
      return toCamelCase(order);
    },

    findUnique: async ({ where, include }: any) => {
      let query = supabase.from("cc_orders").select("*");

      if (where.id) {
        query = query.eq("id", where.id);
      } else if (where.accessCode) {
        query = query.eq("access_code", where.accessCode);
      }

      const { data: order, error } = await query.single();
      if (error) {
        // PGRST116 means no rows found, return null instead of throwing
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      let result = order;

      // If include pack
      if (include?.pack && order) {
        const { data: pack } = await supabase
          .from("cc_coupon_packs")
          .select("*")
          .eq("id", order.pack_id)
          .single();

        result = { ...result, pack };
      }

      // If include userCoupons
      if (include?.userCoupons && order) {
        let couponsQuery = supabase
          .from("cc_user_coupons")
          .select("*")
          .eq("order_id", order.id);

        if (include.userCoupons.orderBy?.displayOrder) {
          const orderDir = include.userCoupons.orderBy.displayOrder === "asc" ? true : false;
          couponsQuery = couponsQuery.order("display_order", { ascending: orderDir });
        }

        const { data: userCoupons } = await couponsQuery;
        result = { ...result, userCoupons: userCoupons || [] };
      }

      return toCamelCase(result);
    },
  },

  promoCode: {
    findUnique: async ({ where }: any) => {
      const { data, error } = await supabase
        .from("cc_promo_codes")
        .select("*")
        .eq("code", where.code)
        .single();

      if (error) return null;
      return toCamelCase(data);
    },
  },

  couponTemplate: {
    findMany: async ({ where, orderBy }: any) => {
      let query = supabase.from("cc_coupon_templates").select("*");

      if (where?.packId) {
        query = query.eq("pack_id", where.packId);
      }

      if (orderBy?.displayOrder) {
        const order = orderBy.displayOrder === "asc" ? true : false;
        query = query.order("display_order", { ascending: order });
      }

      const { data, error } = await query;
      if (error) throw error;
      return toCamelCase(data || []);
    },
  },

  userCoupon: {
    create: async ({ data }: any) => {
      // Generate UUID and timestamps if not provided (Prisma did this automatically)
      const now = new Date().toISOString();
      const dataWithDefaults = {
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        ...data,
      };

      const { data: coupon, error } = await supabase
        .from("cc_user_coupons")
        .insert(toSnakeCase(dataWithDefaults))
        .select()
        .single();

      if (error) throw error;
      return toCamelCase(coupon);
    },

    findMany: async ({ where, orderBy }: any) => {
      let query = supabase.from("cc_user_coupons").select("*");

      if (where?.orderId) {
        query = query.eq("order_id", where.orderId);
      }

      if (orderBy?.displayOrder) {
        const order = orderBy.displayOrder === "asc" ? true : false;
        query = query.order("display_order", { ascending: order });
      }

      const { data, error } = await query;
      if (error) throw error;
      return toCamelCase(data || []);
    },

    findUnique: async ({ where, include }: any) => {
      const { data: coupon, error } = await supabase
        .from("cc_user_coupons")
        .select("*")
        .eq("id", where.id)
        .single();

      if (error) {
        // PGRST116 means no rows found, return null instead of throwing
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      // If include order
      if (include?.order && coupon) {
        const { data: order } = await supabase
          .from("cc_orders")
          .select("*")
          .eq("id", coupon.order_id)
          .single();

        return toCamelCase({ ...coupon, order });
      }

      return toCamelCase(coupon);
    },

    update: async ({ where, data }: any) => {
      // Add updatedAt timestamp (Prisma @updatedAt did this automatically)
      const dataWithTimestamp = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const { data: coupon, error } = await supabase
        .from("cc_user_coupons")
        .update(toSnakeCase(dataWithTimestamp))
        .eq("id", where.id)
        .select()
        .single();

      if (error) throw error;
      return toCamelCase(coupon);
    },
  },

  faq: {
    findMany: async ({ where, orderBy }: any = {}) => {
      let query = supabase.from("cc_faqs").select("*");

      if (where?.isPublished !== undefined) {
        query = query.eq("is_published", where.isPublished);
      }

      if (orderBy?.displayOrder) {
        const order = orderBy.displayOrder === "asc" ? true : false;
        query = query.order("display_order", { ascending: order });
      }

      const { data, error } = await query;
      if (error) throw error;
      return toCamelCase(data || []);
    },
  },
};
