import { useRef, useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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
    <section id="testimonials" className="relative py-28 md:py-36 overflow-hidden bg-black-900">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,60,180,0.12), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Client Voices</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 tracking-tight">
            What Our Clients
            <br />
            <span className="text-gradient-blue">Say About Us</span>
          </h2>
        </div>

        {/* Featured card */}
        <div className={`max-w-4xl mx-auto mb-10 transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative glass-blue rounded-3xl p-8 md:p-12 border border-blue-500/15 overflow-hidden shadow-[0_0_60px_rgba(0,102,255,0.1)]">
            {/* BG shimmer */}
            <div className="absolute inset-0 holo-card pointer-events-none rounded-3xl" />

            {/* Quote icon */}
            <div className="absolute top-8 right-10 opacity-[0.06]">
              <Quote className="w-28 h-28 text-blue-300" />
            </div>

            {/* Content - with fade transition */}
            <div
              className="relative z-10 transition-all duration-300"
              style={{ opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateY(8px)' : 'translateY(0)' }}
            >
              {/* Stars + metric */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <div className="px-3 py-1 rounded-full glass text-xs text-electric font-display font-semibold border border-electric/20">
                  {t.metric}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-white/75 text-lg md:text-xl leading-[1.7] mb-8 font-light">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author + nav */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-electric flex items-center justify-center font-display font-bold text-white text-sm shadow-[0_0_16px_rgba(0,102,255,0.4)]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/35">{t.role}</div>
                  </div>
                </div>

                {/* Prev/Next */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-lg glass-blue flex items-center justify-center text-white/40 hover:text-white hover:border-blue-500/40 transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-lg glass-blue flex items-center justify-center text-white/40 hover:text-white hover:border-blue-500/40 transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className={`flex justify-center gap-2 mb-10 transition-all duration-800 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                active === i ? 'w-8 bg-electric shadow-[0_0_8px_rgba(0,207,255,0.6)]' : 'w-1.5 bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-800 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 ${
                active === i
                  ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_12px_rgba(0,102,255,0.15)]'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/15'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                active === i
                  ? 'bg-gradient-to-br from-blue-500 to-electric text-white shadow-[0_0_10px_rgba(0,102,255,0.4)]'
                  : 'bg-white/8 text-white/40'
              }`}>
                {t.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className={`text-xs font-display font-semibold transition-colors ${active === i ? 'text-white' : 'text-white/40'}`}>{t.name}</div>
                <div className="text-[10px] text-white/25">{t.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
