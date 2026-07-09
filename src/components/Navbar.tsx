import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
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
  { value: 'email', label: 'Email Marketing' },
  { value: 'presentation', label: 'Presentation Design' },
  { value: 'complete', label: 'Complete Digital Marketing Solution' },
];

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
  const [formData, setFormData] = useState({
    fullName: '', businessName: '', email: '', phone: '',
    whatsapp: '', website: '', service: '', projectDetails: '',
    contactMethod: '', bestTime: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', businessName: '', email: '', phone: '', whatsapp: '', website: '', service: '', projectDetails: '', contactMethod: '', bestTime: '' });
      onClose();
    }, 4000);
  };

  const ic = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] overflow-hidden rounded-3xl shadow-2xl"
            style={{ background: 'rgba(6,6,9,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
            <button onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 h-full overflow-y-auto p-8 md:p-12">
              {submitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white mb-4">Thank You!</h3>
                  <p className="text-white/50 max-w-md leading-relaxed mb-6">
                    Thank you for contacting Astra Nexora. Our team will review your requirements and reach out within 24 hours via your preferred contact method.
                  </p>
                  <a href="https://wa.me/918838417707?text=Hello%20Astra%20Nexora%2C%20I%20submitted%20the%20project%20form%20and%20would%20like%20to%20discuss%20further."
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-all duration-300"
                    style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.291 9.291 0 01-4.718-1.289l-.339-.201-3.51.92 1.072-3.419-.223-.351a9.234 9.234 0 01-1.414-4.927c0-5.098 4.153-9.243 9.262-9.243 2.468 0 4.789 1.02 6.534 2.87a9.214 9.214 0 012.705 6.548c-.003 5.097-4.157 9.242-9.266 9.242m7.849-17.017C18.152 1.682 15.667.5 12.996.5c-5.193 0-9.418 4.216-9.418 9.397 0 1.654.435 3.272 1.26 4.709L.5 23.5l5.07-1.327a9.436 9.436 0 004.504 1.145h.004c5.194 0 9.42-4.216 9.42-9.398 0-2.509-.981-4.868-2.762-6.635"/>
                    </svg>
                    Chat on WhatsApp for Faster Response
                  </a>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 mb-6"
                      style={{ background: 'rgba(0,40,120,0.15)' }}>
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs font-display font-semibold text-blue-400">START YOUR PROJECT</span>
                    </div>
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                      Let's Build Something <span className="text-gradient-blue">Great</span>
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto">Fill out the form and our team will get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      {[
                        { label: 'Full Name *', key: 'fullName', type: 'text', placeholder: 'John Doe', required: true },
                        { label: 'Business Name *', key: 'businessName', type: 'text', placeholder: 'Your Company', required: true },
                        { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'john@company.com', required: true },
                        { label: 'WhatsApp Number *', key: 'whatsapp', type: 'tel', placeholder: '+91 98765 43210', required: true },
                        { label: 'Website URL (Optional)', key: 'website', type: 'url', placeholder: 'https://yourwebsite.com', required: false },
                      ].map(field => (
                        <div key={field.key}>
                          <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">{field.label}</label>
                          <input type={field.type} required={field.required}
                            value={(formData as any)[field.key]}
                            onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder} className={ic} />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Service Required *</label>
                      <select required value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className={`${ic} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[#0a0a1a]">Select a service</option>
                        {services.map(s => <option key={s.value} value={s.value} className="bg-[#0a0a1a]">{s.label}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Project Details *</label>
                      <textarea required rows={4} value={formData.projectDetails}
                        onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder="Tell us about your project, goals, and requirements..."
                        className={`${ic} resize-none`} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Preferred Contact *</label>
                        <select required value={formData.contactMethod} onChange={e => setFormData({ ...formData, contactMethod: e.target.value })}
                          className={`${ic} appearance-none cursor-pointer`}>
                          <option value="" className="bg-[#0a0a1a]">Select method</option>
                          <option value="whatsapp" className="bg-[#0a0a1a]">WhatsApp</option>
                          <option value="email" className="bg-[#0a0a1a]">Email</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Best Time To Contact *</label>
                        <select required value={formData.bestTime} onChange={e => setFormData({ ...formData, bestTime: e.target.value })}
                          className={`${ic} appearance-none cursor-pointer`}>
                          <option value="" className="bg-[#0a0a1a]">Select time</option>
                          <option value="morning" className="bg-[#0a0a1a]">Morning (9AM–12PM)</option>
                          <option value="afternoon" className="bg-[#0a0a1a]">Afternoon (12PM–5PM)</option>
                          <option value="evening" className="bg-[#0a0a1a]">Evening (5PM–8PM)</option>
                          <option value="anytime" className="bg-[#0a0a1a]">Anytime</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <button type="submit" disabled={loading}
                        className="btn-primary px-12 py-4 text-base inline-flex items-center gap-3 disabled:opacity-50">
                        {loading ? (
                          <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />Sending...</>
                        ) : (
                          <>Submit Request <ArrowRight className="w-5 h-5" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.button ref={ref}
      onMouseMove={e => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}>
      {children}
    </motion.button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['about', 'services', 'portfolio', 'founder', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 font-display"
        style={{
          backgroundColor: '#ffffff',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: isScrolled ? '0 2px 24px rgba(0,0,0,0.06)' : '0 1px 0 rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.3s ease, padding 0.3s ease',
          padding: isScrolled ? '8px 0' : '12px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.03 }} className="relative">
              <img
                src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                alt="Astra Nexora"
                className="w-auto object-contain"
                style={{ height: isScrolled ? '52px' : '64px', transition: 'height 0.3s ease' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionId;
              return (
                <motion.a key={link.label} href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
                  style={{
                    color: isActive ? '#0066FF' : '#374151',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#0066FF'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,102,255,0.05)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#374151'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 rounded-full bg-blue-500"
                      style={{ width: '60%' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start Project
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: '#374151' }}>
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60]" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[61] w-80 p-6 pt-20"
              style={{ background: '#ffffff', borderLeft: '1px solid rgba(0,0,0,0.08)', boxShadow: '-8px 0 32px rgba(0,0,0,0.1)' }}>
              <button onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', color: '#6b7280' }}>
                <X size={18} />
              </button>

              <div className="mb-8">
                <img src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg" alt="Astra Nexora" className="h-12 w-auto" />
              </div>

              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200"
                    style={{ color: '#374151' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,102,255,0.05)'; (e.currentTarget as HTMLElement).style.color = '#0066FF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#374151'; }}>
                    <span className="w-2 h-2 rounded-full bg-blue-500/40" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </motion.a>
                ))}
              </div>

              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
                className="btn-primary w-full justify-center gap-2 mt-8 flex items-center">
                <Sparkles className="w-4 h-4" />
                Start Project
              </motion.button>

              <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-gray-100">
                <a href="mailto:info.astranexora@gmail.com" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
                  info.astranexora@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
