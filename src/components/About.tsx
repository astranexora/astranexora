import { useRef, useEffect, useState } from 'react';

const expertise = [
  { label: 'Digital Marketing', level: 95 },
  { label: 'SEO Optimization', level: 92 },
  { label: 'Website Development', level: 90 },
  { label: 'WordPress & Wix', level: 87 },
  { label: 'Brand Strategy', level: 93 },
  { label: 'Content Creation', level: 88 },
];

const timeline = [
  { year: '2019', event: 'Began digital marketing journey, building expertise in SEO and web development.' },
  { year: '2021', event: 'Expanded into branding and content strategy, serving startups and SMEs.' },
  { year: '2023', event: 'Founded Astra Nexora with a vision to deliver premium digital experiences.' },
  { year: '2024', event: 'Scaled operations, serving businesses across multiple industries globally.' },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-32 overflow-hidden bg-black-900">
      <div className="absolute inset-0 aurora-bg opacity-40" />
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="section-label mb-6">
              <span className="w-6 h-px bg-electric" />
              <span>About Astra Nexora</span>
              <span className="w-6 h-px bg-electric" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight">
              Digital Powerhouse
              <br />
              <span className="text-gradient-blue">Built For Growth</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Astra Nexora is a modern digital marketing agency helping businesses, startups and creators build powerful digital identities through branding, website development, SEO optimization, content creation and growth-focused marketing strategies.
              </p>
              <p>
                We don't just execute tasks — we think strategically, create passionately and measure obsessively. Every project begins with understanding your business goals and ends with demonstrable results.
              </p>
            </div>

            {/* Animated line */}
            <div className="my-8 relative h-px bg-white/10">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-electric to-blue-500 transition-all duration-1500" style={{ width: visible ? '100%' : '0%' }} />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Projects Delivered', value: '150+' },
                { label: 'Industries Served', value: '20+' },
                { label: 'Client Satisfaction', value: '98%' },
                { label: 'Years Experience', value: '5+' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-gradient-blue mb-1">{stat.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Expertise + Timeline */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Expertise bars */}
            <div className="glass-blue rounded-2xl p-8">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Core Expertise</h3>
              <div className="space-y-4">
                {expertise.map(skill => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">{skill.label}</span>
                      <span className="text-electric font-display font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-electric transition-all duration-1500 ease-out"
                        style={{ width: visible ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-semibold text-white text-lg mb-6">Our Journey</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-electric/30 to-transparent" />
                {timeline.map(item => (
                  <div key={item.year} className="relative pl-12 pb-6 last:pb-0 group">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-blue-500 bg-black-900 group-hover:bg-blue-500 transition-colors duration-300" />
                    <div className="font-display font-bold text-sm text-gradient-blue mb-1">{item.year}</div>
                    <div className="text-sm text-white/50 leading-relaxed">{item.event}</div>
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
