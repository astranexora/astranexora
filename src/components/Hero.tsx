import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Hero() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  const { ref: contentRef, visible: isVisible } = useScrollReveal();

  const typedWords = ['Digital Success', 'Brand Identity', 'Growth Stories', 'Online Impact'];

  // Mouse tracking for reactive gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    if (nodesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
        });
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const connectionDistance = 150;

      // Update and draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw node
        ctx.fillStyle = 'rgba(0, 102, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 102, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const currentWord = typedWords[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        }, 80);
      } else {
        // Pause at end of word
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, 40);
      } else {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typedWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, typedWords]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black-950">
      {/* Background Layers */}

      {/* 1. Aurora background */}
      <div className="aurora-bg absolute inset-0" />

      {/* 2. Dot grid */}
      <div className="dot-grid absolute inset-0 opacity-10" />

      {/* 3. Mouse-reactive radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${mouseX}% ${mouseY}%, rgba(0, 102, 255, 0.15), transparent 60%)`,
        }}
      />

      {/* 4. Network canvas animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* 5. Rotating scan line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-scan" />

      {/* Content */}
      <div
        ref={contentRef}
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Label */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/30">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Astra Nexora</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white leading-tight mb-6">
            Transforming Brands Into
            <br />
            <span className="text-gradient-blue inline-block">
              {displayedText}
              <span className="ml-1 inline-block w-1 h-12 md:h-20 bg-blue-500 animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            A premium digital marketing agency helping businesses build powerful digital identities
            through creativity, strategy and measurable growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#services"
              className="btn-outline"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div>
              <div className="font-display font-bold text-2xl text-gradient-blue mb-2">
                150+
              </div>
              <div className="text-xs text-white/40">Projects Delivered</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-gradient-blue mb-2">
                98%
              </div>
              <div className="text-xs text-white/40">Client Satisfaction</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-gradient-blue mb-2">
                5+
              </div>
              <div className="text-xs text-white/40">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
      </div>
    </section>
  );
}
