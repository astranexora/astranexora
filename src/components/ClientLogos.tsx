import { useRef, useEffect, useState } from 'react';
import { Award, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const clients = [
  { name: 'Bloom Boutique', sector: 'Fashion' },
  { name: 'Glow Beauty', sector: 'Wellness' },
  { name: 'Urban Spice', sector: 'Hospitality' },
  { name: 'NexStart', sector: 'Consulting' },
  { name: 'Sri Lakshmi', sector: 'Interior Design' },
  { name: 'Green Leaf', sector: 'Organic Retail' },
  { name: 'Elite Fitness', sector: 'Fitness' },
  { name: 'Vision Academy', sector: 'Education' },
  { name: 'Royal Events', sector: 'Event Mgmt' },
  { name: 'Eclipse Studio', sector: 'Digital' },
];

const trustBadges = [
  { icon: Award, label: '150+ Projects Delivered', sub: 'Across 12+ industries' },
  { icon: TrendingUp, label: '4.2x Average ROI', sub: 'Measurable growth' },
  { icon: Users, label: '40+ Brands Elevated', sub: 'Trust earned' },
  { icon: ShieldCheck, label: '98% Client Satisfaction', sub: 'Consistently maintained' },
];

export default function ClientLogos() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-cloud border-y border-ink-100">
      <div className="absolute inset-0 mesh-bg-fine opacity-40" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Trust badges row */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className={`group flex items-center gap-4 glass-blue rounded-2xl p-5 border border-ink-200 hover:border-brand-900/20 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-brand-900/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-900/10 group-hover:shadow-[0_0_16px_rgba(15,27,61,0.2)] transition-all duration-300">
                  <Icon className="w-5 h-5 text-brand-900" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-ink-900 leading-tight">{badge.label}</div>
                  <div className="text-xs text-ink-400 mt-0.5">{badge.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client logos heading */}
        <div className={`text-center mb-8 transition-all duration-800 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-display font-semibold tracking-[0.25em] uppercase text-ink-400">
            Trusted by ambitious brands across industries
          </p>
        </div>

        {/* Client logo marquee */}
        <div className={`relative transition-all duration-800 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #FFFFFF, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #FFFFFF, transparent)' }} />

            <div className="flex gap-4 animate-marquee" style={{ width: 'max-content' }}>
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 glass rounded-xl px-6 py-3.5 border border-ink-200 hover:border-brand-900/20 transition-all duration-300 flex-shrink-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-900/10 to-brand-900/8 flex items-center justify-center border border-brand-900/15">
                    <span className="font-display font-bold text-sm text-brand-900">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-ink-700 whitespace-nowrap">{client.name}</div>
                    <div className="text-[10px] text-ink-300 whitespace-nowrap">{client.sector}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
