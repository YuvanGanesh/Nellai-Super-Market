import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const handleQuantityChange = (increment: number) => {
    setQuantity(prev => Math.max(1, prev + increment));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              {product.originalPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{product.originalPrice - product.price}
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">(4.5) • 234 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-gray-600">{product.unit}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart (₹{product.price * quantity})</span>
                </button>
                
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Free Delivery</h4>
                    <p className="text-sm text-gray-600">On orders above ₹500</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">100% fresh or refund</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;