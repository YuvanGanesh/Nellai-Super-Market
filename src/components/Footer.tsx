import React from 'react';
import { MapPin, Phone, Mail, Leaf, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nellai Vegetable Shop</h3>
                <p className="text-gray-400">Fresh & Organic</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for fresh vegetables and fruits in Chennai. 
              We deliver quality produce directly from local farms to your doorstep.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/nellaivegetableshop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/nellaivegetableshop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/nellaivegetableshop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-green-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-gray-400 hover:text-green-400 transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">
                    Old No.11, Kamarajapuram Main Rd,<br />
                    Kamarajapuram, Gowriwakkam,<br />
                    Sembakkam, Chennai,<br />
                    Tamil Nadu 600073
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a 
                  href="tel:+919884388147" 
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  +91 9884388147
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <a 
                  href="mailto:nellaivegetableshop@gmail.com" 
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  nellaivegetableshop@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Nellai Vegetable Shop. All rights reserved. |
            <span className="ml-2">Fresh • Quality • Delivered</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Powered by Roshan Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;