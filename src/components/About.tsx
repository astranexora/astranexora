import { useRef, useEffect, useState } from 'react';
import { Award, Rocket, Globe, TrendingUp } from 'lucide-react';

const expertise = [
  { label: 'Digital Marketing', level: 95, color: '#0066FF' },
  { label: 'SEO Optimization', level: 92, color: '#0088FF' },
  { label: 'Website Development', level: 90, color: '#00AAFF' },
  { label: 'WordPress & Wix', level: 87, color: '#00CFFF' },
  { label: 'Brand Strategy', level: 93, color: '#00BBEE' },
  { label: 'Content Creation', level: 88, color: '#0099DD' },
];

const timeline = [
  { year: '2019', event: 'Began digital marketing journey, building expertise in SEO and web development.', icon: Rocket },
  { year: '2021', event: 'Expanded into branding and content strategy, serving startups and SMEs.', icon: TrendingUp },
  { year: '2023', event: 'Founded Astra Nexora with a vision to deliver premium digital experiences.', icon: Award },
  { year: '2024', event: 'Scaled operations, serving businesses across multiple industries globally.', icon: Globe },
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
    <section id="about" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 aurora-bg-2 opacity-50" />
      <div className="absolute inset-0 dot-grid opacity-[0.06]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Ambient orb */}
      <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,100,255,0.08), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Story */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="section-label mb-6">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
              <span>About Astra Nexora</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-8 leading-tight">
              Digital Powerhouse
              <br />
              <span className="text-gradient-blue">Built For Growth</span>
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed mb-10">
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
            <div className="relative h-px bg-white/5 mb-10">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric to-blue-500 transition-all duration-[1500ms] ease-out"
                style={{ width: visible ? '100%' : '0%' }}
              />
            </div>

            {/* Stats 2x2 */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: 'Projects Delivered', value: '150+' },
                { label: 'Industries Served', value: '20+' },
                { label: 'Client Satisfaction', value: '98%' },
                { label: 'Years Experience', value: '5+' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`glass-blue rounded-xl p-5 border border-blue-500/10 hover:border-blue-500/25 transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${400 + i * 80}ms` }}
                >
                  <div className="font-display font-bold text-3xl text-gradient-blue mb-1 group-hover:scale-105 transition-transform duration-300 inline-block">{stat.value}</div>
                  <div className="text-xs text-white/35 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Expertise + Timeline */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Expertise bars */}
            <div className="glass-blue rounded-2xl p-8 border border-blue-500/10">
              <h3 className="font-display font-semibold text-white text-lg mb-7">Core Expertise</h3>
              <div className="space-y-5">
                {expertise.map((skill, i) => (
                  <div
                    key={skill.label}
                    className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-white/55 font-medium">{skill.label}</span>
                      <span className="font-display font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
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

            {/* Timeline */}
            <div className="glass rounded-2xl p-8 border border-white/5">
              <h3 className="font-display font-semibold text-white text-lg mb-7">Our Journey</h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-2 bottom-0 w-px">
                  <div
                    className="h-full bg-gradient-to-b from-blue-500 via-electric/40 to-transparent transition-all duration-[2000ms] ease-out"
                    style={{ transform: visible ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top' }}
                  />
                </div>

                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.year}
                      className={`relative pl-14 pb-8 last:pb-0 group transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${500 + i * 120}ms` }}
                    >
                      {/* Icon dot */}
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-blue-500/30 bg-black-900 flex items-center justify-center group-hover:border-blue-500/80 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_14px_rgba(0,102,255,0.3)] transition-all duration-300">
                        <Icon className="w-4 h-4 text-blue-400/60 group-hover:text-electric transition-colors duration-300" />
                      </div>

                      <div className="font-display font-bold text-sm text-gradient-blue mb-1">{item.year}</div>
                      <div className="text-sm text-white/40 leading-relaxed">{item.event}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
