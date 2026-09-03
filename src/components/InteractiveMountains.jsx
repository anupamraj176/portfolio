import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InteractiveMountains = () => {
  const containerRef = useRef(null);
  const flagRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !flagRef.current) return;
      
      const { clientX } = e;
      const { innerWidth } = window;
      
      // Calculate normalized X position (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      
      // Move flag slightly based on mouse position
      gsap.to(flagRef.current, {
        rotation: normalizedX * 15,
        transformOrigin: "bottom center",
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-10"
      style={{ height: '300px' }}
    >
      <svg 
        viewBox="0 0 1200 300" 
        preserveAspectRatio="none" 
        className="w-full h-full opacity-60"
        fill="none" 
        stroke="#ffffff" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Distant Mountains (Soft) */}
        <path 
          d="M0,250 Q100,200 200,230 T400,180 T600,220 T800,150 T1000,210 T1200,250" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="1.5"
        />
        
        {/* Mid Mountains */}
        <path 
          d="M0,280 L80,210 L150,260 L280,120 L350,230 L450,150 L520,240 L650,80 L750,190 L850,140 L950,240 L1080,160 L1200,280" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="2"
        />

        {/* Foreground Mountain details (chalk lines) */}
        <path d="M280,120 L280,280 M350,230 L350,280 M650,80 L620,280 M650,80 L680,280" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

        {/* Interactive Flag at peak */}
        <g ref={flagRef} transform="translate(650, 80)">
          <line x1="0" y1="0" x2="0" y2="-30" stroke="#d97d4d" strokeWidth="2" />
          <path d="M0,-30 L15,-22 L0,-15" fill="#d97d4d" stroke="none" />
          <circle cx="0" cy="-30" r="2" fill="#d97d4d" />
        </g>

        {/* Little birds */}
        <path d="M400,80 Q410,70 420,80 Q430,70 440,80" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M750,60 Q760,50 770,60 Q780,50 790,60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <path d="M800,90 Q805,85 810,90 Q815,85 820,90" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        
        {/* Little trees at bottom left */}
        <g transform="translate(100, 260) scale(0.6)" stroke="rgba(255,255,255,0.6)">
          <line x1="0" y1="0" x2="0" y2="-20" />
          <path d="M-10,-10 L0,-25 L10,-10" fill="none" />
          <path d="M-15,0 L0,-15 L15,0" fill="none" />
        </g>
        <g transform="translate(130, 265) scale(0.5)" stroke="rgba(255,255,255,0.6)">
          <line x1="0" y1="0" x2="0" y2="-20" />
          <path d="M-10,-10 L0,-25 L10,-10" fill="none" />
          <path d="M-15,0 L0,-15 L15,0" fill="none" />
        </g>
        
        {/* Little trees at bottom right */}
        <g transform="translate(1050, 260) scale(0.6)" stroke="rgba(255,255,255,0.6)">
          <line x1="0" y1="0" x2="0" y2="-20" />
          <path d="M-10,-10 L0,-25 L10,-10" fill="none" />
          <path d="M-15,0 L0,-15 L15,0" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default InteractiveMountains;
