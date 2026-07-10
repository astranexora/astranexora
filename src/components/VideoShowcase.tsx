import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Youtube, Filter } from 'lucide-react';

interface VideoItem {
  id: string;
  embedUrl: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  size: 'large' | 'medium' | 'small';
  color: string;
}

const videos: VideoItem[] = [
  {
    id: 'qrnefrxULjM',
    embedUrl: 'https://www.youtube.com/embed/qrnefrxULjM',
    title: 'Brand Story Film',
    category: 'Branding',
    description: 'A cinematic brand narrative crafted to communicate vision, values, and identity with emotional resonance.',
    outcome: 'Elevated brand perception',
    size: 'large',
    color: '#0066FF',
  },
  {
    id: '8AMSSpQAUjg',
    embedUrl: 'https://www.youtube.com/embed/8AMSSpQAUjg',
    title: 'Product Launch Campaign',
    category: 'Marketing',
    description: 'Strategic launch video designed to build anticipation and drive conversions across digital channels.',
    outcome: '+180% launch engagement',
    size: 'medium',
    color: '#00CFFF',
  },
  {
    id: 'M9cttP7peO8',
    embedUrl: 'https://www.youtube.com/embed/M9cttP7peO8',
    title: 'Social Media Reel',
    category: 'Social Media',
    description: 'Short-form vertical content optimized for maximum reach and engagement across social platforms.',
    outcome: '+412% social reach',
    size: 'small',
    color: '#0099FF',
  },
  {
    id: 'ilGWN0c3_84',
    embedUrl: 'https://www.youtube.com/embed/ilGWN0c3_84',
    title: 'Corporate Showcase',
    category: 'Business',
    description: 'Professional corporate video highlighting services, capabilities, and company culture with premium production.',
    outcome: 'Strengthened client trust',
    size: 'medium',
    color: '#00BBEE',
  },
  {
    id: 'Jy9CYJqDtV0',
    embedUrl: 'https://www.youtube.com/embed/Jy9CYJqDtV0',
    title: 'Creative Visual Story',
    category: 'Creative',
    description: 'An artistic visual journey blending motion design, storytelling, and cinematic editing techniques.',
    outcome: 'Award-worthy craftsmanship',
    size: 'large',
    color: '#0088FF',
  },
  {
    id: 'ofwdAKGqZ88',
    embedUrl: 'https://www.youtube.com/embed/ofwdAKGqZ88',
    title: 'Promotional Highlight',
    category: 'Marketing',
    description: 'Dynamic promotional content engineered to capture attention and drive measurable action.',
    outcome: '+68% conversion lift',
    size: 'small',
    color: '#00AAFF',
  },
];

const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];

function getThumbUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getFallbackThumb(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function VideoCard({
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
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [thumbError, setThumbError] = useState(false);
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
    const rotX = ((e.clientY - rect.top - cy) / cy) * -4;
    const rotY = ((e.clientX - rect.left - cx) / cx) * 4;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
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
      setParallaxY((window.innerHeight / 2 - center) * 0.03);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const sizeClasses = {
    large: 'md:row-span-2',
    medium: '',
    small: '',
  };

  const heightClasses = {
    large: 'h-72 md:h-full',
    medium: 'h-64',
    small: 'h-56',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 + index * 0.08, ease: [0.23, 1, 0.32, 1] as const }}
      className={sizeClasses[video.size]}
    >
      <button
        ref={cardRef}
        onClick={() => onOpen(video)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative w-full text-left glass rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 card-sheen"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle 150px at ${mousePos.x}% ${mousePos.y}%, ${video.color}20, transparent)`,
          }}
        />

        {/* Thumbnail area */}
        <div className={`relative overflow-hidden ${heightClasses[video.size]}`}>
          {/* Gradient overlay before load */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${video.color}20, ${video.color}08, #0a0a0f)`,
              opacity: thumbLoaded && !thumbError ? 0 : 1,
            }}
          />

          {/* Lazy-loaded thumbnail */}
          {!thumbError ? (
            <img
              src={thumbError ? getFallbackThumb(video.id) : getThumbUrl(video.id)}
              alt={video.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                thumbLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transform: `translateY(${parallaxY}px) scale(1.05)` }}
              onLoad={() => setThumbLoaded(true)}
              onError={() => {
                if (!thumbError) {
                  setThumbError(true);
                  setThumbLoaded(true);
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${video.color}30` }}>
                <Youtube className="w-8 h-8" style={{ color: video.color }} />
              </div>
            </div>
          )}

          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-950/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black-950/40" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${video.color}50, transparent)` }} />
              <div className="relative w-16 h-16 rounded-full glass-strong border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-display font-semibold backdrop-blur-md border"
              style={{
                background: `${video.color}25`,
                borderColor: `${video.color}50`,
                color: video.color,
              }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: video.color }} />
              {video.category}
            </span>
          </div>

          {/* Outcome badge */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="px-3 py-1 rounded-full glass-strong border border-white/15 backdrop-blur-md">
              <span className="text-[10px] font-display font-semibold text-white">{video.outcome}</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="relative p-5">
          <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-electric transition-colors duration-300 leading-snug">
            {video.title}
          </h3>
          <p className="text-white/40 text-xs leading-[1.7] line-clamp-2">
            {video.description}
          </p>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>
    </motion.div>
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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
  }, [video?.id]);

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 z-[201] flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-2 right-0 md:-top-12 md:right-0 z-20 w-10 h-10 rounded-xl glass-strong flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Nav buttons */}
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

            {/* Video container */}
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden glass-strong border border-white/10 shadow-2xl">
              {/* Loading state */}
              <AnimatePresence>
                {!iframeLoaded && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black-950"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 border-t-electric animate-spin" />
                      <span className="text-xs text-white/40 font-display">Loading video...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <iframe
                key={video.id}
                src={`${video.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                onLoad={() => setIframeLoaded(true)}
              />
            </div>

            {/* Info bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-display font-semibold border"
                    style={{
                      background: `${video.color}25`,
                      borderColor: `${video.color}50`,
                      color: video.color,
                    }}
                  >
                    {video.category}
                  </span>
                </div>
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

export default function VideoShowcase() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const activeIndexRef = useRef(0);
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

  const filtered = filter === 'All' ? videos : videos.filter(v => v.category === filter);

  const openVideo = useCallback((video: VideoItem) => {
    const idx = filtered.findIndex(v => v.id === video.id);
    activeIndexRef.current = idx >= 0 ? idx : 0;
    setActiveVideo(video);
  }, [filtered]);

  const handlePrev = useCallback(() => {
    const next = (activeIndexRef.current - 1 + filtered.length) % filtered.length;
    activeIndexRef.current = next;
    setActiveVideo(filtered[next]);
  }, [filtered]);

  const handleNext = useCallback(() => {
    const next = (activeIndexRef.current + 1) % filtered.length;
    activeIndexRef.current = next;
    setActiveVideo(filtered[next]);
  }, [filtered]);

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="section-label justify-center mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-electric" />
            <span>Video Portfolio</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-electric" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl text-white mb-5 tracking-tight">
            Cinematic <span className="text-gradient-blue">Showcase</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of video content crafted to elevate brands, engage audiences, and drive measurable results.
          </p>
        </motion.div>

        {/* Filter controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-2 mr-2 text-white/30">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <AnimatePresence mode="wait">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-5 py-2 rounded-full font-display text-xs font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'text-white'
                    : 'glass text-white/40 border border-white/5 hover:text-white/70 hover:border-white/15'
                }`}
              >
                {filter === cat && (
                  <motion.span
                    layoutId="videoFilterActive"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-electric/20 border border-blue-500/40 shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                visible={visible}
                onOpen={openVideo}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <Play className="w-4 h-4" fill="currentColor" />
            Start Your Video Project
          </a>
        </motion.div>
      </div>

      <VideoLightbox
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
