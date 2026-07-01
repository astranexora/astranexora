import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Award, Star, MapPin, Calendar, Target, Heart, Lightbulb, X, ArrowRight, Zap, Globe } from 'lucide-react';

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'Embracing new technologies and creative approaches to stay ahead of the curve.' },
  { icon: Star, title: 'Creative Thinking', desc: 'Transforming ideas into compelling digital experiences that captivate audiences.' },
  { icon: Target, title: 'Business Growth', desc: 'Delivering measurable outcomes and real growth for every client.' },
  { icon: Globe, title: 'Digital Strategy', desc: 'Data-driven strategies that ensure every project delivers exceptional results.' },
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] overflow-hidden rounded-3xl glass-strong border border-white/10 shadow-2xl"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10 h-full overflow-y-auto p-8 md:p-12">
              <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue border border-blue-500/20 mb-6">
                    <Star className="w-3.5 h-3.5 text-electric" />
                    <span className="text-xs font-display font-semibold text-electric">MEET THE FOUNDER</span>
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                    Meet <span className="text-gradient-blue">The Founder</span>
                  </h2>
                  <p className="text-white/40 max-w-xl mx-auto">
                    Vision, mission, and values that drive Astra Nexora
                  </p>
                </motion.div>

                {/* Photo and Bio Grid */}
                <div className="grid lg:grid-cols-2 gap-10 mb-16">
                  {/* Photo placeholder */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      {/* Placeholder for founder photo 1 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 glass flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 mx-auto mb-4 flex items-center justify-center border border-white/10">
                            <span className="text-4xl font-display font-bold text-white/60">SS</span>
                          </div>
                          <p className="text-white/40 text-sm">Photo coming soon</p>
                        </div>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-4 left-6 glass-blue rounded-xl px-5 py-3 border border-blue-500/20">
                      <div className="text-lg font-display font-bold text-white">S. Saktheeswaran</div>
                      <div className="text-xs text-white/50">Founder & Managing Director</div>
                    </div>
                  </motion.div>

                  {/* Bio */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-4">Introduction</h3>
                      <p className="text-white/50 leading-relaxed mb-4">
                        S. Saktheeswaran is the Founder & Managing Director of Astra Nexora, specializing in
                        Digital Marketing, SEO Optimization, Website Development, and Brand Identity Creation.
                      </p>
                      <p className="text-white/50 leading-relaxed">
                        His approach combines creative innovation with data-driven strategies, ensuring every project delivers
                        measurable results. He believes in transparent communication, premium quality, and building long-term
                        partnerships with clients.
                      </p>
                    </div>

                    <div className="glass rounded-2xl p-5 border border-white/5">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-4 h-4 text-electric" />
                        <span className="text-sm text-white/60">Based in India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-electric" />
                        <span className="text-sm text-white/60">5+ Years in Digital Marketing</span>
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

                {/* Mission & Vision */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid md:grid-cols-2 gap-6 mb-16"
                >
                  <div className="glass-blue rounded-2xl p-6 border border-blue-500/10">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                      <Target className="w-5 h-5 text-electric" />
                    </div>
                    <h4 className="font-display font-bold text-white text-lg mb-2">Mission</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      To empower businesses of all sizes with premium digital solutions that drive growth,
                      build trust, and create lasting impact in the digital world.
                    </p>
                  </div>

                  <div className="glass-blue rounded-2xl p-6 border border-blue-500/10">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                      <Globe className="w-5 h-5 text-electric" />
                    </div>
                    <h4 className="font-display font-bold text-white text-lg mb-2">Vision</h4>
                    <p className="text-white/50 text-sm leading-relaxed">
                      To become the most trusted digital partner for businesses seeking transformation,
                      known for creativity, innovation, and delivering exceptional results.
                    </p>
                  </div>
                </motion.div>

                {/* Values */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-16"
                >
                  <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">Core Values</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {values.map((value, i) => (
                      <div key={value.title} className="glass rounded-xl p-5 border border-white/5 text-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/15 mx-auto mb-3 flex items-center justify-center">
                          <value.icon className="w-5 h-5 text-electric" />
                        </div>
                        <h4 className="font-display font-semibold text-white text-sm mb-2">{value.title}</h4>
                        <p className="text-white/40 text-xs leading-relaxed">{value.desc}</p>
                      </div>
                    ))}
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
    <>
      <section id="founder" className="relative py-32 overflow-hidden bg-black-900">
        {/* BG effects */}
        <div className="absolute inset-0 aurora-bg opacity-40" />
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)' }} />

        <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Photo */}
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
                <div className="absolute w-[280px] h-[280px] rounded-full border border-purple-500/[0.06]" />
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-12 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.3), rgba(139,92,246,0.1), transparent)' }} />

              {/* Photo frame placeholder */}
              <div className="relative z-10 max-w-sm mx-auto">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    padding: '2px',
                    background: 'linear-gradient(135deg, rgba(0,102,255,0.8), rgba(139,92,246,0.5), rgba(0,207,255,0.6))',
                    boxShadow: '0 0 50px rgba(0,102,255,0.3), 0 0 100px rgba(139,92,246,0.15)',
                  }}
                >
                  <div className="relative rounded-3xl overflow-hidden bg-black-950 aspect-[3/4]">
                    {/* Placeholder - ready for photo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/20 mx-auto mb-4 flex items-center justify-center border border-white/20">
                          <span className="text-5xl font-display font-bold text-white/50">SS</span>
                        </div>
                        <p className="text-white/30 text-sm font-display">Founder Photo</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 glass-blue rounded-xl px-4 py-2.5 border border-blue-500/25 shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Award className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">5+ Years</div>
                      <div className="text-[10px] text-white/40">Experience</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 glass-blue rounded-xl px-4 py-2.5 border border-blue-500/25 shadow-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-electric" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">150+</div>
                      <div className="text-[10px] text-white/40">Projects</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT: Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
                  Digital Marketing, SEO Optimization, Website Development, and Brand Identity Creation.
                </p>
                <p>
                  His approach combines creative innovation with data-driven strategies, ensuring every
                  project delivers measurable growth. With a focus on premium quality and transparent
                  communication, he has built lasting partnerships with clients across industries.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '150+', label: 'Projects' },
                  { value: '98%', label: 'Satisfaction' },
                  { value: '5+', label: 'Years' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center border border-white/5">
                    <div className="font-display font-bold text-xl text-gradient-blue">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover My Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Modal */}
      <FounderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
