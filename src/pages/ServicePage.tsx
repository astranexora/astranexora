import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
  ArrowRight, ArrowLeft, CheckCircle, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const iconMap: Record<string, React.ElementType> = {
  Monitor, Globe, Layout, RefreshCw, TrendingUp, Share2,
  Mail, PenTool, Layers, User, Presentation, Zap,
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-4">Service not found</p>
          <Link to="/" className="btn-primary inline-flex">Go Home</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Zap;

  return (
    <div className="min-h-screen bg-black-950 text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-50" />
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #0066FF, transparent)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 items-center justify-center mb-6 mx-auto">
            <Icon className="w-8 h-8 text-electric" />
          </div>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>Service</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-5 leading-tight">{service.hero}</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">{service.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#contact" className="btn-primary"><span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span></a>
            <Link to="/#services" className="btn-outline">All Services</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="section-label mb-4"><span className="w-6 h-px bg-electric" /><span>Overview</span></div>
              <h2 className="font-display font-bold text-3xl text-white mb-5">What We Deliver</h2>
              <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
              <div className="glass-blue rounded-2xl p-6">
                <h3 className="font-display font-semibold text-white mb-4">What's Included</h3>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-electric flex-shrink-0" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="section-label mb-4"><span className="w-6 h-px bg-electric" /><span>Benefits</span></div>
              <h2 className="font-display font-bold text-3xl text-white mb-5">Why It Matters</h2>
              {service.benefits.map((benefit, i) => (
                <div key={benefit.title} className="glass rounded-xl p-5 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      <span className="text-xs font-bold text-electric">0{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white text-sm mb-1">{benefit.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black-950">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center mb-4"><span className="w-6 h-px bg-electric" /><span>Process</span><span className="w-6 h-px bg-electric" /></div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">How We <span className="text-gradient-blue">Work</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={step.step} className="relative">
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-500/40 to-transparent z-0" />
                )}
                <div className="glass-blue rounded-2xl p-6 relative z-10 hover:border-blue-500/40 transition-all duration-300 h-full">
                  <div className="font-display font-bold text-4xl text-blue-500/20 mb-3">{step.step}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <ChevronRight className="w-4 h-4 text-electric" />
                    <h3 className="font-display font-semibold text-white text-sm">{step.title}</h3>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-4">Common <span className="text-gradient-blue">Questions</span></h2>
          </div>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <details key={i} className="group glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300">
                <summary className="p-5 cursor-pointer flex items-center justify-between text-white/80 hover:text-white font-display font-medium text-sm list-none">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-electric flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black-950 relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-30" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-5">Ready to Get Started with<br /><span className="text-gradient-blue">{service.title}?</span></h2>
          <p className="text-white/50 mb-8">Let's discuss your project and create a tailored strategy that delivers real results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="btn-primary"><span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight className="w-4 h-4" /></span></a>
            <Link to="/#services" className="btn-outline">Explore All Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
