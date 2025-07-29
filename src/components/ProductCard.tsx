import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { showNotification } = useNotification();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
    showNotification(`${product.name} added to cart!`, 'info');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Save ₹{product.originalPrice - product.price}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className="text-sm text-gray-500">
              {product.unit}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;