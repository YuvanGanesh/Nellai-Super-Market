import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate('/products');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Nellai</h1>
              <p className="text-sm text-green-600">Vegetable Shop</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search vegetables, fruits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden sm:block">
                  {isLoggedIn ? user?.name : 'Account'}
                </span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">
                        Hello, {user?.name}
                      </div>
                      <Link
                        to="/my-orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-green-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search vegetables, fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="px-4 py-2 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;