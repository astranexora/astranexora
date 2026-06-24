import { useRef, useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';

const expertise = [
  { label: 'Digital Marketing', level: 95 },
  { label: 'SEO Optimization', level: 92 },
  { label: 'Website Development', level: 90 },
  { label: 'WordPress & Wix', level: 87 },
  { label: 'Branding', level: 93 },
  { label: 'Content Creation', level: 88 },
];

export default function Founder() {
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
    <section id="founder" className="relative py-32 overflow-hidden bg-black-950">
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Portrait */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full border border-blue-500/20 animate-spin-slow" />
                <div className="absolute w-72 h-72 rounded-full border border-electric/15 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
              </div>

              {/* Portrait frame */}
              <div className="relative z-10 rounded-2xl p-[2px]" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.6), rgba(6,182,212,0.3), rgba(0,102,255,0.2))' }}>
                <div className="relative rounded-2xl overflow-hidden bg-gray-950" style={{ boxShadow: '0 0 40px rgba(0,102,255,0.25), 0 0 80px rgba(0,102,255,0.1), inset 0 0 20px rgba(0,102,255,0.05)' }}>
                  <img
                    src="/image copy.png"
                    alt="S. Saktheeswaran — Founder & Managing Director, Astra Nexora"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4', objectPosition: 'center top' }}
                  />
                  {/* Subtle bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-2xl" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-1/4 glass-blue rounded-xl px-4 py-3 animate-float z-20">
                <div className="text-xs text-electric font-display font-bold">5+ Years</div>
                <div className="text-[10px] text-white/30">Experience</div>
              </div>
              <div className="absolute -left-4 bottom-1/3 glass-blue rounded-xl px-4 py-3 animate-float-slow z-20">
                <div className="text-xs text-electric font-display font-bold">150+</div>
                <div className="text-[10px] text-white/30">Projects</div>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/saktheeswaran-s-30a036273/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 mx-auto lg:mx-0 w-full btn-primary flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </span>
            </a>
          </div>

          {/* Right: Info */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="section-label mb-6">
              <span className="w-6 h-px bg-electric" />
              <span>Meet The Founder</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              The Vision
              <br />
              <span className="text-gradient-blue">Behind Astra Nexora</span>
            </h2>

            <div className="space-y-4 text-white/60 leading-relaxed mb-8">
              <p>
                S. Saktheeswaran is the Founder & Managing Director of Astra Nexora, specializing in Digital Marketing, SEO Optimization, Website Development, WordPress Development, Wix Development, Branding and Content Creation.
              </p>
              <p>
                He focuses on helping businesses create impactful digital experiences that combine creativity, strategy and measurable business growth.
              </p>
            </div>

            {/* Expertise bars */}
            <div className="glass-blue rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white mb-5">Expertise</h3>
              <div className="space-y-3">
                {expertise.map(skill => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/60">{skill.label}</span>
                      <span className="text-electric font-display font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-electric transition-all duration-1500 ease-out"
                        style={{ width: visible ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
