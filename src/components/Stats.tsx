import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across diverse industries' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Consistently maintained' },
  { value: 5, suffix: '+', label: 'Years Experience', desc: 'In digital excellence' },
  { value: 200, suffix: '+', label: 'SEO Keywords Ranked', desc: 'On page one results' },
  { value: 12, suffix: '+', label: 'Services Offered', desc: 'Comprehensive solutions' },
  { value: 40, suffix: '+', label: 'Brands Elevated', desc: 'To new digital heights' },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function Stats() {
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
    <section className="relative py-28 overflow-hidden bg-black-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(ellipse, #0066FF, transparent)' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>By The Numbers</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl text-white">
            Results That <span className="text-gradient-blue">Speak</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-6 glass-blue rounded-2xl hover:border-blue-500/40 transition-all duration-700 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display font-bold text-4xl md:text-5xl mb-2 text-gradient-blue group-hover:text-glow-blue transition-all duration-300">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} active={visible} />
              </div>
              <div className="font-display font-semibold text-white text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-white/30">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
