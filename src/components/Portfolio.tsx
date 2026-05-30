import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Our Work</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5">
            Projects That <span className="text-gradient-blue">Deliver</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real results from real strategy. Every project built to create measurable impact.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-800 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-lg font-display text-xs font-semibold transition-all duration-300 ${
                filter === tag
                  ? 'bg-blue-500/20 text-electric border border-blue-500/30'
                  : 'glass text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className={`group relative glass rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/50 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-electric" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-electric border border-blue-500/30 backdrop-blur-sm">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-semibold text-white mb-2 group-hover:text-gradient-blue transition-colors">{project.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-white/5 text-white/30">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
