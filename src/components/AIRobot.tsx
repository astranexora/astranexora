import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const speechBubbles = [
  { emoji: '👋', text: "Welcome to Astra Nexora!" },
  { emoji: '😊', text: "Need help navigating?" },
  { emoji: '🚀', text: "Explore our Portfolio!" },
  { emoji: '✨', text: "Check our Services!" },
  { emoji: '💙', text: "Ready to build your next project?" },
];

const sectionMessages: Record<string, { emoji: string; text: string }> = {
  hero: { emoji: '👋', text: "Welcome!" },
  services: { emoji: '🚀', text: "Premium services for growth." },
  portfolio: { emoji: '👀', text: "Check out our work!" },
  founder: { emoji: '😊', text: "Meet our founder." },
  contact: { emoji: '💙', text: "Let's build together!" },
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
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      className="absolute bottom-full mb-3 right-0 glass-blue rounded-2xl px-4 py-3 border border-blue-500/20 shadow-lg min-w-[200px] max-w-[240px]"
    >
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
      <div className="flex items-start gap-2">
        <span className="text-lg">{emoji}</span>
        <p className="text-sm text-white/80 leading-relaxed">{text}</p>
      </div>
      <div className="absolute bottom-0 right-8 w-3 h-3 glass-blue border-r border-b border-blue-500/20 transform translate-y-1/2 rotate-45" />
    </motion.div>
  );
}

function AssistantPanel({ onClose, onStartProject }: { onClose: () => void; onStartProject: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute bottom-full mb-4 right-0 w-72 glass-strong rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-electric" />
          </div>
          <div>
            <div className="text-sm font-display font-semibold text-white">AI Assistant</div>
            <div className="text-xs text-white/40">How can I help?</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-2">
        <div className="text-xs text-white/40 uppercase tracking-widest mb-3 font-display">Quick Actions</div>
        {quickActions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            onClick={(e) => {
              if (action.special) {
                e.preventDefault();
                onClose();
                onStartProject();
              } else {
                onClose();
              }
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
              action.special
                ? 'bg-blue-500/20 text-electric border border-blue-500/30 hover:bg-blue-500/30'
                : 'hover:bg-white/5 text-white/70 hover:text-white'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              action.special ? 'bg-electric/20' : 'bg-white/5'
            }`}>
              <span className="text-xs">{action.special ? '✨' : '→'}</span>
            </div>
            <span className="text-sm font-display font-medium">{action.label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function AIRobot({ onStartProject }: { onStartProject: () => void }) {
  const [showBubble, setShowBubble] = useState(false);
  const [currentBubble, setCurrentBubble] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  // Load dismissed status from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('astra-robot-dismissed');
    if (stored === 'true') {
      setDismissed(true);
    }
  }, []);

  // Initialize with welcome bubble
  useEffect(() => {
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  // Auto-cycle bubbles
  useEffect(() => {
    if (!showBubble || dismissed) return;
    const timer = setTimeout(() => {
      setShowBubble(false);
      setTimeout(() => {
        setCurrentBubble((prev) => (prev + 1) % speechBubbles.length);
        setShowBubble(true);
      }, 500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [showBubble, currentBubble, dismissed]);

  // Track scroll for section detection and direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);

      // Detect current section
      const sections = ['hero', 'about', 'services', 'portfolio', 'founder', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && currentScrollY >= el.offsetTop - 300) {
          setCurrentSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show section-specific bubbles
  useEffect(() => {
    if (dismissed) return;
    const message = sectionMessages[currentSection];
    if (message && currentSection !== 'hero') {
      setCurrentBubble(speechBubbles.findIndex(b => b.emoji === message.emoji));
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSection, dismissed]);

  const handleCloseBubble = () => {
    setShowBubble(false);
    setDismissed(true);
    localStorage.setItem('astra-robot-dismissed', 'true');
  };

  const handleRobotClick = () => {
    setShowBubble(false);
    setShowPanel(!showPanel);
  };

  // Calculate robot position based on scroll
  const robotY = Math.max(120, Math.min(scrollY * 0.3, 200));
  const leanAngle = scrollDirection === 'down' ? 3 : -2;

  return (
    <div
      className="fixed z-[85] pointer-events-none"
      style={{
        right: '24px',
        top: `${120 + robotY}px`,
        transition: 'top 0.1s ease-out',
      }}
    >
      <div className="relative pointer-events-auto">
        {/* Assistant Panel */}
        <AnimatePresence>
          {showPanel && (
            <AssistantPanel
              onClose={() => setShowPanel(false)}
              onStartProject={() => {
                setShowPanel(false);
                onStartProject();
              }}
            />
          )}
        </AnimatePresence>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && !showPanel && !dismissed && (
            <SpeechBubble
              emoji={speechBubbles[currentBubble]?.emoji || '👋'}
              text={speechBubbles[currentBubble]?.text || "Welcome!"}
              onClose={handleCloseBubble}
            />
          )}
        </AnimatePresence>

        {/* Robot Container */}
        <motion.button
          onClick={handleRobotClick}
          className="relative cursor-pointer"
          animate={{
            y: [0, -5, 0],
            rotateZ: leanAngle,
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            },
            rotateZ: {
              duration: 0.3,
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-500/30 blur-xl animate-pulse" />

          {/* Robot iframe wrapper */}
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden glass-blue border border-blue-500/25 shadow-lg shadow-blue-500/20">
            <iframe
              src="https://my.spline.design/robotichandandlandingpage-naVhjpfMAaJmUeQJzLxuU7KD/"
              title="AI Robot Assistant"
              className="w-full h-full pointer-events-none"
              style={{
                border: 'none',
                transform: 'scale(1.2)',
                transformOrigin: 'center',
              }}
              loading="lazy"
            />
          </div>

          {/* Breathing indicator */}
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-electric"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}
