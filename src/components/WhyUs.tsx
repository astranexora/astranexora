import { useRef, useEffect, useState, MouseEvent } from 'react';
import { Shield, Zap, Target, BarChart3, Users, Lightbulb } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Strategy Before Execution',
    desc: 'We never jump to design without understanding your business. Every pixel serves a strategic purpose rooted in research and clear objectives.',
    gradient: 'from-brand-600 to-brand-500',
    glow: 'rgba(0,102,255,0.4)',
  },
  {
    icon: BarChart3,
    title: 'Obsessed With Results',
    desc: 'Beautiful design means nothing without measurable impact. We track, optimize and report on the metrics that matter to your bottom line.',
    gradient: 'from-brand-500 to-brand-600',
    glow: 'rgba(0,150,255,0.4)',
  },
  {
    icon: Lightbulb,
    title: 'Creative That Converts',
    desc: "Our creative work isn't just aesthetically premium — it's engineered to guide visitors toward action through persuasive design psychology.",
    gradient: 'from-brand-500 to-cyan-400',
    glow: 'rgba(0,207,255,0.4)',
  },
  {
    icon: Shield,
    title: 'Premium Quality Standard',
    desc: 'Every deliverable meets an exacting standard. No shortcuts, no templates, no compromises. The quality of your digital presence reflects your business.',
    gradient: 'from-cyan-400 to-brand-500',
    glow: 'rgba(0,180,220,0.4)',
  },
  {
    icon: Users,
    title: 'True Partnership',
    desc: 'We become an extension of your team. Open communication, shared goals and genuine investment in your success — not just vendor-client transactions.',
    gradient: 'from-brand-500 to-brand-700',
    glow: 'rgba(0,80,200,0.4)',
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: "Premium quality doesn't mean slow delivery. Our streamlined processes and experienced team deliver exceptional results on aggressive timelines.",
    gradient: 'from-brand-700 to-brand-600',
    glow: 'rgba(0,102,255,0.4)',
  },
];

function ReasonCard({ reason, index, visible }: { reason: typeof reasons[0]; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass-card rounded-2xl p-8 border border-ink-200 overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 90}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* Hover glow bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/0 group-hover:from-brand-500/6 group-hover:to-brand-500/4 transition-all duration-500 rounded-2xl" />

      {/* Subtle navy glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 40px rgba(0,102,255,0.12), 0 0 80px rgba(0,61,153,0.06)' }}
      />

      {/* Corner glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${reason.glow}, transparent)` }}
      />

      {/* Top border sweep */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom border sweep */}
      <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />

      {/* Editorial number */}
      <div className="absolute top-5 right-6 font-display font-black text-3xl leading-none text-brand-500/[0.08] group-hover:text-brand-500/[0.14] transition-colors duration-500 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all duration-300`}>
          <reason.icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-ink-900 text-lg mb-3 group-hover:text-brand-500 transition-colors duration-300 leading-tight">
          {reason.title}
        </h3>

        {/* Desc */}
        <p className="text-ink-500 text-sm leading-[1.7]">
          {reason.desc}
        </p>
      </div>
    </div>
  );
}

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
    <section className="relative py-28 md:py-36 overflow-hidden bg-cloud">
      {/* Bold navy gradient band at top — thin strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 navy-divider z-20" />

      {/* Decorative mesh-bg overlay */}
      <div className="absolute inset-0 mesh-bg opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,40,150,0.1), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
            <span>Why Astra Nexora</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-brand-500" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-5 tracking-tight">
            What Sets Us <span className="text-gradient-navy">Apart</span>
          </h2>
          <p className="text-ink-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Six principles that define every engagement, every deliverable and every result.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
