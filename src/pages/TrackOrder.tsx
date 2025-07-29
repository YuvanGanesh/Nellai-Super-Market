import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { orderService } from '../services/orderService';
import type { Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];

const TrackOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderInput, setOrderInput] = useState(searchParams.get('orderId') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      handleTrackOrder(orderId);
    }
  }, [searchParams]);

  const handleTrackOrder = async (orderIdOrNumber?: string) => {
    const searchValue = orderIdOrNumber || orderInput.trim();
    
    if (!searchValue) {
      setError('Please enter an order ID or order number');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      let foundOrder: Order | null = null;

      // Try to find by order ID first
      if (searchValue.length > 10) {
        foundOrder = await orderService.getOrderById(searchValue);
      }

      // If not found, try by order number
      if (!foundOrder) {
        foundOrder = await orderService.getOrderByNumber(searchValue);
      }

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check your order ID or number.');
      }
    } catch (err) {
      console.error('Error tracking order:', err);
      setError('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = (currentStatus: Order['order_status']) => {
    const steps = [
      { key: 'placed', label: 'Order Placed', icon: Package },
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { key: 'preparing', label: 'Preparing', icon: Clock },
      { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle }
    ];

    const statusOrder = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const getStatusColor = (status: Order['order_status']) => {
    switch (status) {
      case 'placed':
        return 'text-blue-600 bg-blue-100';
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'preparing':
        return 'text-yellow-600 bg-yellow-100';
      case 'out_for_delivery':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>

          {/* Search Form */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="Enter Order ID or Order Number"
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={() => handleTrackOrder()}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : 'Track'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="space-y-8">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Order Number</h3>
                    <p className="text-lg font-semibold text-gray-900">{order.order_number}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Order Date</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Amount</h3>
                    <p className="text-lg font-semibold text-gray-900">₹{order.total_amount}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
                  {order.order_status === 'cancelled' ? 'Order Cancelled' : 
                   order.order_status === 'delivered' ? 'Order Delivered' :
                   `Order ${order.order_status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`}
                </div>
              </div>

              {/* Status Timeline */}
              {order.order_status !== 'cancelled' && (
                <div className="relative">
                  <div className="flex justify-between items-center">
                    {getStatusSteps(order.order_status).map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex flex-col items-center relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-600 text-white' 
                              : step.active 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-500'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className={`mt-2 text-sm font-medium ${
                            step.completed || step.active ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </span>
                          {index < getStatusSteps(order.order_status).length - 1 && (
                            <div className={`absolute top-6 left-12 w-full h-0.5 ${
                              step.completed ? 'bg-green-600' : 'bg-gray-200'
                            }`} style={{ width: 'calc(100vw / 5)' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600">₹{item.price} {item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">Qty: {item.quantity}</p>
                        <p className="text-gray-600">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer_name}</p>
                        <p className="text-gray-600 mt-1">
                          {order.delivery_address}<br />
                          {order.city}, {order.state} - {order.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{order.customer_phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">{order.customer_email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Need Help?</h3>
                <p className="text-green-700 mb-4">
                  If you have any questions about your order, feel free to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+919884388147"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Support</span>
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;