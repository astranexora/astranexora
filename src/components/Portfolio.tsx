import { useRef, useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { ArrowUpRight, Layers } from 'lucide-react';

function ProjectCard({ project, index, visible }: { project: typeof projects[0]; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <Link
      ref={cardRef}
      to={`/portfolio/${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(0,102,255,0.15)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${300 + index * 100}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden">
        {/* Loading skeleton / fallback gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}15, ${project.color}08, transparent)`,
            opacity: imageLoaded && !imageError ? 0 : 1,
          }}
        />

        {/* Project image */}
        {project.image && !imageError && (
          <img
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/40 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 group-hover:from-blue-600/10 to-transparent transition-all duration-500" />

        {/* Arrow icon */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-lg glass-blue flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 border border-blue-500/20">
          <ArrowUpRight className="w-4 h-4 text-electric" />
        </div>

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold backdrop-blur-sm border"
            style={{
              background: `${project.color}20`,
              borderColor: `${project.color}40`,
              color: project.color,
            }}
          >
            <Layers className="w-3 h-3" />
            {project.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display font-semibold text-white mb-2 group-hover:text-electric transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed mb-5 line-clamp-2">
          {project.shortDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-display bg-white/[0.04] text-white/25 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}

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

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden bg-black-950">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,80,200,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Our Work</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            Projects That <span className="text-gradient-blue">Deliver</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Genuine client work from local businesses and startups. Each project built with care and delivered on time.
          </p>
        </div>

        {/* Filter pills */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-1.5 rounded-lg font-display text-xs font-semibold transition-all duration-300 ${
                filter === tag
                  ? 'bg-blue-500/15 text-electric border border-blue-500/30 shadow-[0_0_12px_rgba(0,102,255,0.15)]'
                  : 'glass text-white/40 border border-white/5 hover:text-white/70 hover:border-white/15'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Projects count */}
        <div className={`text-center mt-12 transition-all duration-800 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm text-white/30 font-display">
            Showing {filtered.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </section>
  );
}
