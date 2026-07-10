import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Linkedin, Facebook, Send, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', handle: '@astranexora2025', href: 'https://www.instagram.com/astranexora2025/', gradient: 'from-pink-500 to-orange-400' },
  { icon: Linkedin, label: 'LinkedIn', handle: 'Astra Nexora', href: 'https://www.linkedin.com/company/astra-nexora/', gradient: 'from-brand-600 to-brand-500' },
  { icon: Facebook, label: 'Facebook', handle: 'Astra Nexora', href: 'https://www.facebook.com/share/18aqEXcEde/', gradient: 'from-brand-500 to-brand-600' },
];

const services = [
  { value: 'website', label: 'Website Development' },
  { value: 'wordpress', label: 'WordPress Development' },
  { value: 'wix', label: 'Wix Website Development' },
  { value: 'revamp', label: 'Website Revamp' },
  { value: 'seo', label: 'SEO Optimization' },
  { value: 'local-seo', label: 'Local SEO' },
  { value: 'social', label: 'Social Media Marketing' },
  { value: 'content', label: 'Content Creation' },
  { value: 'branding', label: 'Brand Identity Design' },
  { value: 'personal-branding', label: 'Personal Branding' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'ai-solutions', label: 'AI-Based Solutions' },
  { value: 'complete', label: 'Complete Digital Marketing Solution' },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    whatsapp: '',
    website: '',
    service: '',
    projectDetails: '',
    contactMethod: '',
    bestTime: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS integration
      // Note: You'll need to set up EmailJS with your service ID, template ID, and public key
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Replace with actual EmailJS configuration
      // await emailjs.sendForm(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   formRef.current!,
      //   'YOUR_PUBLIC_KEY'
      // );

      setSubmitted(true);
      setFormData({
        fullName: '', businessName: '', email: '', whatsapp: '',
        website: '', service: '', projectDetails: '', contactMethod: '', bestTime: '',
      });

      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-white border rounded-xl px-4 py-3.5 text-ink-900 placeholder-ink-300 outline-none text-sm transition-all duration-300 ${
      focused === field
        ? 'border-brand-500/50 bg-brand-500/5 shadow-[0_0_0_3px_rgba(0,102,255,0.1),0_0_20px_rgba(0,102,255,0.06)]'
        : 'border-ink-200 hover:border-ink-200'
    }`;

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden bg-mist">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,60,180,0.08), transparent)' }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,140,255,0.06), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
            <span>Get In Touch</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-brand-500" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-5 tracking-tight">
            Ready to Build Something
            <br />
            <span className="text-gradient-blue">Remarkable?</span>
          </h2>
          <p className="text-ink-500 text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your project and let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Email card */}
            <a
              href="mailto:info.astranexora@gmail.com"
              className="flex items-center gap-5 glass-blue rounded-2xl p-5 border border-brand-500/15 hover:border-brand-500/30 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(0,102,255,0.08)]"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500/20 group-hover:shadow-[0_0_16px_rgba(0,102,255,0.2)] transition-all duration-300">
                <Mail className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <div className="text-xs text-ink-400 uppercase tracking-widest mb-0.5">Email Us</div>
                <span className="font-display font-semibold text-ink-900 group-hover:text-brand-500 transition-colors duration-300">
                  info.astranexora@gmail.com
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-ink-500 ml-auto transition-all duration-300 group-hover:translate-x-1" />
            </a>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/918838417707"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 glass rounded-xl p-4 border border-ink-200 hover:border-green-500/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_14px_rgba(34,197,94,0.2)] transition-shadow duration-300">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-display font-semibold text-ink-900">WhatsApp</div>
                <div className="text-xs text-ink-400">Quick response</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-green-600/50 ml-auto transition-all duration-300 group-hover:translate-x-1" />
            </a>

            {/* Social links */}
            <div>
              <h3 className="font-display font-semibold text-ink-700 text-xs uppercase tracking-widest mb-4">Connect With Us</h3>
              <div className="space-y-3">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass rounded-xl p-4 border border-ink-200 hover:border-brand-500/20 hover:bg-brand-500/5 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_14px_rgba(0,102,255,0.2)] transition-shadow duration-300`}>
                      <social.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-display font-semibold text-ink-900">{social.label}</div>
                      <div className="text-xs text-ink-400">{social.handle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-ink-500 ml-auto transition-all duration-300 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div className="glass rounded-2xl p-5 border border-ink-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                </div>
                <span className="text-sm font-display font-semibold text-ink-900">Currently Accepting Projects</span>
              </div>
              <p className="text-sm text-ink-500 leading-relaxed">
                We're available for new projects. Typical response time is within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative glass-blue rounded-3xl p-8 border border-brand-500/15 shadow-[0_0_80px_rgba(0,102,255,0.06)] overflow-hidden">
              {/* Corner glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.1), transparent)' }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-10 text-center py-14"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5 shadow-[0_0_24px_rgba(34,197,94,0.2)]">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-ink-900 text-2xl mb-3">Message Sent!</h3>
                    <p className="text-ink-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                      Thank you for contacting Astra Nexora. Our team will review your requirements and reach out within 24 hours via your preferred contact method.
                    </p>
                    <p className="text-ink-400 text-sm mb-4">Need a faster response?</p>
                    <a
                      href="https://wa.me/918838417707?text=Hello%20Astra%20Nexora%2C%0A%0AMy%20Name%3A%0ABusiness%20Name%3A%0A%0AI%20would%20like%20to%20discuss%3A%0A%0A%E2%98%90%20Website%20Development%0A%E2%98%90%20SEO%0A%E2%98%90%20Branding%0A%E2%98%90%20Social%20Media%20Marketing%0A%E2%98%90%20Other%0A%0APlease%20contact%20me%20regarding%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-100 text-green-600 border border-green-500/25 hover:bg-green-500/20 transition-all duration-300 text-sm font-display font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 space-y-5"
                  >
                    <div className="mb-7">
                      <h3 className="font-display font-bold text-ink-900 text-xl mb-1">Start a Conversation</h3>
                      <p className="text-sm text-ink-400">Fill out the form below</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Full Name *</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          onFocus={() => setFocused('fullName')}
                          onBlur={() => setFocused('')}
                          required
                          placeholder="John Doe"
                          className={inputClass('fullName')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Business Name *</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                          onFocus={() => setFocused('businessName')}
                          onBlur={() => setFocused('')}
                          required
                          placeholder="Your Company"
                          className={inputClass('businessName')}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused('')}
                          required
                          placeholder="john@company.com"
                          className={inputClass('email')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">WhatsApp *</label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                          onFocus={() => setFocused('whatsapp')}
                          onBlur={() => setFocused('')}
                          required
                          placeholder="+91 98765 43210"
                          className={inputClass('whatsapp')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Website (Optional)</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                        onFocus={() => setFocused('website')}
                        onBlur={() => setFocused('')}
                        placeholder="https://yourwebsite.com"
                        className={inputClass('website')}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Service Required *</label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setFocused('service')}
                        onBlur={() => setFocused('')}
                        required
                        className={`${inputClass('service')} appearance-none cursor-pointer`}
                      >
                        <option value="" className="bg-white">Select a service</option>
                        {services.map(s => (
                          <option key={s.value} value={s.value} className="bg-white">{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Project Details *</label>
                      <textarea
                        value={formData.projectDetails}
                        onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
                        onFocus={() => setFocused('projectDetails')}
                        onBlur={() => setFocused('')}
                        required
                        rows={4}
                        placeholder="Tell us about your project, goals, and requirements..."
                        className={`${inputClass('projectDetails')} resize-none`}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Preferred Contact *</label>
                        <select
                          value={formData.contactMethod}
                          onChange={e => setFormData({ ...formData, contactMethod: e.target.value })}
                          onFocus={() => setFocused('contactMethod')}
                          onBlur={() => setFocused('')}
                          required
                          className={`${inputClass('contactMethod')} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-white">Select method</option>
                          <option value="whatsapp" className="bg-white">WhatsApp</option>
                          <option value="email" className="bg-white">Email</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-ink-500 uppercase tracking-widest mb-2 font-display">Best Time to Contact *</label>
                        <select
                          value={formData.bestTime}
                          onChange={e => setFormData({ ...formData, bestTime: e.target.value })}
                          onFocus={() => setFocused('bestTime')}
                          onBlur={() => setFocused('')}
                          required
                          className={`${inputClass('bestTime')} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-white">Select time</option>
                          <option value="morning" className="bg-white">Morning (9AM - 12PM)</option>
                          <option value="afternoon" className="bg-white">Afternoon (12PM - 5PM)</option>
                          <option value="evening" className="bg-white">Evening (5PM - 8PM)</option>
                          <option value="anytime" className="bg-white">Anytime</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center group">
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
