import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin, GraduationCap, MapPin, Target, Lightbulb, X, ArrowRight,
  Globe, Code2, Search, BarChart3, Video, Share2, Bot, Sparkles, BookOpen,
} from 'lucide-react';

const skills = [
  { icon: Code2, label: 'WordPress & Website Development', level: 90, color: '#0066FF' },
  { icon: Bot, label: 'AI Tools & Automation', level: 88, color: '#0099FF' },
  { icon: Search, label: 'SEO & Google Search Console', level: 92, color: '#00AAFF' },
  { icon: BarChart3, label: 'Google Analytics', level: 85, color: '#00CFFF' },
  { icon: Video, label: 'Video Editing', level: 82, color: '#00BBEE' },
  { icon: Share2, label: 'Social Media Marketing', level: 90, color: '#0099DD' },
];

const values = [
  { icon: Lightbulb, title: 'Continuous Learning', desc: 'Staying current with emerging tools, platforms, and AI technologies to deliver modern solutions.' },
  { icon: Target, title: 'Client-First Mindset', desc: 'Every decision is guided by what delivers the most value to the client\u2019s business goals.' },
  { icon: BarChart3, title: 'Measurable Growth', desc: 'Commitment to outcomes that can be tracked, reported, and tied to real business impact.' },
  { icon: Globe, title: 'Full-Stack Digital', desc: 'End-to-end expertise spanning development, marketing, analytics, and automation under one roof.' },
];

interface FounderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function FounderModal({ isOpen, onClose }: FounderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] overflow-hidden rounded-3xl glass-strong border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 h-full overflow-y-auto p-8 md:p-12">
              <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue border border-blue-500/20 mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-electric" />
                    <span className="text-xs font-display font-semibold text-electric">MEET THE FOUNDER</span>
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight">
                    Meet <span className="text-gradient-blue">The Founder</span>
                  </h2>
                  <p className="text-white/40 max-w-xl mx-auto">
                    Vision, expertise, and values that drive Astra Nexora
                  </p>
                </motion.div>

                {/* Photo and Bio Grid */}
                <div className="grid lg:grid-cols-2 gap-10 mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <img
                        src="/images/image.png"
                        alt="S. Saktheeswaran — Founder & Managing Director of Astra Nexora"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="absolute -bottom-4 left-6 glass-blue rounded-xl px-5 py-3 border border-blue-500/20">
                      <div className="text-lg font-display font-bold text-white">S. Saktheeswaran</div>
                      <div className="text-xs text-white/50">Founder & Managing Director</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-4 tracking-tight">Introduction</h3>
                      <p className="text-white/55 leading-[1.7] mb-4">
                        S. Saktheeswaran is a results-driven BBA graduate and the Founder & Managing Director of
                        Astra Nexora. With a background in administration and operations, he brings a structured,
                        business-first approach to digital marketing and website development.
                      </p>
                      <p className="text-white/55 leading-[1.7]">
                        His expertise spans WordPress and website development, AI tools and automation, SEO, Google
                        Search Console, Google Analytics, video editing, social media marketing, and end-to-end
                        digital marketing services. He believes in a client-first mindset, continuous learning, and
                        a commitment to delivering measurable business growth.
                      </p>
                    </div>

                    <div className="glass rounded-2xl p-5 border border-white/5 space-y-3">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-4 h-4 text-electric flex-shrink-0" />
                        <span className="text-sm text-white/60">BBA Graduate — Business Administration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-electric flex-shrink-0" />
                        <span className="text-sm text-white/60">Based in India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-electric flex-shrink-0" />
                        <span className="text-sm text-white/60">Experience in Administration & Operations</span>
                      </div>
                    </div>

                    <a
                      href="https://www.linkedin.com/in/saktheeswaran-s-30a036273/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect on LinkedIn
                    </a>
                  </motion.div>
                </div>

                {/* Expertise bars */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-16"
                >
                  <h3 className="font-display font-bold text-2xl text-white mb-6 text-center tracking-tight">Areas of Expertise</h3>
                  <div className="glass-blue rounded-3xl p-8 border border-blue-500/10">
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                      {skills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                          <motion.div
                            key={skill.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <Icon className="w-3.5 h-3.5 text-electric" />
                              <span className="text-xs text-white/55 font-medium">{skill.label}</span>
                              <span className="ml-auto font-display font-bold text-xs" style={{ color: skill.color }}>{skill.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ delay: 0.6 + i * 0.08, duration: 1, ease: 'easeOut' }}
                                style={{ background: `linear-gradient(90deg, #0066FF, ${skill.color})`, boxShadow: `0 0 8px ${skill.color}40` }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Values */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-16"
                >
                  <h3 className="font-display font-bold text-2xl text-white mb-6 text-center tracking-tight">Core Values</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {values.map((value, i) => {
                      const Icon = value.icon;
                      return (
                        <motion.div
                          key={value.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + i * 0.08 }}
                          className="glass rounded-xl p-5 border border-white/5 text-center"
                        >
                          <div className="w-10 h-10 rounded-lg bg-blue-500/15 mx-auto mb-3 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-electric" />
                          </div>
                          <h4 className="font-display font-semibold text-white text-sm mb-2">{value.title}</h4>
                          <p className="text-white/40 text-xs leading-[1.6]">{value.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center mt-12"
                >
                  <a href="#contact" onClick={onClose} className="btn-primary inline-flex items-center gap-2">
                    Work Together
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Founder() {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setScrollY((window.innerHeight / 2 - center) * 0.08);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const } },
  };

  return (
    <>
      <section id="founder" className="relative py-28 md:py-36 overflow-hidden bg-black-900">
        {/* BG effects */}
        <div className="absolute inset-0 aurora-bg opacity-40" />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30"
              initial={{
                x: `${(i * 23 + 17) % 100}%`,
                y: `${(i * 19 + 11) % 100}%`,
              }}
              animate={{
                y: [null, `${(i * 19 + 11 + 30) % 100}%`],
              }}
              transition={{
                duration: 8 + (i % 4),
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,60,200,0.15), transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,207,255,0.08), transparent)' }} />

        <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            {/* LEFT: Photo with parallax */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Outer rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[360px] h-[360px] rounded-full border border-blue-500/10 animate-spin-slow" />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-electric/[0.08] animate-spin-reverse" />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-500/[0.06]" />
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-12 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.3), rgba(0,207,255,0.08), transparent)' }} />

              {/* Photo frame with parallax */}
              <div className="relative z-10 max-w-sm mx-auto">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(0,102,255,0.8), rgba(0,207,255,0.5), rgba(0,102,255,0.6))',
                    boxShadow: '0 0 50px rgba(0,102,255,0.3), 0 0 100px rgba(0,207,255,0.1)',
                    transform: `translateY(${scrollY}px)`,
                  }}
                >
                  <div className="relative rounded-3xl overflow-hidden bg-black-950 aspect-[3/4]">
                    <img
                      src="/images/image.png"
                      alt="S. Saktheeswaran — Founder & Managing Director of Astra Nexora"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Floating badge — Education */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-blue rounded-xl px-4 py-2.5 border border-blue-500/25 shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">BBA Graduate</div>
                      <div className="text-[10px] text-white/40">Business Administration</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge — Digital Marketing */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 glass-blue rounded-xl px-4 py-2.5 border border-blue-500/25 shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">Digital Marketing</div>
                      <div className="text-[10px] text-white/40">End-to-End Expertise</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT: Info with staggered reveals */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={visible ? 'visible' : 'hidden'}
            >
              <motion.div variants={itemVariants} className="section-label mb-6">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
                <span>Meet The Founder</span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="font-display font-bold text-4xl md:text-5xl text-white mb-7 leading-[1.1] tracking-tight"
              >
                The Vision
                <br />
                <span className="text-gradient-blue">Behind Astra Nexora</span>
              </motion.h2>

              <motion.div variants={itemVariants} className="space-y-5 text-white/55 leading-[1.7] mb-8">
                <p>
                  S. Saktheeswaran is a results-driven BBA graduate and the Founder & Managing Director of Astra
                  Nexora. With experience in administration, operations, and digital marketing, he combines
                  business acumen with technical skill to deliver real outcomes.
                </p>
                <p>
                  His expertise spans WordPress and website development, AI tools and automation, SEO, Google Search
                  Console, Google Analytics, video editing, social media marketing, and end-to-end digital marketing
                  services. He is committed to a client-first mindset, continuous learning, and delivering measurable
                  business growth.
                </p>
              </motion.div>

              {/* Expertise highlights */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Code2, label: 'WordPress' },
                  { icon: Bot, label: 'AI & Automation' },
                  { icon: Search, label: 'SEO & GSC' },
                  { icon: BarChart3, label: 'Google Analytics' },
                  { icon: Video, label: 'Video Editing' },
                  { icon: Share2, label: 'Social Media' },
                ].map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={visible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                      className="group flex items-center gap-2.5 glass rounded-xl px-3.5 py-3 border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/12 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_12px_rgba(0,102,255,0.3)] transition-all duration-300">
                        <Icon className="w-3.5 h-3.5 text-electric" />
                      </div>
                      <span className="text-xs text-white/60 font-medium">{skill.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA */}
              <motion.button
                variants={itemVariants}
                onClick={() => setIsModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover My Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <FounderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
