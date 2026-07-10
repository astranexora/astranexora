import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface VideoItem {
  id: string;
  embedUrl: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  color: string;
}

const videos: VideoItem[] = [
  {
    id: 'qrnefrxULjM',
    embedUrl: 'https://www.youtube.com/embed/qrnefrxULjM',
    title: 'Brand Story Film',
    category: 'Branding',
    description: 'A cinematic brand narrative crafted to communicate vision, values, and identity with emotional resonance and cinematic pacing.',
    outcome: 'Elevated brand perception',
    color: '#0066FF',
  },
  {
    id: '8AMSSpQAUjg',
    embedUrl: 'https://www.youtube.com/embed/8AMSSpQAUjg',
    title: 'Product Launch Campaign',
    category: 'Marketing',
    description: 'Strategic launch video designed to build anticipation and drive conversions across every digital channel.',
    outcome: '+180% launch engagement',
    color: '#00CFFF',
  },
  {
    id: 'M9cttP7peO8',
    embedUrl: 'https://www.youtube.com/embed/M9cttP7peO8',
    title: 'Social Media Reel',
    category: 'Social Media',
    description: 'Short-form vertical content optimized for maximum reach and engagement across social platforms.',
    outcome: '+412% social reach',
    color: '#0099FF',
  },
  {
    id: 'ilGWN0c3_84',
    embedUrl: 'https://www.youtube.com/embed/ilGWN0c3_84',
    title: 'Corporate Showcase',
    category: 'Business',
    description: 'Professional corporate video highlighting services, capabilities, and company culture with premium production.',
    outcome: 'Strengthened client trust',
    color: '#00BBEE',
  },
  {
    id: 'Jy9CYJqDtV0',
    embedUrl: 'https://www.youtube.com/embed/Jy9CYJqDtV0',
    title: 'Creative Visual Story',
    category: 'Creative',
    description: 'An artistic visual journey blending motion design, storytelling, and cinematic editing techniques.',
    outcome: 'Award-worthy craftsmanship',
    color: '#0088FF',
  },
  {
    id: 'ofwdAKGqZ88',
    embedUrl: 'https://www.youtube.com/embed/ofwdAKGqZ88',
    title: 'Promotional Highlight',
    category: 'Marketing',
    description: 'Dynamic promotional content engineered to capture attention and drive measurable action.',
    outcome: '+68% conversion lift',
    color: '#00AAFF',
  },
];

function ResponsiveIframe({ video, autoplay = false }: { video: VideoItem; autoplay?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const src = autoplay
    ? `${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`
    : `${video.embedUrl}?rel=0&modestbranding=1`;

  return (
    <div className="absolute inset-0">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black-950">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/30 border-t-electric animate-spin" />
            <span className="text-[10px] text-white/30 font-display tracking-wider">Loading...</span>
          </div>
        </div>
      )}
      <iframe
        src={src}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function VideoLightbox({
  video,
  onClose,
  onPrev,
  onNext,
}: {
  video: VideoItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {video && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-20 z-[201] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute -top-2 right-0 md:-top-12 md:right-0 z-20 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={onPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 z-20 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 z-20 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="relative w-full flex-1 rounded-2xl overflow-hidden glass-strong border border-white/10 shadow-2xl">
              <ResponsiveIframe video={video} autoplay />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-display font-semibold border mb-2"
                  style={{ background: `${video.color}25`, borderColor: `${video.color}50`, color: video.color }}
                >
                  {video.category}
                </span>
                <h3 className="font-display font-bold text-white text-lg">{video.title}</h3>
                <p className="text-white/40 text-sm mt-1 max-w-xl">{video.description}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-blue border border-blue-500/20 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                <span className="text-xs font-display font-semibold text-electric">{video.outcome}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Featured video card (large, top) ── */
function FeaturedCard({
  video,
  visible,
}: {
  video: VideoItem;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const handleScroll = () => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setParallaxY((window.innerHeight / 2 - center) * 0.025);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as const }}
      className="mb-8"
    >
      <div
        ref={cardRef}
        className="group relative rounded-3xl overflow-hidden glass-strong border border-blue-500/15 shadow-[0_0_80px_rgba(0,102,255,0.12)] card-sheen"
      >
        {/* Video area */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          {activated ? (
            <ResponsiveIframe video={video} autoplay />
          ) : (
            <button
              onClick={() => setActivated(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center text-left"
              aria-label={`Play ${video.title}`}
            >
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                style={{ transform: `translateY(${parallaxY}px) scale(1.02)` }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black-950/60 via-transparent to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${video.color}40, transparent)` }} />
                  <div className="relative w-20 h-20 rounded-full glass-strong border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-400 shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Featured badge */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/30 to-electric/20 border border-blue-400/30 backdrop-blur-md">
                  <span className="text-xs font-display font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-electric" />
                    Featured Work
                  </span>
                </div>
              </div>

              {/* Fullscreen hint */}
              <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-9 h-9 rounded-xl glass-strong border border-white/15 flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white/60" />
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-semibold border mb-3 backdrop-blur-md"
                  style={{ background: `${video.color}25`, borderColor: `${video.color}50`, color: video.color }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: video.color }} />
                  {video.category}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-3 leading-tight tracking-tight">
                  {video.title}
                </h3>
                <p className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed">
                  {video.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-blue border border-blue-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                  <span className="text-xs font-display font-semibold text-electric">{video.outcome}</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Bento card ── */
function BentoCard({
  video,
  index,
  visible,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  visible: boolean;
  onOpen: (v: VideoItem) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [activated, setActivated] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [parallaxY, setParallaxY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((e.clientY - rect.top - cy) / cy) * -3;
    const rotY = ((e.clientX - rect.left - cx) / cx) * 3;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  useEffect(() => {
    if (!visible) return;
    const handleScroll = () => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setParallaxY((window.innerHeight / 2 - center) * 0.02);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.23, 1, 0.32, 1] as const }}
    >
      <button
        ref={cardRef}
        onClick={() => {
          if (activated) {
            onOpen(video);
          } else {
            setActivated(true);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full text-left glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 card-sheen"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{ background: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, ${video.color}20, transparent)` }}
        />

        {/* Video / thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {activated ? (
            <ResponsiveIframe video={video} autoplay />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                style={{ transform: `translateY(${parallaxY}px) scale(1.04)` }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${video.color}50, transparent)` }} />
                  <div className="relative w-14 h-14 rounded-full glass-strong border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-semibold backdrop-blur-md border"
                  style={{ background: `${video.color}25`, borderColor: `${video.color}50`, color: video.color }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: video.color }} />
                  {video.category}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative p-5">
          <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-electric transition-colors duration-300 leading-snug">
            {video.title}
          </h3>
          <p className="text-white/40 text-xs leading-[1.7] line-clamp-2 mb-3">
            {video.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: video.color }} />
            <span className="text-[10px] font-display font-semibold" style={{ color: video.color }}>
              {video.outcome}
            </span>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>
    </motion.div>
  );
}

export default function VideoShowcase() {
  const [visible, setVisible] = useState(false);
  const [lightboxVideo, setLightboxVideo] = useState<VideoItem | null>(null);
  const activeIndexRef = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  const featured = videos[0];
  const rest = videos.slice(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((video: VideoItem) => {
    const idx = videos.findIndex(v => v.id === video.id);
    activeIndexRef.current = idx >= 0 ? idx : 0;
    setLightboxVideo(video);
  }, []);

  const handlePrev = useCallback(() => {
    const next = (activeIndexRef.current - 1 + videos.length) % videos.length;
    activeIndexRef.current = next;
    setLightboxVideo(videos[next]);
  }, []);

  const handleNext = useCallback(() => {
    const next = (activeIndexRef.current + 1) % videos.length;
    activeIndexRef.current = next;
    setLightboxVideo(videos[next]);
  }, []);

  return (
    <section id="videos" className="relative py-28 md:py-36 overflow-hidden bg-black-950">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-[0.05]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.08), transparent)' }} />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,207,255,0.06), transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="section-label mb-5">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
                <span>Creative Works</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-white tracking-tight leading-[1.05]">
                Video That
                <br />
                <span className="text-gradient-blue">Moves Brands Forward</span>
              </h2>
            </div>
            <p className="text-white/45 text-base md:text-lg max-w-md leading-relaxed md:text-right">
              A curated portfolio of cinematic video content — crafted to engage audiences, elevate perception, and drive measurable business outcomes.
            </p>
          </div>
        </motion.div>

        {/* Featured video */}
        <FeaturedCard video={featured} visible={visible} />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((video, i) => (
            <BentoCard
              key={video.id}
              video={video}
              index={i}
              visible={visible}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <Play className="w-4 h-4" fill="currentColor" />
            Start Your Video Project
          </a>
        </motion.div>
      </div>

      <VideoLightbox
        video={lightboxVideo}
        onClose={() => setLightboxVideo(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
