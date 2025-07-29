import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import type { Database, OrderItem } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];

export interface CreateOrderData {
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'cod' | 'online';
  razorpayOrderId?: string;
}

export const orderService = {
  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const orderNumber = 'NVS' + Date.now().toString().slice(-6);
    
    const orderInsert: OrderInsert = {
      id: uuidv4(),
      user_id: orderData.userId,
      order_number: orderNumber,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      delivery_address: orderData.deliveryAddress,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      items: orderData.items,
      subtotal: orderData.subtotal,
      delivery_fee: orderData.deliveryFee,
      total_amount: orderData.totalAmount,
      payment_method: orderData.paymentMethod,
      payment_status: orderData.paymentMethod === 'cod' ? 'pending' : 'pending',
      order_status: 'placed',
      razorpay_order_id: orderData.razorpayOrderId,
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(orderInsert)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }

    return data;
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Order not found
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    return data;
  },

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Order not found
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    return data;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user orders: ${error.message}`);
    }

    return data || [];
  },

  async updateOrderStatus(orderId: string, status: Order['order_status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        order_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }

    return data;
  },

  async updatePaymentStatus(
    orderId: string, 
    paymentStatus: Order['payment_status'],
    razorpayPaymentId?: string
  ): Promise<Order> {
    const updateData: any = {
      payment_status: paymentStatus,
      updated_at: new Date().toISOString()
    };

    if (razorpayPaymentId) {
      updateData.razorpay_payment_id = razorpayPaymentId;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update payment status: ${error.message}`);
    }

    return data;
  }
};