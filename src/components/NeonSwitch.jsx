import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const NeonSwitch = () => {
  const [isNeon, setIsNeon] = useState(false);
  const switchRef = useRef(null);
  const stringRef = useRef(null);

  const toggleNeon = () => {
    const nextState = !isNeon;
    setIsNeon(nextState);

    // Pull string animation
    gsap.timeline()
      .to(stringRef.current, { y: 20, duration: 0.1, ease: "power2.out" })
      .to(stringRef.current, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });

    if (nextState) {
      document.body.classList.add('neon-mode');
      
      // Flash effect on whole body
      gsap.fromTo(document.body, 
        { backgroundColor: "#fff" }, 
        { backgroundColor: "#1a1a1a", duration: 0.3 }
      );
    } else {
      document.body.classList.remove('neon-mode');
      gsap.fromTo(document.body, 
        { backgroundColor: "#fff" }, 
        { backgroundColor: "#1a1a1a", duration: 0.3 }
      );
    }
  };

  useEffect(() => {
    // Subtle swinging of the light string
    gsap.to(switchRef.current, {
      rotation: 5,
      transformOrigin: "top center",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div 
      ref={switchRef}
      className="fixed top-0 right-10 md:right-20 z-50 cursor-pointer flex flex-col items-center group"
      onClick={toggleNeon}
    >
      {/* The String */}
      <div className="w-1 h-16 md:h-24 bg-white/40 group-hover:bg-white/70 transition-colors" />
      
      {/* The Handle / Bulb */}
      <div 
        ref={stringRef}
        className="w-4 h-8 bg-[#e74c3c] rounded-full border-2 border-white/40 flex items-center justify-center -mt-1 group-hover:shadow-[0_0_15px_#e74c3c] transition-shadow"
      >
        <div className="w-1 h-2 bg-white/50 rounded-full" />
      </div>
      
      <div className="absolute top-full mt-2 right-0 whitespace-nowrap text-white/30 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
        Pull me
      </div>
    </div>
  );
};

export default NeonSwitch;
