import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/orderService';
import type { Database } from '../lib/supabase';

type Order = Database['public']['Tables']['orders']['Row'];

const MyOrders: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchOrders();
    }
  }, [isLoggedIn, user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userOrders = await orderService.getUserOrders(user.id);
      setOrders(userOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
      showNotification('Failed to load orders. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await orderService.cancelOrder(orderId);
      showNotification('Order cancelled successfully!', 'success');
      fetchOrders(); // Refresh the orders list
    } catch (err) {
      console.error('Error cancelling order:', err);
      showNotification('Failed to cancel order. Please try again.', 'error');
    }
  };

  const getStatusIcon = (status: Order['order_status']) => {
    switch (status) {
      case 'placed':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'preparing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'out_for_delivery':
        return <Truck className="h-5 w-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
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
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const canCancelOrder = (status: Order['order_status']) => {
    return ['placed', 'confirmed'].includes(status);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your orders.</p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Orders</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Order #{order.order_number}
                      </h3>
                      <p className="text-gray-600">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.order_status)}`}>
                        {getStatusIcon(order.order_status)}
                        <span>
                          {order.order_status === 'out_for_delivery' 
                            ? 'Out for Delivery' 
                            : order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex-shrink-0 flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex-shrink-0 text-sm text-gray-600">
                          +{order.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6 mb-4 sm:mb-0">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">₹{order.total_amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment</p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        to={`/track-order?orderId=${order.id}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Track Order</span>
                      </Link>
                      
                      {canCancelOrder(order.order_status) && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span>Cancel Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;