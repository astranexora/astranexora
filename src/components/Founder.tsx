import { useRef, useEffect, useState } from 'react';
import { Linkedin, Award, Star } from 'lucide-react';

const expertise = [
  { label: 'Digital Marketing', level: 95 },
  { label: 'SEO Optimization', level: 92 },
  { label: 'Website Development', level: 90 },
  { label: 'WordPress & Wix', level: 87 },
  { label: 'Branding', level: 93 },
  { label: 'Content Creation', level: 88 },
];

const badges = [
  { icon: Star, label: '5+ Years', sub: 'Experience', delay: '0s', pos: '-top-4 -right-4' },
  { icon: Award, label: '150+', sub: 'Projects', delay: '3s', pos: '-bottom-4 -left-4' },
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
      {/* BG effects */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,60,200,0.12), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Photo */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Outer rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[340px] h-[340px] rounded-full border border-blue-500/10 animate-spin-slow" />
                <div className="absolute w-[300px] h-[300px] rounded-full border border-electric/8 animate-spin-reverse" />
                <div className="absolute w-[260px] h-[260px] rounded-full border border-blue-500/5" />
              </div>

              {/* Ambient glow under photo */}
              <div className="absolute inset-8 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.25), rgba(0,207,255,0.08), transparent)' }} />

              {/* Photo frame */}
              <div
                className="relative z-10 rounded-3xl overflow-hidden"
                style={{
                  padding: '2px',
                  background: 'linear-gradient(135deg, rgba(0,102,255,0.7) 0%, rgba(0,207,255,0.4) 40%, rgba(0,102,255,0.2) 70%, rgba(0,207,255,0.5) 100%)',
                  boxShadow: '0 0 40px rgba(0,102,255,0.3), 0 0 80px rgba(0,102,255,0.12), 0 0 120px rgba(0,102,255,0.05)',
                }}
              >
                <div className="relative rounded-3xl overflow-hidden bg-black-950">
                  <img
                    src="/image copy.png"
                    alt="S. Saktheeswaran — Founder & Managing Director, Astra Nexora"
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: '3/4' }}
                  />
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20"
                    style={{ background: 'linear-gradient(to top, rgba(6,6,9,0.5), transparent)' }} />
                </div>
              </div>

              {/* Floating badges */}
              {badges.map(badge => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className={`absolute ${badge.pos} z-20 glass-blue rounded-xl px-4 py-3 border border-blue-500/20 shadow-[0_0_20px_rgba(0,102,255,0.2)] animate-float`}
                    style={{ animationDelay: badge.delay }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-electric" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-white">{badge.label}</div>
                        <div className="text-[10px] text-white/35">{badge.sub}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LinkedIn CTA */}
            <div className="mt-10 max-w-sm mx-auto lg:mx-0">
              <a
                href="https://www.linkedin.com/in/saktheeswaran-s-30a036273/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="section-label mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
              <span>Meet The Founder</span>
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              The Vision
              <br />
              <span className="text-gradient-blue">Behind Astra Nexora</span>
            </h2>

            <div className="space-y-4 text-white/50 leading-relaxed mb-8">
              <p>
                S. Saktheeswaran is the Founder & Managing Director of Astra Nexora, specializing in
                Digital Marketing, SEO Optimization, Website Development, WordPress Development,
                Wix Development, Branding and Content Creation.
              </p>
              <p>
                He focuses on helping businesses create impactful digital experiences that combine
                creativity, strategy and measurable business growth.
              </p>
            </div>

            {/* Expertise bars */}
            <div className="glass-blue rounded-2xl p-7 border border-blue-500/10">
              <h3 className="font-display font-semibold text-white mb-6">Core Expertise</h3>
              <div className="space-y-4">
                {expertise.map((skill, i) => (
                  <div
                    key={skill.label}
                    className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${400 + i * 80}ms` }}
                  >
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/55">{skill.label}</span>
                      <span className="text-electric font-display font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-[1500ms] ease-out"
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          background: 'linear-gradient(90deg, #0066FF, #00CFFF)',
                          boxShadow: '0 0 8px rgba(0,207,255,0.4)',
                          transitionDelay: `${400 + i * 80}ms`,
                        }}
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
