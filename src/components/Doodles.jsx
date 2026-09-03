import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Simple hand-drawn SVGs
const Star = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
  </svg>
);

const Squiggle = ({ className }) => (
  <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
    <path d="M10 25 Q 20 5, 30 25 T 50 25 T 70 25 T 90 25" />
  </svg>
);

const Arrow = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 80 Q 40 20, 80 20 M60 10 L80 20 L70 40" />
  </svg>
);

const Doodle = ({ children, x, y, size = 'w-10 h-10', color = 'text-white/30', delay = 0, floatAmount = 10, duration = 3 }) => {
  const doodleRef = useRef(null);

  useEffect(() => {
    // Floating animation
    gsap.to(doodleRef.current, {
      y: `+=${floatAmount}`,
      rotation: `+=${floatAmount}`,
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay
    });
  }, [floatAmount, duration, delay]);

  const handleHover = () => {
    gsap.to(doodleRef.current, {
      scale: 1.3,
      rotation: "+=45",
      duration: 0.4,
      ease: "back.out(2)"
    });
  };

  const handleLeave = () => {
    gsap.to(doodleRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={doodleRef}
      className={`absolute pointer-events-auto cursor-crosshair transition-colors hover:text-white ${size} ${color}`}
      style={{ left: x, top: y }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

export const Doodles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Home Section Doodles */}
      <Doodle x="10%" y="15%" size="w-12 h-12" color="text-[#d97d4d]/40" delay={0}>
        <Star />
      </Doodle>
      <Doodle x="85%" y="20%" size="w-16 h-16" delay={1} floatAmount={15} duration={4}>
        <Star />
      </Doodle>
      <Doodle x="20%" y="85%" size="w-24 h-12" color="text-[#f1c40f]/30" delay={0.5}>
        <Squiggle />
      </Doodle>
      <Doodle x="80%" y="70%" size="w-16 h-16" delay={2}>
        <Arrow />
      </Doodle>

      {/* Projects Section Doodles (estimated offsets based on height) */}
      <Doodle x="5%" y="120vh" size="w-20 h-20" color="text-white/20" delay={0}>
        <Star />
      </Doodle>
      <Doodle x="90%" y="150vh" size="w-16 h-16" color="text-[#d97d4d]/30" delay={1.5} floatAmount={20}>
        <Star />
      </Doodle>
      
      {/* Contact Section Doodles */}
      <Doodle x="15%" y="220vh" size="w-24 h-12" delay={0.2}>
        <Squiggle />
      </Doodle>
      <Doodle x="85%" y="230vh" size="w-16 h-16" color="text-[#f1c40f]/40" delay={1.2}>
        <Star />
      </Doodle>
      <Doodle x="10%" y="270vh" size="w-16 h-16" delay={0.8}>
        <Arrow />
      </Doodle>
    </div>
  );
};

export default Doodles;
