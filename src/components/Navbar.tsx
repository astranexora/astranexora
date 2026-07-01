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

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    whatsapp: '',
    website: '',
    service: '',
    projectDetails: '',
    contactMethod: '',
    bestTime: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // TODO: Integrate with EmailJS
    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '', businessName: '', email: '', phone: '',
        whatsapp: '', website: '', service: '', projectDetails: '',
        contactMethod: '', bestTime: '',
      });
      onClose();
    }, 4000);
  };

  const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-blue-500/50 focus:bg-blue-500/[0.03] transition-all duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] overflow-hidden rounded-3xl glass-strong border border-white/10 shadow-2xl"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 h-full overflow-y-auto p-8 md:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white mb-4">Thank You!</h3>
                  <p className="text-white/50 max-w-md leading-relaxed mb-6">
                    Thank you for contacting Astra Nexora. Our team will review your requirements and reach out within 24 hours via your preferred contact method.
                  </p>
                  <a
                    href="https://wa.me/918838417707?text=Hello%20Astra%20Nexora%2C%0A%0AMy%20Name%3A%0ABusiness%20Name%3A%0A%0AI%20would%20like%20to%20discuss%3A%0A%0A%E2%98%90%20Website%20Development%0A%E2%98%90%20SEO%0A%E2%98%90%20Branding%0A%E2%98%90%20Social%20Media%20Marketing%0A%E2%98%90%20Other%0A%0APlease%20contact%20me%20regarding%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.291 9.291 0 01-4.718-1.289l-.339-.201-3.51.92 1.072-3.419-.223-.351a9.234 9.234 0 01-1.414-4.927c0-5.098 4.153-9.243 9.262-9.243 2.468 0 4.789 1.02 6.534 2.87a9.214 9.214 0 012.705 6.548c-.003 5.097-4.157 9.242-9.266 9.242m7.849-17.017C18.152 1.682 15.667.5 12.996.5c-5.193 0-9.418 4.216-9.418 9.397 0 1.654.435 3.272 1.26 4.709L.5 23.5l5.07-1.327a9.436 9.436 0 004.504 1.145h.004c5.194 0 9.42-4.216 9.42-9.398 0-2.509-.981-4.868-2.762-6.635"/>
                    </svg>
                    Chat on WhatsApp for Faster Response
                  </a>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue border border-blue-500/20 mb-6"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-electric" />
                      <span className="text-xs font-display font-semibold text-electric">START YOUR PROJECT</span>
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
                    >
                      Let's Build Something <span className="text-gradient-blue">Great</span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-white/40 max-w-xl mx-auto"
                    >
                      Fill out the form below and our team will get back to you within 24 hours.
                    </motion.p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className={inputClass}
                        />
                      </div>

                      {/* Business Name */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Business Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Your Company"
                          className={inputClass}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className={inputClass}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.whatsapp}
                          onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={inputClass}
                        />
                      </div>

                      {/* Website URL */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Website URL (Optional)</label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={e => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Service Required - Full Width */}
                    <div className="mb-5">
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Service Required *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" className="bg-[#0a0a1a]">Select a service</option>
                        <option value="website" className="bg-[#0a0a1a]">Website Development</option>
                        <option value="wordpress" className="bg-[#0a0a1a]">WordPress Development</option>
                        <option value="wix" className="bg-[#0a0a1a]">Wix Website Development</option>
                        <option value="revamp" className="bg-[#0a0a1a]">Website Revamp</option>
                        <option value="seo" className="bg-[#0a0a1a]">SEO Optimization</option>
                        <option value="local-seo" className="bg-[#0a0a1a]">Local SEO</option>
                        <option value="social" className="bg-[#0a0a1a]">Social Media Marketing</option>
                        <option value="content" className="bg-[#0a0a1a]">Content Creation</option>
                        <option value="branding" className="bg-[#0a0a1a]">Brand Identity Design</option>
                        <option value="personal-branding" className="bg-[#0a0a1a]">Personal Branding</option>
                        <option value="email" className="bg-[#0a0a1a]">Email Marketing</option>
                        <option value="presentation" className="bg-[#0a0a1a]">Presentation Design</option>
                        <option value="complete" className="bg-[#0a0a1a]">Complete Digital Marketing Solution</option>
                      </select>
                    </div>

                    {/* Project Details - Full Width */}
                    <div className="mb-5">
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Project Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.projectDetails}
                        onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-8">
                      {/* Preferred Contact Method */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Preferred Contact Method *</label>
                        <select
                          required
                          value={formData.contactMethod}
                          onChange={e => setFormData({ ...formData, contactMethod: e.target.value })}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-[#0a0a1a]">Select method</option>
                          <option value="whatsapp" className="bg-[#0a0a1a]">WhatsApp</option>
                          <option value="phone" className="bg-[#0a0a1a]">Phone Call</option>
                          <option value="email" className="bg-[#0a0a1a]">Email</option>
                        </select>
                      </div>

                      {/* Best Time to Contact */}
                      <div>
                        <label className="block text-xs text-white/40 uppercase tracking-widest mb-2 font-display">Best Time To Contact *</label>
                        <select
                          required
                          value={formData.bestTime}
                          onChange={e => setFormData({ ...formData, bestTime: e.target.value })}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          <option value="" className="bg-[#0a0a1a]">Select time</option>
                          <option value="morning" className="bg-[#0a0a1a]">Morning (9AM - 12PM)</option>
                          <option value="afternoon" className="bg-[#0a0a1a]">Afternoon (12PM - 5PM)</option>
                          <option value="evening" className="bg-[#0a0a1a]">Evening (5PM - 8PM)</option>
                          <option value="anytime" className="bg-[#0a0a1a]">Anytime</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary px-12 py-4 text-base inline-flex items-center gap-3 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit Request
                            <ArrowRight className="w-5 h-5" />
                          </>
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
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
        if (el && window.scrollY >= el.offsetTop - 150) {
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
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 font-display transition-all duration-500 ${
          isScrolled
            ? 'py-2 glass-strong border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - 50% larger */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img
                src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                alt="Astra Nexora"
                className="h-16 w-auto md:h-[4.5rem] transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const sectionId = link.href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionId;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-electric"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 transition-colors duration-300" />
                </motion.a>
              );
            })}
          </div>

          {/* CTA - Magnetic Button */}
          <MagneticButton
            onClick={() => setIsModalOpen(true)}
            className="hidden md-flex btn-primary text-sm px-6 py-3 items-center gap-2 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Start Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </MagneticButton>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-11 h-11 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[61] w-80 glass-strong border-l border-white/10 p-6 pt-20"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Logo */}
              <div className="mb-10">
                <img
                  src="/WhatsApp_Image_2026-04-30_at_1.07.24_PM copy copy.jpeg"
                  alt="Astra Nexora"
                  className="h-12 w-auto"
                />
              </div>

              {/* Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-electric/50" />
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="btn-primary w-full justify-center gap-2 mt-8"
              >
                <Sparkles className="w-4 h-4" />
                Start Project
              </motion.button>

              {/* Email */}
              <div className="absolute bottom-6 left-6 right-6">
                <a href="mailto:astranexoraofficial@gmail.com" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                  astranexoraofficial@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Start Project Modal */}
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
