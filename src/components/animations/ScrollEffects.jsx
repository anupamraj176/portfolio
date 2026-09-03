import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-[#1e1e24]/50">
      <div 
        ref={progressRef}
        className="h-full bg-gradient-to-r from-[#92140c] via-[#ffcf99] to-[#92140c] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};

// Floating animation wrapper
export const FloatingElement = ({ 
  children, 
  className = "", 
  amplitude = 20, 
  duration = 3,
  delay = 0 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: amplitude,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay
      });
      
      // Add subtle rotation
      gsap.to(elementRef.current, {
        rotation: 3,
        duration: duration * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay + 0.5
      });
    });

    return () => ctx.revert();
  }, [amplitude, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Parallax section wrapper
export const ParallaxSection = ({ children, className = "", speed = 0.5 }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        y: () => window.innerHeight * speed * -1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

// Reveal animation on scroll
export const RevealOnScroll = ({ 
  children, 
  className = "", 
  direction = "bottom",
  delay = 0,
  duration = 0.8 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const directions = {
        bottom: { y: 100, x: 0 },
        top: { y: -100, x: 0 },
        left: { x: -100, y: 0 },
        right: { x: 100, y: 0 },
      };

      gsap.from(elementRef.current, {
        ...directions[direction],
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          once: true,
        }
      });
    });

    return () => ctx.revert();
  }, [direction, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Rotate on scroll
export const RotateOnScroll = ({ children, className = "", rotation = 360 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        rotation,
        ease: "none",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, [rotation]);

  return (
    <div ref={elementRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

// Particles background effect
export const ParticlesBackground = ({ count = 30 }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      particlesRef.current.forEach((particle, i) => {
        // Random initial position
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });

        // Floating animation
        gsap.to(particle, {
          y: `-=${Math.random() * 200 + 100}`,
          x: `+=${Math.random() * 100 - 50}`,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        });

        // Pulsing
        gsap.to(particle, {
          scale: Math.random() * 0.3 + 0.8,
          opacity: Math.random() * 0.3 + 0.2,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          className="absolute w-1 h-1 bg-[#ffcf99] rounded-full"
          style={{
            boxShadow: "0 0 10px rgba(255, 207, 153, 0.5)",
          }}
        />
      ))}
    </div>
  );
};

export default ScrollProgress;
