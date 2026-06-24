import { Link } from 'react-router-dom';
import { Mail, Instagram, Linkedin, Facebook, ArrowRight, ChevronUp, Zap } from 'lucide-react';
import { services } from '../data/services';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-black-950 overflow-hidden">
      {/* Top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Background FX */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,40,120,0.25), transparent)' }} />

      {/* CTA Banner */}
      <div className="relative border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Glow orb */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), transparent)' }} />

          <div className="relative z-10">
            <div className="section-label mb-4">
              <span className="w-6 h-px bg-electric" />
              <span>Let's Build Together</span>
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-3 leading-tight">
              Ready to transform your
              <br />
              <span className="text-gradient-blue">digital presence?</span>
            </h3>
            <p className="text-white/40 text-sm">Let's build something extraordinary together.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <a href="/#contact" className="btn-primary whitespace-nowrap">
              <span className="relative z-10 flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a href="mailto:info.astranexora@gmail.com" className="btn-outline whitespace-nowrap">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex mb-6 hover:opacity-80 transition-opacity">
              <img
                src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                alt="Astra Nexora"
                className="h-11 w-auto drop-shadow-[0_0_8px_rgba(0,102,255,0.35)]"
              />
            </Link>
            <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-xs">
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
                  className="w-9 h-9 rounded-lg glass-blue flex items-center justify-center text-white/40 hover:text-electric hover:border-blue-500/40 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-[0.2em] mb-6">Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-2.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/40 group-hover:bg-electric transition-colors duration-200" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-[0.2em] mb-6">More Services</h4>
            <ul className="space-y-3">
              {services.slice(6).map(s => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.id}`}
                    className="text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-2.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500/40 group-hover:bg-electric transition-colors duration-200" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white/60 text-xs uppercase tracking-[0.2em] mb-6">Contact</h4>
            <div className="space-y-5">
              <a href="mailto:info.astranexora@gmail.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg glass-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-electric" />
                </div>
                <span className="text-sm text-white/35 group-hover:text-white/70 transition-colors duration-200 leading-relaxed">
                  info.astranexora@gmail.com
                </span>
              </a>

              <div className="pt-5 border-t border-white/[0.05]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-blue mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/50 font-display">Available for projects</span>
                </div>
                <p className="text-sm text-white/50 font-display font-medium">Creative. Strategic. Growth Driven.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 flex items-center gap-2">
            <Zap className="w-3 h-3 text-electric" />
            &copy; {new Date().getFullYear()} Astra Nexora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20">Crafted with precision & passion</span>
            <button
              onClick={scrollTop}
              className="w-8 h-8 rounded-lg glass-blue flex items-center justify-center text-white/30 hover:text-white/80 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
