import { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Startup Founder',
    role: 'Tech Startup, SaaS',
    quote: 'Astra Nexora transformed our digital presence completely. The website they built for us generates 3x more leads than our old one. The team understands business, not just design.',
    rating: 5,
    avatar: 'SF',
  },
  {
    name: 'Entrepreneur',
    role: 'E-commerce Business',
    quote: 'The SEO campaign they ran for our brand was exceptional. Within 6 months we went from page 5 to page 1 for our most important keywords. Revenue increased by 68%.',
    rating: 5,
    avatar: 'EN',
  },
  {
    name: 'Business Owner',
    role: 'Professional Services',
    quote: 'The rebrand they created for us is stunning. Not just aesthetically, but strategically. Every element communicates exactly what we wanted. Worth every rupee.',
    rating: 5,
    avatar: 'BO',
  },
  {
    name: 'Marketing Professional',
    role: 'Digital Agency',
    quote: 'Working with Astra Nexora on our content strategy was a revelation. Their approach is systematic, data-driven and creative at the same time. Highly recommended.',
    rating: 5,
    avatar: 'MP',
  },
  {
    name: 'Creative Professional',
    role: 'Personal Brand',
    quote: 'My personal branding journey with Astra Nexora opened doors I never imagined. LinkedIn followers grew from 300 to 8,000 in four months. Incredible work.',
    rating: 5,
    avatar: 'CP',
  },
  {
    name: 'Business Owner',
    role: 'Healthcare Sector',
    quote: 'The website revamp was seamless and the results were immediate. Appointment bookings increased by 120% in the first month. The team is professional, fast and talented.',
    rating: 5,
    avatar: 'BH',
  },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Client Voices</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            What Our Clients
            <br />
            <span className="text-gradient-blue">Say About Us</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div className={`mb-8 transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="glass-blue rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-6 right-8 opacity-10">
              <Quote className="w-24 h-24 text-blue-500" />
            </div>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
              ))}
            </div>

            <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
              &ldquo;{testimonials[active].quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-electric flex items-center justify-center font-display font-bold text-white text-sm">
                {testimonials[active].avatar}
              </div>
              <div>
                <div className="font-display font-semibold text-white">{testimonials[active].name}</div>
                <div className="text-sm text-white/40">{testimonials[active].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail selector */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-800 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 ${
                active === i
                  ? 'border-blue-500/60 bg-blue-500/10'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                active === i ? 'bg-gradient-to-br from-blue-500 to-electric text-white' : 'bg-white/10 text-white/50'
              }`}>
                {t.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className={`text-xs font-semibold transition-colors ${active === i ? 'text-white' : 'text-white/50'}`}>{t.name}</div>
                <div className="text-xs text-white/30">{t.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
