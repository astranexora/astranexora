import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ['about', 'services', 'portfolio', 'founder', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 font-display bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-100'
            : 'border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            <img
              src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
              alt="Astra Nexora"
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to="/#contact"
            className="hidden md:flex btn-primary text-xs px-5 py-2.5 items-center gap-2"
          >
            Start Project
            <ArrowRight size={13} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Panel — slides in from right */}
          <div className="relative ml-auto w-80 h-full bg-white shadow-2xl flex flex-col p-6 pt-16">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Logo in mobile panel */}
            <div className="mb-8">
              <img
                src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                alt="Astra Nexora"
                className="h-9 w-auto"
              />
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                  {link.label}
                </a>
              ))}

              <Link
                to="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mt-5 justify-center gap-2"
              >
                Start Project
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <a href="mailto:info.astranexora@gmail.com" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
                info.astranexora@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
