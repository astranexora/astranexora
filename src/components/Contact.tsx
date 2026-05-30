import { useRef, useEffect, useState } from 'react';
import { Mail, Instagram, Linkedin, Facebook, Send, ArrowRight } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', handle: '@astranexora2025', href: 'https://www.instagram.com/astranexora2025/', color: 'from-pink-500 to-orange-400', hoverColor: 'hover:border-pink-500/40' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Astra Nexora', href: 'https://www.linkedin.com/company/astra-nexora/', color: 'from-blue-600 to-blue-400', hoverColor: 'hover:border-blue-500/40' },
  { icon: Facebook, label: 'Facebook', handle: 'Astra Nexora', href: 'https://www.facebook.com/share/18aqEXcEde/', color: 'from-blue-500 to-blue-700', hoverColor: 'hover:border-blue-400/40' },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 aurora-bg opacity-40" />
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Get In Touch</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Ready to Build Something
            <br />
            <span className="text-gradient-blue">Remarkable?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Tell us about your project and let's create something extraordinary together.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className={`space-y-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="glass-blue rounded-2xl p-6 flex items-center gap-5 hover:border-blue-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-electric" />
              </div>
              <div>
                <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Email Us</div>
                <a href="mailto:info.astranexora@gmail.com" className="font-display font-semibold text-white hover:text-electric transition-colors">info.astranexora@gmail.com</a>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-white mb-4">Connect With Us</h3>
              <div className="space-y-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 glass rounded-xl p-4 border border-white/5 ${social.hoverColor} transition-all duration-300 group`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{social.label}</div>
                      <div className="text-xs text-white/40">{social.handle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 ml-auto transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Currently Accepting Projects</span>
              </div>
              <p className="text-sm text-white/50">We're currently available for new projects. Typical response time is within 24 hours.</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="glass-blue rounded-3xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                  <p className="text-white/50">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-white text-xl mb-6">Start a Conversation</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Service</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/60 transition-colors text-sm appearance-none"
                    >
                      <option value="" className="bg-black-900">Select a service</option>
                      <option value="website" className="bg-black-900">Website Development</option>
                      <option value="wordpress" className="bg-black-900">WordPress Development</option>
                      <option value="seo" className="bg-black-900">SEO Optimization</option>
                      <option value="branding" className="bg-black-900">Brand Identity</option>
                      <option value="social" className="bg-black-900">Social Media Marketing</option>
                      <option value="content" className="bg-black-900">Content Creation</option>
                      <option value="other" className="bg-black-900">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/60 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
