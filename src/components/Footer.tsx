import { Link } from 'react-router-dom';
import { Zap, Mail, Instagram, Linkedin, Facebook, ArrowRight, ChevronUp } from 'lucide-react';
import { services } from '../data/services';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-white overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* CTA Banner */}
      <div className="relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Ready to transform your
              <br />
              <span className="text-blue-600">digital presence?</span>
            </h3>
            <p className="text-gray-600">Let's build something extraordinary together.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/#contact" className="btn-primary whitespace-nowrap">
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a href="mailto:info.astranexora@gmail.com" className="btn-outline whitespace-nowrap">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Us
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group hover:opacity-80 transition-opacity">
              <img src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg" alt="Astra Nexora" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              A premium digital marketing agency helping businesses build powerful digital identities through creativity, strategy and measurable growth.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/astranexora2025/' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/astra-nexora/' },
                { icon: Facebook, href: 'https://www.facebook.com/share/18aqEXcEde/' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm uppercase tracking-widest mb-5">More Services</h4>
            <ul className="space-y-2.5">
              {services.slice(6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-600 transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-sm uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:info.astranexora@gmail.com" className="flex items-start gap-3 group">
                <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-200">info.astranexora@gmail.com</span>
              </a>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Tagline</p>
                <p className="text-sm text-gray-700 font-display font-medium">Creative. Strategic. Growth Driven.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Astra Nexora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500">Crafted with precision & passion</span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
