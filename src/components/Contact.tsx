import { useRef, useEffect, useState } from 'react';
import { Mail, Instagram, Linkedin, Facebook, Send, ArrowRight, CheckCircle } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', handle: '@astranexora2025', href: 'https://www.instagram.com/astranexora2025/', gradient: 'from-pink-500 to-orange-400' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Astra Nexora', href: 'https://www.linkedin.com/company/astra-nexora/', gradient: 'from-blue-600 to-blue-400' },
  { icon: Facebook, label: 'Facebook', handle: 'Astra Nexora', href: 'https://www.facebook.com/share/18aqEXcEde/', gradient: 'from-blue-500 to-blue-700' },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

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
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const inputClass = (field: string) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white placeholder-white/20 outline-none text-sm transition-all duration-300 ${
      focused === field
        ? 'border-blue-500/60 bg-blue-500/[0.04] shadow-[0_0_0_2px_rgba(0,102,255,0.12),0_0_20px_rgba(0,102,255,0.08)]'
        : 'border-white/8 hover:border-white/15'
    }`;

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,60,180,0.12), transparent)' }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,140,255,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Get In Touch</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            Ready to Build Something
            <br />
            <span className="text-gradient-blue">Remarkable?</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Tell us about your project and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className={`space-y-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Email card */}
            <a
              href="mailto:info.astranexora@gmail.com"
              className="flex items-center gap-5 glass-blue rounded-2xl p-5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(0,102,255,0.1)]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/25 group-hover:shadow-[0_0_16px_rgba(0,102,255,0.3)] transition-all duration-300">
                <Mail className="w-5 h-5 text-electric" />
              </div>
              <div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-0.5">Email Us</div>
                <span className="font-display font-semibold text-white group-hover:text-electric transition-colors duration-300">
                  info.astranexora@gmail.com
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 ml-auto transition-all duration-300 group-hover:translate-x-1" />
            </a>

            {/* Social links */}
            <div>
              <h3 className="font-display font-semibold text-white/60 text-xs uppercase tracking-widest mb-4">Connect With Us</h3>
              <div className="space-y-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/[0.03] transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_14px_rgba(0,102,255,0.3)] transition-shadow duration-300`}>
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-display font-semibold text-white">{social.label}</div>
                      <div className="text-xs text-white/30">{social.handle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 ml-auto transition-all duration-300 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                </div>
                <span className="text-sm font-display font-semibold text-white">Currently Accepting Projects</span>
              </div>
              <p className="text-sm text-white/35 leading-relaxed">
                We're available for new projects. Typical response time is within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative glass-blue rounded-3xl p-8 border border-blue-500/12 shadow-[0_0_80px_rgba(0,102,255,0.08)] overflow-hidden">
              {/* Corner glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.15), transparent)' }} />

              {submitted ? (
                <div className="relative z-10 text-center py-14">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15 flex items-center justify-center mx-auto mb-5 shadow-[0_0_24px_rgba(34,197,94,0.25)]">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-3">Message Sent!</h3>
                  <p className="text-white/40 text-sm leading-relaxed">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <div className="mb-7">
                    <h3 className="font-display font-bold text-white text-xl mb-1">Start a Conversation</h3>
                    <p className="text-sm text-white/30">Tell us about your project</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/35 uppercase tracking-widest mb-2 font-display">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused('')}
                        required
                        placeholder="Your name"
                        className={inputClass('name')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/35 uppercase tracking-widest mb-2 font-display">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        required
                        placeholder="your@email.com"
                        className={inputClass('email')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/35 uppercase tracking-widest mb-2 font-display">Service</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      onFocus={() => setFocused('service')}
                      onBlur={() => setFocused('')}
                      className={`${inputClass('service')} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-[#0a0a1a]">Select a service</option>
                      <option value="website" className="bg-[#0a0a1a]">Website Development</option>
                      <option value="wordpress" className="bg-[#0a0a1a]">WordPress Development</option>
                      <option value="seo" className="bg-[#0a0a1a]">SEO Optimization</option>
                      <option value="branding" className="bg-[#0a0a1a]">Brand Identity</option>
                      <option value="social" className="bg-[#0a0a1a]">Social Media Marketing</option>
                      <option value="content" className="bg-[#0a0a1a]">Content Creation</option>
                      <option value="other" className="bg-[#0a0a1a]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/35 uppercase tracking-widest mb-2 font-display">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused('')}
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center group">
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
