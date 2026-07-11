import { useRef, useEffect, useState, ElementType } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Cpu, Zap, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Cpu, Zap,
};

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  // Assign alternating sizes for asymmetry
  const layout = services.map((_, i) => {
    const pattern = i % 6;
    if (pattern === 0 || pattern === 3) return 'wide';
    if (pattern === 2 || pattern === 5) return 'tall';
    return 'normal';
  });

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-mist">
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="absolute inset-0 mesh-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,60,180,0.1), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header — asymmetric, left-aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-5">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
              <span>Our Services</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-ink-900 tracking-tight leading-[1.05]">
              Premium Digital
              <br />
              <span className="text-gradient-blue">Solutions</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ink-500 text-lg max-w-md leading-relaxed md:text-right"
          >
            End-to-end digital services designed to build, grow and dominate your online presence.
          </motion.p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Zap;
            const size = layout[i];
            const colSpan = size === 'wide' ? 'lg:col-span-2' : '';
            const rowSpan = size === 'tall' ? 'lg:row-span-2' : '';
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`${colSpan} ${rowSpan}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ opacity: isOtherHovered ? 0.55 : 1, transition: 'opacity 0.3s' }}
              >
                <Link
                  to={`/services/${service.id}`}
                  className="group relative h-full w-full glass-blue rounded-2xl border border-brand-500/10 overflow-hidden flex flex-col transition-all duration-500 hover:border-brand-500/25 hover:shadow-[0_8px_30px_rgba(0,102,255,0.08)] p-6"
                >
                  {/* Editorial number */}
                  <span className="absolute top-4 right-5 font-display font-bold text-5xl leading-none select-none"
                    style={{ color: 'rgba(0,102,255,0.06)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Mouse-following spot glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle 120px at 50% 30%, rgba(0,102,255,0.08), transparent)' }} />

                  {/* Icon */}
                  <div className="relative w-11 h-11 mb-auto">
                    <div className="absolute inset-0 rounded-xl bg-brand-500/8 group-hover:bg-brand-500/12 transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500/0 group-hover:from-brand-500/10 to-transparent transition-all duration-500" />
                    <div className="relative w-full h-full rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-auto">
                    <h3 className="font-display font-semibold text-ink-900 text-base mb-2 group-hover:text-brand-500 transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>
                    <p className={`text-ink-500 text-sm leading-relaxed ${size === 'tall' || size === 'wide' ? '' : 'line-clamp-2'}`}>
                      {size === 'tall' || size === 'wide'
                        ? service.description
                        : service.description.length > 80
                          ? service.description.slice(0, 77) + '...'
                          : service.description}
                    </p>

                    {/* Arrow CTA */}
                    <div className="flex items-center gap-1.5 text-xs text-brand-500 font-display font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom border sweep */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent w-0 group-hover:w-full transition-all duration-700" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
