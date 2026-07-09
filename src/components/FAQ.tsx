import { useRef, useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What services does Astra Nexora offer?',
    a: 'We offer a comprehensive suite of digital services including website development, WordPress & Wix development, website revamp, SEO optimization, social media marketing, email marketing, content creation, brand identity design, personal branding, AI-based solutions including custom chatbot development and workflow automation, and end-to-end digital marketing solutions.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary by scope. A website typically takes 4–8 weeks, a brand identity 3–4 weeks, an SEO campaign shows initial results in 3–6 months. We provide detailed timelines at project kickoff and keep you updated throughout.',
  },
  {
    q: 'Do you work with businesses of all sizes?',
    a: 'Absolutely. We work with startups, growing SMEs and established businesses. Our solutions are scaled and priced appropriately for each client\'s stage and goals. What matters to us is your ambition, not your company size.',
  },
  {
    q: 'How do you measure and report on results?',
    a: 'Every engagement includes clear KPIs tied to business outcomes — traffic, leads, conversions, revenue. We provide regular reports with full transparency. You\'ll always know exactly what\'s happening and what results your investment is generating.',
  },
  {
    q: 'What makes Astra Nexora different from other agencies?',
    a: 'Three things: deep strategic thinking before any creative work, an obsession with measurable business results, and a premium quality standard applied to every deliverable. We don\'t just execute tasks — we act as strategic partners invested in your growth.',
  },
  {
    q: 'Do you offer ongoing support after project completion?',
    a: 'Yes. We offer ongoing maintenance, support and growth retainer packages. Many clients start with a project and transition to a long-term partnership as they see the results we deliver.',
  },
  {
    q: 'How do I get started with Astra Nexora?',
    a: 'Simply reach out through our contact section or email us at info.astranexora@gmail.com. We\'ll schedule a discovery call to understand your goals, after which we\'ll provide a tailored proposal with timeline and investment details.',
  },
  {
    q: 'What industries do you specialize in?',
    a: 'We\'ve worked across technology, healthcare, professional services, e-commerce, education, finance and creative industries. Our strategic approach adapts to any industry — what\'s constant is our commitment to results.',
  },
];

export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section id="faq" className="relative py-28 md:py-36 overflow-hidden bg-black-950">
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,40,150,0.08), transparent)' }} />

      <div ref={ref} className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="section-label justify-center mb-4">
            <span className="w-6 h-px bg-electric" />
            <span>FAQ</span>
            <span className="w-6 h-px bg-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-5 tracking-tight">
            Frequently Asked
            <br />
            <span className="text-gradient-blue">Questions</span>
          </h2>
          <p className="text-white/45 leading-relaxed">Everything you need to know before we start building together.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item rounded-2xl overflow-hidden transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${openIndex === i ? 'glass-blue' : 'glass'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-display font-semibold text-sm md:text-base pr-4 transition-colors duration-300 ${
                  openIndex === i ? 'text-white' : 'text-white/70'
                }`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-blue-500 rotate-0' : 'bg-white/5 rotate-0'
                }`}>
                  {openIndex === i
                    ? <Minus className="w-4 h-4 text-white" />
                    : <Plus className="w-4 h-4 text-white/60" />
                  }
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: openIndex === i ? '400px' : '0px' }}
              >
                <div className="px-6 pb-6 text-white/55 text-sm leading-[1.7] border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
