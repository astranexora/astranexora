import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap, ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
};

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
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Our Services</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            Premium Digital <span className="text-gradient-blue">Solutions</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            End-to-end digital services designed to build, grow and dominate your online presence.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Zap;
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={`group glass-blue rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-700 relative overflow-hidden flex flex-col ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Bottom border sweep */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-electric to-transparent w-0 group-hover:w-full transition-all duration-700" />

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 group-hover:from-blue-500/5 to-transparent transition-all duration-500" />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center mb-4 group-hover:bg-blue-500/25 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-electric" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm mb-2 group-hover:text-gradient-blue">{service.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{service.description.slice(0, 100)}...</p>
                  <div className="flex items-center gap-2 text-xs text-electric font-display font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
