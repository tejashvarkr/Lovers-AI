import React from 'react';
import { Heart, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LoversAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                currentPage === 'home' ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                currentPage === 'pricing' ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                currentPage === 'contact' ? 'text-purple-600' : 'text-gray-700'
              }`}
            >
              Contact
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200">
              Login
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-3">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                  currentPage === 'home' ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('pricing');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                  currentPage === 'pricing' ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                  currentPage === 'contact' ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                Contact
              </button>
              <button className="block w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200">
                Login
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}