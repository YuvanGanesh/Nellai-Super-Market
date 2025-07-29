import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationContainer from './components/NotificationContainer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import MyOrders from './pages/MyOrders';

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Header onSearch={handleSearch} />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products searchQuery={searchQuery} />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                </Routes>
              </main>
              
              <Footer />
              <NotificationContainer />
            </div>
          </Router>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;