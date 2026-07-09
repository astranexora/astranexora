import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-300 rounded-full"
      style={{
        left: `${mousePosition.x - 100}px`,
        top: `${mousePosition.y - 100}px`,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.07) 0%, transparent 70%)',
      }}
    />
  );
}
