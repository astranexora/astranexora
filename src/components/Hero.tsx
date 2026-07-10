import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles, TrendingUp, Users, BarChart3, Globe, Zap, Star } from 'lucide-react';

interface Node {
  x: number; y: number; vx: number; vy: number;
}

const metrics = [
  { label: 'Website Traffic', value: '+284%', color: '#0066FF', icon: Globe },
  { label: 'Conversion Rate', value: '+68%', color: '#0052CC', icon: TrendingUp },
  { label: 'Brand Reach', value: '+412%', color: '#00CFFF', icon: Users },
];

const floatingCards = [
  { title: 'SEO Ranking', value: '#1', sub: 'Keywords on Page 1', icon: Star, delay: '0s' },
  { title: 'ROI Delivered', value: '4.2x', sub: 'Average return', icon: BarChart3, delay: '2s' },
  { title: 'Projects Done', value: '150+', sub: 'Across industries', icon: Zap, delay: '4s' },
];

export default function Hero() {
  const [mouseX, setMouseX] = useState(50);
  const [mouseY, setMouseY] = useState(50);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [barProgress, setBarProgress] = useState([0, 0, 0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>();

  const typedWords = ['Digital Success', 'Brand Identity', 'Growth Stories', 'Online Impact'];

  useEffect(() => {
    const t = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setBarProgress([78, 92, 65]), 800);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth) * 100);
      setMouseY((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (nodesRef.current.length === 0) {
      for (let i = 0; i < 40; i++) {
        nodesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const dist = 160;

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= canvas.width) n.vx *= -1;
        if (n.y <= 0 || n.y >= canvas.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(canvas.width, n.x));
        n.y = Math.max(0, Math.min(canvas.height, n.y));

        ctx.fillStyle = 'rgba(0,102,255,0.35)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            const opacity = (1 - d / dist) * 0.15;
            ctx.strokeStyle = `rgba(0,102,255,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const word = typedWords[currentWordIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayedText.length < word.length) {
        t = setTimeout(() => setDisplayedText(word.slice(0, displayedText.length + 1)), 80);
      } else {
        t = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayedText.length > 0) {
        t = setTimeout(() => setDisplayedText(displayedText.slice(0, -1)), 40);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex(p => (p + 1) % typedWords.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white flex items-center">
      {/* Network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 pointer-events-none" />

      {/* Aurora BG */}
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 dot-grid opacity-[0.4]" />

      {/* Mouse reactive glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${mouseX}% ${mouseY}%, rgba(0,102,255,0.06), transparent 70%)`,
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.05), transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(0,207,255,0.04), transparent)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT: Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue border border-brand-500/15 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
              <span className="text-xs font-display font-semibold text-brand-500 tracking-wider">ASTRA NEXORA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40" />
              <span className="text-xs text-ink-500">Premium Digital Agency</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-ink-900 leading-[1.08] mb-7 tracking-tight">
              Transforming
              <br />
              <span className="text-gradient-blue">Brands Into</span>
              <br />
              <span className="relative inline-block min-h-[1.1em]">
                <span className="shimmer-text">{displayedText}</span>
                <span className="inline-block w-0.5 h-[0.9em] bg-brand-500 ml-1 animate-pulse align-middle" />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-ink-500 text-lg max-w-xl leading-relaxed mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              A premium digital marketing agency helping businesses build powerful digital
              identities through creativity, strategy and measurable growth.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="btn-outline inline-flex items-center gap-2">
                Explore Services
              </a>
            </div>

            {/* Stats row */}
            <div
              className={`flex flex-wrap gap-x-10 gap-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {[
                { value: '150+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={stat.label} className="relative">
                  {i > 0 && <div className="absolute -left-5 top-1 bottom-1 w-px bg-ink-200" />}
                  <div className="font-display font-bold text-3xl text-gradient-blue">{stat.value}</div>
                  <div className="text-xs text-ink-400 mt-0.5 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dashboard Card */}
          <div
            className={`relative transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}
          >
            {/* Central glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.12), rgba(0,207,255,0.04), transparent)' }} />
            </div>

            {/* Main dashboard card */}
            <div className="relative glass-strong rounded-3xl p-6 border border-brand-500/10 shadow-[0_0_60px_rgba(0,102,255,0.08)]">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-ink-400 uppercase tracking-widest mb-0.5">Campaign Overview</div>
                  <div className="font-display font-bold text-ink-900">Q4 Performance</div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-blue">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-ink-600 font-display">Live</span>
                </div>
              </div>

              {/* Metric bars */}
              <div className="space-y-4 mb-6">
                {metrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                          <span className="text-xs text-ink-500">{m.label}</span>
                        </div>
                        <span className="text-xs font-display font-bold" style={{ color: m.color }}>{m.value}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-[1500ms] ease-out"
                          style={{
                            width: `${barProgress[i]}%`,
                            background: `linear-gradient(90deg, ${m.color}, ${m.color}99)`,
                            boxShadow: `0 0 8px ${m.color}40`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mini chart */}
              <div className="glass rounded-2xl p-4 mb-4">
                <div className="flex items-end justify-between gap-1.5 h-20">
                  {[35, 52, 41, 68, 55, 72, 58, 84, 71, 92, 78, 96].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-[1200ms] ease-out"
                      style={{
                        height: isVisible ? `${h}%` : '0%',
                        transitionDelay: `${600 + i * 60}ms`,
                        background: i >= 9
                          ? 'linear-gradient(to top, #0066FF, #00CFFF)'
                          : 'rgba(0,102,255,0.2)',
                        boxShadow: i >= 9 ? '0 0 8px rgba(0,102,255,0.3)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-ink-300">Jan</span>
                  <span className="text-[10px] text-ink-300">Dec</span>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Leads', value: '1,284', change: '+32%' },
                  { label: 'Revenue', value: '₹4.2L', change: '+68%' },
                  { label: 'ROAS', value: '4.2x', change: '+19%' },
                ].map(item => (
                  <div key={item.label} className="glass-blue rounded-xl p-3 text-center">
                    <div className="font-display font-bold text-sm text-ink-900 mb-0.5">{item.value}</div>
                    <div className="text-[10px] text-ink-400 mb-1">{item.label}</div>
                    <div className="text-[10px] text-green-600 font-display font-semibold">{item.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              const positions = [
                '-top-4 -left-6',
                '-bottom-4 -right-6',
                'top-1/2 -right-12 -translate-y-1/2',
              ];
              return (
                <div
                  key={card.title}
                  className={`absolute ${positions[i]} glass-strong rounded-xl px-4 py-3 border border-brand-500/15 shadow-[0_4px_20px_rgba(0,102,255,0.08)] animate-float`}
                  style={{ animationDelay: card.delay }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-brand-500" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-ink-900">{card.value}</div>
                      <div className="text-[10px] text-ink-400">{card.sub}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Rotating outer ring */}
            <div className="absolute -inset-8 rounded-full border border-brand-500/8 animate-spin-slow pointer-events-none" />
            <div className="absolute -inset-16 rounded-full border border-brand-500/5 animate-spin-reverse pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-ink-300 uppercase tracking-widest font-display">Scroll</span>
        <ChevronDown className="w-5 h-5 text-ink-300 animate-bounce" />
      </div>
    </section>
  );
}
