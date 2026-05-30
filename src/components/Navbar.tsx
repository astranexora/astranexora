import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-40 transition-all duration-300 font-display bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg" alt="Astra Nexora" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            href="#about"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            About
          </a>
          <a
            href="#services"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Portfolio
          </a>
          <a
            href="#founder"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Founder
          </a>
          <a
            href="#contact"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <Link
          to="/#contact"
          className="hidden md:flex btn-primary text-xs px-6 py-2.5 items-center gap-2"
        >
          Start Project
          <ArrowRight size={14} />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black-950/95 backdrop-blur-xl flex flex-col p-6 pt-20">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-6">
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-display text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-display text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-display text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Portfolio
            </a>
            <a
              href="#founder"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-display text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Founder
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-display text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </a>

            <Link
              to="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary text-xs px-6 py-2.5 mt-4 flex items-center justify-center gap-2"
            >
              Start Project
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
