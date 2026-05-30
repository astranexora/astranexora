import { useRef, useEffect, useState } from 'react';
import { Shield, Zap, Target, BarChart3, Users, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Strategy Before Execution',
    desc: 'We never jump to design without understanding your business. Every pixel serves a strategic purpose rooted in research and clear objectives.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Obsessed With Results',
    desc: 'Beautiful design means nothing without measurable impact. We track, optimize and report on the metrics that matter to your bottom line.',
    color: 'from-blue-600 to-electric',
  },
  {
    icon: Lightbulb,
    title: 'Creative That Converts',
    desc: 'Our creative work isn\'t just aesthetically premium — it\'s engineered to guide visitors toward action through persuasive design psychology.',
    color: 'from-electric to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Premium Quality Standard',
    desc: 'Every deliverable meets an exacting standard. No shortcuts, no templates, no compromises. The quality of your digital presence reflects the quality of your business.',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Users,
    title: 'True Partnership',
    desc: 'We become an extension of your team. Open communication, shared goals and genuine investment in your success — not just vendor-client transactions.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Premium quality doesn\'t mean slow delivery. Our streamlined processes and experienced team deliver exceptional results on aggressive timelines.',
    color: 'from-blue-700 to-electric',
  },
];

export default function WhyUs() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <section className="relative py-32 overflow-hidden bg-black-950">
      <div className="absolute inset-0 mesh-bg opacity-30" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Why Astra Nexora</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            What Sets Us <span className="text-gradient-blue">Apart</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Six principles that define every engagement, every deliverable and every result.
          </p>
        </div>

        {/* Hexagonal grid layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`group relative glass-blue rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-700 overflow-hidden ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-electric/0 group-hover:from-blue-500/5 group-hover:to-electric/5 transition-all duration-500" />

              {/* Animated border sweep */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent w-0 group-hover:w-full transition-all duration-700" />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-3 group-hover:text-gradient-blue transition-colors">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
