import { useRef, useEffect, useState } from 'react';

const expertise = [
  { label: 'Digital Marketing', level: 95, color: '#0066FF' },
  { label: 'SEO Optimization', level: 92, color: '#0088FF' },
  { label: 'Website Development', level: 90, color: '#00AAFF' },
  { label: 'WordPress & Wix', level: 87, color: '#00CFFF' },
  { label: 'Brand Strategy', level: 93, color: '#00BBEE' },
  { label: 'Content Creation', level: 88, color: '#0099DD' },
];


export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden bg-cloud">
      <div className="absolute inset-0 aurora-bg-2 opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" />

      {/* Ambient orb */}
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,100,255,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Left: Story */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="section-label mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-brand-500" />
              <span>About Astra Nexora</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-900 mb-7 leading-[1.1] tracking-tight">
              Digital Powerhouse
              <br />
              <span className="text-gradient-blue">Built For Growth</span>
            </h2>
            <div className="space-y-5 text-ink-500 leading-[1.7] mb-10">
              <p>
                Astra Nexora is a modern digital marketing agency helping businesses, startups and creators build
                powerful digital identities through branding, website development, SEO optimization, content
                creation and growth-focused marketing strategies.
              </p>
              <p>
                We don't just execute tasks — we think strategically, create passionately and measure obsessively.
                Every project begins with understanding your business goals and ends with demonstrable results.
              </p>
            </div>

            {/* Animated line */}
            <div className="relative h-px bg-ink-100 mb-10">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-[1500ms] ease-out"
                style={{ width: visible ? '100%' : '0%' }}
              />
            </div>

            {/* Stats 2x2 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Projects Delivered', value: '150+' },
                { label: 'Industries Served', value: '20+' },
                { label: 'Client Satisfaction', value: '98%' },
                { label: 'Years Experience', value: '5+' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`glass-blue rounded-2xl p-6 border border-ink-200 hover:border-brand-500/20 hover:-translate-y-0.5 transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${400 + i * 80}ms` }}
                >
                  <div className="font-display font-bold text-3xl text-gradient-blue mb-1.5 group-hover:scale-105 transition-transform duration-300 inline-block">{stat.value}</div>
                  <div className="text-xs text-ink-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Expertise */}
          <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Expertise bars */}
            <div className="glass-blue rounded-3xl p-8 border border-ink-200">
              <h3 className="font-display font-semibold text-ink-900 text-lg mb-7">Core Expertise</h3>
              <div className="space-y-6">
                {expertise.map((skill, i) => (
                  <div
                    key={skill.label}
                    className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-ink-700 font-medium">{skill.label}</span>
                      <span className="font-display font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-[1500ms] ease-out"
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          background: `linear-gradient(90deg, #0066FF, ${skill.color})`,
                          boxShadow: `0 0 8px ${skill.color}40`,
                          transitionDelay: `${300 + i * 80}ms`,
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
