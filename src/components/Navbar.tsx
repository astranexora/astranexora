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
      setIsScrolled(window.scrollY > 40);

      const sections = ['about', 'services', 'portfolio', 'founder', 'contact'];
      for (const id of sections.reverse()) {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-display ${
          isScrolled
            ? 'py-2 bg-black-950/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 bg-transparent'
        }`}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity group">
            <img
              src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
              alt="Astra Nexora"
              className="h-11 w-auto drop-shadow-[0_0_8px_rgba(0,102,255,0.4)] group-hover:drop-shadow-[0_0_14px_rgba(0,102,255,0.6)] transition-all duration-300"
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
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-blue-500/10 border border-blue-500/20" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-blue-500 to-electric group-hover:w-3/4 transition-all duration-300" />
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
            className="md:hidden w-10 h-10 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
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
            className="absolute inset-0 bg-black-950/95 backdrop-blur-2xl"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Panel */}
          <div className="relative flex flex-col h-full p-8 pt-24">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Glow orb */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #0066FF, transparent)' }} />

            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl glass-blue text-white/70 hover:text-white hover:border-blue-500/30 transition-all duration-300 group"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-electric transition-colors" />
                  <span className="font-display font-medium text-lg">{link.label}</span>
                </a>
              ))}

              <Link
                to="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mt-6 justify-center gap-2"
              >
                Start Project
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Bottom email */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <a href="mailto:info.astranexora@gmail.com" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                info.astranexora@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
