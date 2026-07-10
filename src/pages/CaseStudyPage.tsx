import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/portfolio';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-500 mb-4">Project not found</p>
          <Link to="/" className="btn-primary inline-flex">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud text-ink-900">

      <section className="relative pt-40 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cloud via-mist to-cloud" />
        <div className="absolute inset-0 mesh-bg opacity-15" />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.color}15, transparent)` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-ink-400 hover:text-ink-900 transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                background: `${project.color}15`,
                borderColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-ink-400"><Calendar className="w-3 h-3" /> {project.year}</span>
            <span className="flex items-center gap-1.5 text-xs text-ink-400"><Clock className="w-3 h-3" /> {project.duration}</span>
          </div>

          <h1 className="font-display font-bold text-4xl md:text-6xl text-ink-900 mb-5 leading-tight max-w-3xl">{project.title}</h1>
          <p className="text-ink-500 text-lg max-w-2xl mb-10">{project.shortDesc}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-ink-500 border border-ink-200">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-ink-200">
            {/* Loading gradient background */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${project.color}12, ${project.color}06, #EEF2F8)`,
                opacity: imageLoaded ? 0 : 1,
              }}
            />

            {/* Project image */}
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            )}

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-cloud/80 via-transparent to-transparent" />

            {/* Border accent */}
            <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 0 0 1px ${project.color}20` }} />
          </div>
        </div>
      </section>

      <section className="py-12 bg-mist border-t border-ink-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.results.map(result => (
              <div key={result.metric} className="text-center">
                <div className="font-display font-bold text-3xl md:text-4xl text-gradient-blue mb-1">{result.value}</div>
                <div className="text-sm text-ink-400">{result.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cloud">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-label mb-6"><span className="w-6 h-px bg-brand-500" /><span>Project Overview</span></div>
          <p className="text-ink-700 text-lg leading-relaxed">{project.overview}</p>
        </div>
      </section>

      <section className="py-20 bg-mist">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="section-label mb-6"><span className="w-6 h-px bg-brand-500" /><span>Objectives</span></div>
              <h2 className="font-display font-bold text-3xl text-ink-900 mb-8">What We Set Out to <span className="text-gradient-blue">Achieve</span></h2>
              <div className="space-y-4">
                {project.objectives.map((obj, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-7 h-7 rounded-lg bg-brand-500/10 group-hover:bg-brand-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      <span className="text-xs font-bold text-brand-500">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-ink-700 text-sm leading-relaxed pt-1">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-6"><span className="w-6 h-px bg-brand-500" /><span>Solutions</span></div>
              <h2 className="font-display font-bold text-3xl text-ink-900 mb-8">How We <span className="text-gradient-blue">Delivered</span></h2>
              <div className="space-y-3">
                {project.solutions.map((sol, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    </div>
                    <p className="text-ink-500 text-sm leading-relaxed">{sol}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cloud">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4"><span className="w-6 h-px bg-brand-500" /><span>Process</span><span className="w-6 h-px bg-brand-500" /></div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink-900">Our <span className="text-gradient-blue">Approach</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-brand-500/30 to-transparent hidden md:block" />
            <div className="space-y-6">
              {project.process.map((phase) => (
                <div key={phase.phase} className="flex gap-8 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl glass-blue flex items-center justify-center relative z-10 group-hover:border-brand-500/40 transition-all duration-300">
                    <span className="font-display font-bold text-sm text-gradient-blue">{phase.phase}</span>
                  </div>
                  <div className="flex-1 glass rounded-2xl p-6 border border-ink-200 group-hover:border-brand-500/20 transition-all duration-300">
                    <h3 className="font-display font-semibold text-ink-900 mb-2">{phase.title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-mist border-t border-ink-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="section-label mb-6"><span className="w-6 h-px bg-brand-500" /><span>Services Provided</span></div>
          <h2 className="font-display font-bold text-3xl text-ink-900 mb-8">What We <span className="text-gradient-blue">Delivered</span></h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.tags.map((tag, i) => (
              <div
                key={tag}
                className="glass-blue rounded-xl p-4 text-center border border-brand-500/15 hover:border-brand-500/30 transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-sm text-ink-700 font-display font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cloud relative overflow-hidden border-t border-ink-200">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-ink-900 mb-5">Ready to Build<br /><span className="text-gradient-blue">Something Great?</span></h2>
          <p className="text-ink-500 mb-8">Let's discuss how we can help your business with similar results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="btn-primary"><span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight className="w-4 h-4" /></span></a>
            <Link to="/#portfolio" className="btn-outline">View More Work</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
