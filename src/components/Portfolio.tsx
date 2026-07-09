import { useRef, useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';
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
    <section id="portfolio" className="relative py-32 overflow-hidden bg-black-950">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1), transparent)' }} />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Selected Work</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-white mb-5">
            Crafting Digital <span className="text-gradient-blue">Masterpieces</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Each project is a unique story of transformation. Explore our curated portfolio of premium digital experiences.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-5 py-2 rounded-full font-display text-xs font-semibold transition-all duration-300 ${
                filter === tag
                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/20 text-white border border-blue-500/40 shadow-[0_0_20px_rgba(0,102,255,0.2)]'
                  : 'glass text-white/40 border border-white/5 hover:text-white/70 hover:border-white/15'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <Link
              to={`/portfolio/${featured.id}`}
              className="group relative block rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(0,102,255,0.05))',
              }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-600/10" />
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-blue-500/20 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-white/40" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black-950 via-black-950/50 to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/20 border border-indigo-400/30 backdrop-blur-sm">
                    <span className="text-xs font-display font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-indigo-300" />
                      Featured Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                  <div className="mb-2 text-sm text-indigo-300 font-display font-medium">{featured.tag}</div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-5 group-hover:text-gradient-blue transition-all duration-300 leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-white/55 leading-[1.7] mb-8 max-w-md">
                    {featured.shortDesc}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {featured.results?.slice(0, 4).map((result, i) => (
                      <div key={i} className="glass rounded-xl p-3.5 border border-white/5">
                        <div className="text-xl font-display font-bold text-gradient-blue">{result.value}</div>
                        <div className="text-xs text-white/40 mt-0.5">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-display bg-white/5 text-white/50 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-electric font-display font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.1), transparent 70%)' }} />
            </Link>
          </motion.div>
        )}

        {/* Regular projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '12+', label: 'Industries Served' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 border border-white/5 text-center">
              <div className="font-display font-bold text-2xl md:text-3xl text-gradient-blue mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 font-display">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
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

    // Tilt effect
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((e.clientY - rect.top - cy) / cy) * -6;
    const rotY = ((e.clientX - rect.left - cx) / cx) * 6;
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
        className="group relative block glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(0,102,255,0.15), transparent)`,
          }}
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

          <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/30 to-transparent" />

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl glass-blue flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-blue-500/20"
          >
            <ArrowUpRight className="w-4 h-4 text-electric" />
          </motion.div>

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
              <Layers className="w-2.5 h-2.5" />
              {project.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="font-display font-semibold text-white text-base mb-2.5 group-hover:text-electric transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
          <p className="text-white/40 text-xs leading-[1.7] mb-4 line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-display bg-white/[0.03] text-white/30 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </motion.div>
  );
}
