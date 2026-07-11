import { useRef, useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Portfolio() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tags = ['All', ...Array.from(new Set(projects.map(p => p.tag)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.tag === filter);
  const featured = filtered.find(p => (p as any).featured);
  const regular = filtered.filter(p => !(p as any).featured);

  return (
    <section id="portfolio" className="relative py-20 md:py-28 overflow-hidden bg-cloud">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08), transparent)' }} />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.06), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header — asymmetric */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-5">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
              <span>Selected Work</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-ink-900 tracking-tight leading-[1.05]">
              Crafting Digital
              <br />
              <span className="text-gradient-blue">Masterpieces</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ink-500 text-lg max-w-md leading-relaxed md:text-right"
          >
            Each project is a unique story of transformation. Explore our curated portfolio of premium digital experiences.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-full font-display text-xs font-semibold transition-all duration-300 ${
                filter === tag
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white border border-brand-500 shadow-[0_4px_16px_rgba(0,102,255,0.2)]'
                  : 'glass text-ink-500 border border-ink-200 hover:text-ink-700 hover:border-brand-500/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Featured project — editorial split */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <Link
              to={`/portfolio/${featured.id}`}
              className="group relative block rounded-3xl overflow-hidden border border-ink-200 hover:border-brand-500/20 transition-all duration-500 shadow-[0_4px_30px_rgba(10,15,28,0.04)]"
            >
              <div className="grid lg:grid-cols-12 gap-0">
                {/* Image — 7 cols */}
                <div className="relative h-72 lg:h-auto lg:min-h-[440px] lg:col-span-7 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/8 to-brand-600/4" />
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-500/15 to-brand-600/8 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-brand-500/40" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-cloud via-cloud/40 to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 border border-brand-400/30 shadow-lg">
                    <span className="text-xs font-display font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Featured Project
                    </span>
                  </div>

                  {/* Large editorial number */}
                  <div className="absolute bottom-4 left-6 font-display font-bold text-7xl text-white/20 select-none hidden lg:block">
                    01
                  </div>
                </div>

                {/* Content — 5 cols */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center relative bg-white">
                  <div className="mb-2 text-sm text-brand-600 font-display font-medium">{featured.tag}</div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-ink-900 mb-5 group-hover:text-brand-500 transition-all duration-300 leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-ink-500 leading-[1.7] mb-7">
                    {featured.shortDesc}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {featured.results?.slice(0, 4).map((result, i) => (
                      <div key={i} className="glass-blue rounded-xl p-3.5 border border-brand-500/10">
                        <div className="text-xl font-display font-bold text-gradient-blue">{result.value}</div>
                        <div className="text-xs text-ink-500 mt-0.5">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-display bg-ink-100 text-ink-500 border border-ink-200">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand-500 font-display font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.06), transparent 70%)' }} />
            </Link>
          </motion.div>
        )}

        {/* Regular projects — asymmetric grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Stats bar — navy accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 relative rounded-2xl navy-divider p-8 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '12+', label: 'Industries Served' },
              { value: '5+', label: 'Years Experience' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/60 font-display tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, visible }: { project: typeof projects[0]; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((e.clientY - rect.top - cy) / cy) * -5;
    const rotY = ((e.clientX - rect.left - cx) / cx) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
    >
      <Link
        ref={cardRef}
        to={`/portfolio/${project.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block glass rounded-2xl overflow-hidden border border-ink-200 hover:border-brand-500/20 transition-all duration-500"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(0,102,255,0.1), transparent)` }}
        />

        {/* Image area */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${project.color}15, ${project.color}08, transparent)`,
              opacity: imageLoaded && !imageError ? 0.3 : 1,
            }}
          />

          {project.image && !imageError ? (
            <img
              src={project.image}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl" style={{ background: `${project.color}30` }} />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-cloud via-cloud/30 to-transparent" />

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-xl glass-blue flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-brand-500/20">
            <ArrowUpRight className="w-4 h-4 text-brand-500" />
          </div>

          {/* Tag */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-semibold backdrop-blur-sm border"
              style={{
                background: `${project.color}25`,
                borderColor: `${project.color}50`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
          </div>

          {/* Editorial number */}
          <div className="absolute bottom-3 right-4 font-display font-bold text-3xl text-white/30 select-none">
            {String(index + 2).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="font-display font-semibold text-ink-900 text-base mb-2.5 group-hover:text-brand-500 transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
          <p className="text-ink-500 text-xs leading-[1.7] mb-4 line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-display bg-ink-100 text-ink-400 border border-ink-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </motion.div>
  );
}
