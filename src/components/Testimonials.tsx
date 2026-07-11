import { useRef, useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Karthi',
    role: 'Small Business Owner',
    quote: 'Astra Nexora helped us build a professional website that truly represents our brand. The process was smooth, the team was responsive, and the final result exceeded our expectations.',
    rating: 5,
    avatar: 'KA',
    metric: 'Website Delivered',
  },
  {
    name: 'Revathi',
    role: 'Boutique Founder',
    quote: 'The team understood our requirements clearly and delivered a clean, modern website. Communication was excellent throughout the project and they were always available for feedback.',
    rating: 5,
    avatar: 'RE',
    metric: 'Clean & Modern',
  },
  {
    name: 'Santhiya',
    role: 'Beauty Studio Owner',
    quote: 'Our online presence has improved significantly since working with Astra Nexora. We are receiving more inquiries through our website and our brand looks much more professional now.',
    rating: 5,
    avatar: 'SA',
    metric: 'More Inquiries',
  },
  {
    name: 'Karthika',
    role: 'Startup Founder',
    quote: 'The branding and website design were exactly what we needed to launch our business. Everything was delivered professionally and on schedule. We are very happy with the outcome.',
    rating: 5,
    avatar: 'KK',
    metric: 'On-Time Delivery',
  },
  {
    name: 'Praveen',
    role: 'Restaurant Owner',
    quote: 'The new website looks great and is very easy for our customers to navigate. Our online orders have picked up since the launch. The team was patient and thorough throughout.',
    rating: 5,
    avatar: 'PR',
    metric: 'Customer-Friendly',
  },
  {
    name: 'Arun Kumar',
    role: 'Retail Shop Owner',
    quote: 'Astra Nexora redesigned our brand identity and it made a real difference. Our customers noticed the change immediately. The logo and colour palette feel very professional and fresh.',
    rating: 5,
    avatar: 'AK',
    metric: 'Brand Refresh',
  },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const activeRef = useRef(0);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeRef.current + 1) % testimonials.length;
      activeRef.current = next;
      setActive(next);
    }, 5000);
  };

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActive(index);
      activeRef.current = index;
      setIsAnimating(false);
    }, 300);
    resetInterval();
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  useEffect(() => {
    if (visible) resetInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="relative py-20 md:py-28 overflow-hidden bg-cloud">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,60,180,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header — asymmetric */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-5">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
              <span>Client Voices</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-ink-900 tracking-tight leading-[1.05]">
              What Our Clients
              <br />
              <span className="text-gradient-blue">Say About Us</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400" fill="currentColor" />
              ))}
            </div>
            <div className="text-sm text-ink-500">
              <span className="font-display font-bold text-ink-900">5.0</span> from 50+ reviews
            </div>
          </motion.div>
        </div>

        {/* Featured testimonial — editorial split layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="grid lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-ink-200 shadow-[0_4px_30px_rgba(10,15,28,0.04)]">
            {/* Navy accent panel — 4 cols */}
            <div className="lg:col-span-4 navy-divider p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>
              {/* Large quote icon */}
              <div className="relative">
                <Quote className="w-16 h-16 text-white/20" fill="currentColor" />
              </div>
              {/* Avatar + name */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-white text-lg mb-4 backdrop-blur-sm">
                  {t.avatar}
                </div>
                <div className="font-display font-bold text-white text-lg">{t.name}</div>
                <div className="text-sm text-white/60">{t.role}</div>
              </div>
            </div>

            {/* Quote content — 8 cols */}
            <div className="lg:col-span-8 p-8 lg:p-10 bg-white relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars + metric */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                    <div className="px-3 py-1 rounded-full glass-blue text-xs text-brand-500 font-display font-semibold border border-brand-500/20">
                      {t.metric}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-ink-700 text-lg md:text-xl leading-[1.7] mb-8 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Nav */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-ink-400 font-display">
                      <span className="text-brand-500 font-bold">{String(active + 1).padStart(2, '0')}</span>
                      <span className="mx-1">/</span>
                      {String(testimonials.length).padStart(2, '0')}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={prev}
                        className="w-10 h-10 rounded-xl glass-blue flex items-center justify-center text-ink-500 hover:text-brand-500 hover:border-brand-500/30 transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        className="w-10 h-10 rounded-xl glass-blue flex items-center justify-center text-ink-500 hover:text-brand-500 hover:border-brand-500/30 transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail strip — horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                active === i
                  ? 'border-brand-500/30 bg-brand-500/8 shadow-[0_0_12px_rgba(0,102,255,0.08)]'
                  : 'border-ink-200 bg-white hover:border-ink-300'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                active === i
                  ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-[0_0_10px_rgba(0,102,255,0.2)]'
                  : 'bg-ink-100 text-ink-500'
              }`}>
                {t.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className={`text-xs font-display font-semibold transition-colors ${active === i ? 'text-ink-900' : 'text-ink-500'}`}>{t.name}</div>
                <div className="text-[10px] text-ink-300">{t.role}</div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
