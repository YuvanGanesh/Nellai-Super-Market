declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const razorpayService = {
  loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  async createOrder(amount: number): Promise<{ id: string; amount: number }> {
    // In a real application, this would call your backend API
    // For demo purposes, we'll simulate the order creation
    const orderId = 'order_' + Math.random().toString(36).substr(2, 9);
    
    return {
      id: orderId,
      amount: amount * 100 // Razorpay expects amount in paise
    };
  },

  async openPaymentModal(options: RazorpayOptions): Promise<void> {
    const isLoaded = await this.loadScript();
    
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }
};