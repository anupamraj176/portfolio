import React, { useRef, useState } from "react";
import gsap from "gsap";

const CoffeeEasterEgg = () => {
  const [isSpilled, setIsSpilled] = useState(false);
  const cupRef = useRef(null);
  const spillRef = useRef(null);
  const steamRefs = useRef([]);

  const handleClick = () => {
    if (isSpilled) return;
    setIsSpilled(true);

    // Tip the cup over
    gsap.to(cupRef.current, {
      rotation: 90,
      x: 20,
      y: 10,
      duration: 0.5,
      ease: "bounce.out"
    });

    // Spill the coffee
    gsap.fromTo(spillRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
    );

    // Stop steam
    steamRefs.current.forEach(steam => {
      if (steam) gsap.killTweensOf(steam);
    });
    gsap.to(steamRefs.current, { opacity: 0, duration: 0.3 });

    // Reset after a while
    setTimeout(() => {
      gsap.to(cupRef.current, { rotation: 0, x: 0, y: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(spillRef.current, { scale: 0, opacity: 0, duration: 0.5 });
      gsap.to(steamRefs.current, { opacity: 0.5, duration: 1, delay: 0.5 });
      
      // Restart steam animation
      steamRefs.current.forEach((steam, i) => {
        gsap.fromTo(steam, 
          { y: 0, opacity: 0.5 },
          { y: -20, opacity: 0, duration: 2, repeat: -1, delay: i * 0.5, ease: "sine.inOut" }
        );
      });
      
      setTimeout(() => setIsSpilled(false), 1000);
    }, 4000);
  };

  // Initial steam animation
  React.useEffect(() => {
    steamRefs.current.forEach((steam, i) => {
      gsap.to(steam, {
        y: -20,
        opacity: 0,
        duration: 2,
        repeat: -1,
        delay: i * 0.5,
        ease: "sine.inOut"
      });
    });
  }, []);

  return (
    <div 
      className="absolute bottom-10 left-10 md:left-20 cursor-pointer z-20 group"
      onClick={handleClick}
    >
      <div className="relative w-16 h-16">
        
        {/* Steam */}
        {!isSpilled && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none">
            {[0, 1].map(i => (
              <svg 
                key={i}
                ref={el => steamRefs.current[i] = el}
                className="absolute top-0 left-0 w-full h-full text-white/50" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                style={{ marginLeft: i === 0 ? '-4px' : '4px' }}
              >
                <path d="M 12,20 Q 8,10 12,0" />
              </svg>
            ))}
          </div>
        )}

        {/* Coffee Spill */}
        <div 
          ref={spillRef}
          className="absolute -right-10 top-10 w-20 h-8 bg-[#6F4E37] rounded-[50%] opacity-0 origin-left"
          style={{ transform: "scale(0)" }}
        ></div>

        {/* Coffee Cup SVG */}
        <svg 
          ref={cupRef}
          className="w-full h-full text-white/80 group-hover:text-white transition-colors" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Cup body */}
          <path d="M 20,20 L 25,80 Q 27,90 40,90 L 60,90 Q 73,90 75,80 L 80,20 Z" />
          {/* Handle */}
          <path d="M 80,35 C 95,35 100,60 80,60" />
          {/* Coffee line inside */}
          <path d="M 22,30 L 78,30" strokeWidth="2" strokeDasharray="4 4" />
          {/* Smiley */}
          <path d="M 40,50 Q 50,60 60,50" strokeWidth="3" />
        </svg>

      </div>
      
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/40 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        Need coffee?
      </div>
    </div>
  );
};

export default CoffeeEasterEgg;
