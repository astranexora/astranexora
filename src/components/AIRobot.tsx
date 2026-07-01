import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const SPLINE_URL = 'https://my.spline.design/robotichandandlandingpage-naVhjpfMAaJmUeQJzLxuU7KD/';

const speechBubbles = [
  { emoji: '👋', text: "Welcome to Astra Nexora!" },
  { emoji: '🚀', text: "Explore our Services!" },
  { emoji: '👀', text: "Check out our Portfolio!" },
  { emoji: '✨', text: "Meet the Founder!" },
  { emoji: '💙', text: "Ready to build?" },
];

const sectionMessages: Record<string, { emoji: string; text: string }> = {
  hero:      { emoji: '👋', text: "Welcome!" },
  about:     { emoji: '😊', text: "Learn about us." },
  services:  { emoji: '🚀', text: "Premium services." },
  portfolio: { emoji: '👀', text: "Check our work!" },
  founder:   { emoji: '😊', text: "Meet our founder." },
  contact:   { emoji: '💙', text: "Let's build together!" },
};

const quickActions = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Founder', href: '#founder' },
  { label: 'Contact', href: '#contact' },
  { label: 'Start Project', href: '#contact', special: true },
];

function SpeechBubble({ emoji, text, onClose }: { emoji: string; text: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.9 }}
      className="absolute bottom-full mb-3 right-0 min-w-[190px] max-w-[220px]"
      style={{
        background: 'rgba(6,6,9,0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(0,102,255,0.25)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,102,255,0.2)',
        padding: '12px 14px',
      }}
    >
      <button onClick={onClose}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
        <X className="w-3 h-3" />
      </button>
      <div className="flex items-start gap-2">
        <span className="text-base leading-tight">{emoji}</span>
        <p className="text-xs text-white/80 leading-relaxed">{text}</p>
      </div>
      {/* Tail */}
      <div className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45"
        style={{ background: 'rgba(6,6,9,0.92)', borderRight: '1px solid rgba(0,102,255,0.25)', borderBottom: '1px solid rgba(0,102,255,0.25)' }} />
    </motion.div>
  );
}

function AssistantPanel({ onClose, onStartProject }: { onClose: () => void; onStartProject: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      className="absolute bottom-full mb-4 right-0 w-64"
      style={{
        background: 'rgba(6,6,9,0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,102,255,0.2)', border: '1px solid rgba(0,102,255,0.3)' }}>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-display font-semibold text-white">AI Assistant</div>
            <div className="text-[10px] text-white/40">How can I help?</div>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actions */}
      <div className="p-3 space-y-1">
        {quickActions.map((action) => (
          <a key={action.label} href={action.href}
            onClick={e => {
              if (action.special) { e.preventDefault(); onClose(); onStartProject(); }
              else onClose();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
            style={action.special ? {
              background: 'rgba(0,102,255,0.15)',
              border: '1px solid rgba(0,102,255,0.3)',
              color: '#60a5fa',
            } : { color: 'rgba(255,255,255,0.65)' }}
            onMouseEnter={e => { if (!action.special) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { if (!action.special) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <span className="text-sm font-display font-medium">{action.label}</span>
            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function AIRobot({ onStartProject }: { onStartProject: () => void }) {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('astra-robot-dismissed') === 'true');
  const [currentSection, setCurrentSection] = useState('hero');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const lastSection = useRef('');

  // Responsive check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Welcome bubble after delay
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => { setShowBubble(true); }, 3000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Auto-hide bubble
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 4500);
    return () => clearTimeout(t);
  }, [showBubble]);

  // Section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'portfolio', 'founder', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 350) {
          setCurrentSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show contextual bubble on section change
  useEffect(() => {
    if (dismissed || currentSection === lastSection.current || currentSection === 'hero') return;
    lastSection.current = currentSection;
    const msg = sectionMessages[currentSection];
    if (!msg) return;
    const idx = speechBubbles.findIndex(b => b.emoji === msg.emoji);
    if (idx >= 0) setBubbleIdx(idx);
    setShowBubble(false);
    const t = setTimeout(() => setShowBubble(true), 300);
    return () => clearTimeout(t);
  }, [currentSection, dismissed]);

  const handleDismiss = () => {
    setShowBubble(false);
    setDismissed(true);
    localStorage.setItem('astra-robot-dismissed', 'true');
  };

  // Don't render on very small screens to save resources
  if (isMobile) return null;

  return (
    <div className="fixed z-[80]" style={{ right: '28px', bottom: '100px' }}>
      <div className="relative">
        {/* Assistant Panel */}
        <AnimatePresence>
          {showPanel && (
            <AssistantPanel
              onClose={() => setShowPanel(false)}
              onStartProject={() => { setShowPanel(false); onStartProject(); }}
            />
          )}
        </AnimatePresence>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && !showPanel && !dismissed && (
            <SpeechBubble
              emoji={speechBubbles[bubbleIdx]?.emoji || '👋'}
              text={speechBubbles[bubbleIdx]?.text || 'Welcome!'}
              onClose={handleDismiss}
            />
          )}
        </AnimatePresence>

        {/* Robot Button */}
        <motion.button
          onClick={() => { setShowBubble(false); setShowPanel(p => !p); }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative cursor-pointer block"
          style={{ width: '80px', height: '80px' }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-2xl" style={{
            background: 'rgba(0,102,255,0.25)',
            filter: 'blur(12px)',
            transform: 'scale(1.1)',
            animation: 'pulse 2.5s ease-in-out infinite',
          }} />

          {/* Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{
            background: 'rgba(6,6,9,0.9)',
            border: '1px solid rgba(0,102,255,0.35)',
            boxShadow: '0 8px 32px rgba(0,102,255,0.3), 0 2px 8px rgba(0,0,0,0.5)',
          }}>
            {/* Spline iframe */}
            <iframe
              src={SPLINE_URL}
              title="Astra Nexora AI Guide"
              frameBorder="0"
              style={{
                width: '200%',
                height: '200%',
                marginLeft: '-50%',
                marginTop: '-50%',
                border: 'none',
                pointerEvents: 'none',
                opacity: splineLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
              onLoad={() => setSplineLoaded(true)}
              loading="lazy"
              allowFullScreen
            />

            {/* Fallback / loading state */}
            {!splineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-7 h-7 text-blue-400 mx-auto mb-1 animate-pulse" />
                  <div className="text-[9px] text-white/50 font-display">AI</div>
                </div>
              </div>
            )}
          </div>

          {/* Pulse indicator */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ background: '#22c55e', borderColor: 'rgba(6,6,9,0.9)' }}
          />
        </motion.button>
      </div>
    </div>
  );
}
