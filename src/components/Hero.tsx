import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fresh
              <span className="text-green-600"> Vegetables</span>
              <br />
              Delivered
              <span className="text-green-600"> Fresh</span>
            </h1>
            
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Experience the finest selection of farm-fresh vegetables and fruits 
              delivered straight to your doorstep in Chennai. Quality guaranteed, 
              prices unbeatable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">100% Organic</h3>
                  <p className="text-sm text-gray-600">Fresh from farms</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">Same day delivery</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Money back guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fresh vegetables"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-300 rounded-full opacity-40"></div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">500+ Happy Customers</p>
                  <p className="text-sm text-gray-600">Trusted in Chennai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;