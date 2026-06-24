import { Link } from 'react-router-dom';
import { Mail, Instagram, Linkedin, Facebook, ArrowRight, ChevronUp, Zap } from 'lucide-react';
import { services } from '../data/services';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-white overflow-hidden">
      {/* Top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Subtle background tint */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(239,246,255,0.8), transparent)' }} />

      {/* CTA Banner */}
      <div className="relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-blue-500" />
              <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-blue-500">Let's Build Together</span>
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-2 leading-tight">
              Ready to transform your
              <br />
              <span className="text-gradient-blue">digital presence?</span>
            </h3>
            <p className="text-gray-500 text-sm">Let's build something extraordinary together.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <a href="/#contact" className="btn-primary whitespace-nowrap">
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="mailto:info.astranexora@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex mb-5 hover:opacity-80 transition-opacity">
              <img
                src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                alt="Astra Nexora"
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              A premium digital marketing agency helping businesses build powerful digital identities through creativity, strategy and measurable growth.
            </p>
            <div className="flex gap-2.5">
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
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-xs uppercase tracking-[0.2em] mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400/60 group-hover:bg-blue-500 transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-gray-900 text-xs uppercase tracking-[0.2em] mb-5">More Services</h4>
            <ul className="space-y-2.5">
              {services.slice(6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400/60 group-hover:bg-blue-500 transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 text-xs uppercase tracking-[0.2em] mb-5">Contact</h4>
            <div className="space-y-5">
              <a href="mailto:info.astranexora@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg border border-gray-200 bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-blue-300 group-hover:bg-blue-100 transition-all duration-300">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200 leading-relaxed">
                  info.astranexora@gmail.com
                </span>
              </a>

              <div className="pt-4 border-t border-gray-100">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-700 font-display font-medium">Available for projects</span>
                </div>
                <p className="text-sm text-gray-700 font-display font-semibold">Creative. Strategic. Growth Driven.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <Zap className="w-3 h-3 text-blue-500" />
            &copy; {new Date().getFullYear()} Astra Nexora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">Crafted with precision & passion</span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
