import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          city: string;
          state: string;
          pincode: string;
          items: OrderItem[];
          subtotal: number;
          delivery_fee: number;
          total_amount: number;
          payment_method: 'cod' | 'online';
          payment_status: 'pending' | 'paid' | 'failed';
          order_status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          order_number: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          city: string;
          state: string;
          pincode: string;
          items: OrderItem[];
          subtotal: number;
          delivery_fee: number;
          total_amount: number;
          payment_method: 'cod' | 'online';
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          order_number?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          delivery_address?: string;
          city?: string;
          state?: string;
          pincode?: string;
          items?: OrderItem[];
          subtotal?: number;
          delivery_fee?: number;
          total_amount?: number;
          payment_method?: 'cod' | 'online';
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}