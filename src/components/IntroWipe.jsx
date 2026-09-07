import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IntroWipe = () => {
  const [isVisible, setIsVisible] = useState(true);
  const wipeRef = useRef(null);
  const eraserRef = useRef(null);
  const chalkLinesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
      }
    });

    // 1. Draw some initial chaotic chalk lines on the "board"
    chalkLinesRef.current.forEach((line, i) => {
      gsap.fromTo(line, 
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", delay: Math.random() * 0.5 }
      );
    });

    // 2. Bring in the eraser and wipe everything away
    tl.to({}, { duration: 2 }) // wait for lines to draw
      .fromTo(eraserRef.current, 
        { x: "-100vw", y: "20vh", rotation: -20 },
        { x: "120vw", y: "-20vh", rotation: 10, duration: 1.5, ease: "power1.inOut" }
      )
      // Hide the overlay right as the eraser passes over
      .to(wipeRef.current, { opacity: 0, duration: 0.5 }, "-=0.8");
      
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={wipeRef}
      className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex items-center justify-center overflow-hidden"
    >
      {/* Chalk lines that get drawn and wiped */}
      <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        {[...Array(10)].map((_, i) => (
          <path 
            key={i}
            ref={el => chalkLinesRef.current[i] = el}
            d={`M -100 ${Math.random() * 1000} Q ${Math.random() * 1000} ${Math.random() * 1000} 2000 ${Math.random() * 1000}`}
            fill="none"
            stroke="white"
            strokeWidth={Math.random() * 10 + 2}
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        ))}
      </svg>

      {/* The Eraser */}
      <div 
        ref={eraserRef}
        className="absolute w-64 h-32 bg-[#4a3b32] rounded-md shadow-2xl flex items-center justify-center border-t-8 border-[#3a2b22]"
        style={{ left: 0, transform: "translateX(-100%)" }}
      >
        {/* Felt pad of the eraser */}
        <div className="absolute inset-x-2 bottom-0 h-20 bg-[#d4d4d4] rounded-sm flex flex-col gap-1 overflow-hidden opacity-90">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-4 bg-[#c4c4c4] rounded-full mix-blend-multiply opacity-50" />
          ))}
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-mono text-xl animate-pulse">
        Dusting off the chalkboard...
      </div>
    </div>
  );
};

export default IntroWipe;
