import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Phone, Truck, Clock } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your order and will start preparing it shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">{orderId || 'Processing...'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Order Placed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span>Within 2-4 hours</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Preparing</h4>
              <p className="text-sm text-gray-600">
                We're selecting the freshest produce for you
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">On the Way</h4>
              <p className="text-sm text-gray-600">
                Your order will be dispatched soon
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Delivered</h4>
              <p className="text-sm text-gray-600">
                Fresh produce delivered to your door
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Need Help?</span>
            </div>
            <p className="text-green-700 text-sm mb-2">
              Call us at <a href="tel:+919884388147" className="font-semibold">+91 9884388147</a>
            </p>
            <p className="text-green-600 text-xs">
              Our team is available to assist you with your order
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to={`/track-order${orderId ? `?orderId=${orderId}` : ''}`}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Track Order
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;