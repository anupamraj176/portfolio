import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Divider = () => {
  const dividerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(dividerRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex justify-center bg-[#1e1e24] py-3 sm:py-4 md:py-6">
      <div 
        ref={dividerRef}
        className="w-[90vw] sm:w-[85vw] md:w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#ffcf99] to-transparent rounded-full shadow-2xl shadow-[#ffcf99]/50" 
      />
    </div>
  );
};

export default Divider;