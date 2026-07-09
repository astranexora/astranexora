import { useRef, useEffect, useState, MouseEvent, ElementType } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Cpu, Zap, ArrowRight
} from 'lucide-react';

const iconMap: Record<string, ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Cpu, Zap,
};

function ServiceCard({ service, index, visible }: { service: typeof services[0]; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = iconMap[service.icon] || Zap;

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    const gx = (x / rect.width) * 100;
    const gy = (y / rect.height) * 100;
    card.style.setProperty('--gx', `${gx}%`);
    card.style.setProperty('--gy', `${gy}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <Link
      ref={cardRef}
      to={`/services/${service.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass-blue rounded-2xl p-7 border border-blue-500/10 overflow-hidden flex flex-col transition-all duration-700 hover:border-blue-500/25 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 55}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Mouse-following spot glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: 'radial-gradient(circle 80px at var(--gx, 50%) var(--gy, 50%), rgba(0,102,255,0.12), transparent)',
        }}
      />

      {/* Top glow border on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom border sweep */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent w-0 group-hover:w-full transition-all duration-700" />

      {/* Glow orb on hover */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl bg-blue-500/0 group-hover:bg-blue-500/15 transition-all duration-700" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon */}
        <div className="relative w-12 h-12 mb-6">
          <div className="absolute inset-0 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 group-hover:from-blue-500/10 to-transparent transition-all duration-500" />
          <div className="relative w-full h-full rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-electric" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-white text-base mb-2.5 group-hover:text-electric transition-colors duration-300 leading-snug">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">
          {service.description.length > 95
            ? service.description.slice(0, 92) + '...'
            : service.description}
        </p>

        {/* Arrow CTA */}
        <div className="flex items-center gap-1.5 text-xs text-electric font-display font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
          Learn More <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default function Services() {
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
    <section id="services" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 aurora-bg opacity-40" />
      <div className="absolute inset-0 mesh-bg opacity-40" />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,60,180,0.15), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Our Services</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            Premium Digital <span className="text-gradient-blue">Solutions</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end digital services designed to build, grow and dominate your online presence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-14 transition-all duration-800 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
