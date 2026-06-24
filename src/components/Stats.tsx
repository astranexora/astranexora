import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', desc: 'Across diverse industries', gradient: 'from-blue-600 to-blue-500' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', desc: 'Consistently maintained', gradient: 'from-blue-500 to-electric' },
  { value: 5, suffix: '+', label: 'Years Experience', desc: 'In digital excellence', gradient: 'from-electric to-cyan-400' },
  { value: 200, suffix: '+', label: 'SEO Keywords Ranked', desc: 'On page one results', gradient: 'from-cyan-400 to-blue-500' },
  { value: 12, suffix: '+', label: 'Services Offered', desc: 'Comprehensive solutions', gradient: 'from-blue-500 to-blue-700' },
  { value: 40, suffix: '+', label: 'Brands Elevated', desc: 'To new digital heights', gradient: 'from-blue-700 to-electric' },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const duration = 70;
    const steps = 60;
    const step = target / steps;
    const timer = setInterval(() => {
      frame++;
      const c = Math.min(Math.floor(step * frame), target);
      setCount(c);
      if (c >= target) clearInterval(timer);
    }, duration);
    return () => clearInterval(timer);
  }, [active, target]);

  return <>{count}{suffix}</>;
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
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(0,60,200,0.12), rgba(0,207,255,0.05), transparent)' }} />
      </div>
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>By The Numbers</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Results That <span className="text-gradient-blue">Speak</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative text-center p-6 glass-blue rounded-2xl border border-blue-500/10 overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_16px_40px_rgba(0,102,255,0.15)] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500" />

              <div className="relative z-10">
                <div className={`font-display font-bold text-3xl md:text-4xl mb-2 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} active={visible} />
                </div>
                <div className="font-display font-semibold text-white text-xs mb-1 leading-tight">{stat.label}</div>
                <div className="text-[10px] text-white/25 leading-relaxed">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
