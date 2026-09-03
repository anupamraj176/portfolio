import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated text that reveals character by character
export const TextReveal = ({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 0.05,
  stagger = 0.03,
  triggerOnScroll = false 
}) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = {
        from: {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        to: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger,
          delay,
          ease: "back.out(1.7)",
        }
      };

      if (triggerOnScroll) {
        gsap.fromTo(charsRef.current, animation.from, {
          ...animation.to,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          }
        });
      } else {
        gsap.fromTo(charsRef.current, animation.from, animation.to);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, stagger, triggerOnScroll]);

  const chars = text.split('');

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={{ perspective: '1000px' }}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={el => charsRef.current[i] = el}
          className="inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            display: char === ' ' ? 'inline' : 'inline-block',
            minWidth: char === ' ' ? '0.3em' : 'auto'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// Glitch text effect - great for titles
export const GlitchText = ({ text, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      
      tl.to(el, {
        skewX: 5,
        duration: 0.1,
        ease: "power2.inOut"
      })
      .to(el, {
        skewX: -3,
        duration: 0.08,
      })
      .to(el, {
        skewX: 2,
        duration: 0.08,
      })
      .to(el, {
        skewX: 0,
        duration: 0.1,
        ease: "power2.out"
      });

      // Color glitch
      gsap.to(el, {
        textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          gsap.set(el, { textShadow: "none" });
        }
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    return () => el.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  return (
    <span ref={textRef} className={`inline-block cursor-default ${className}`}>
      {text}
    </span>
  );
};

// Wave text animation
export const WaveText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(charsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out"
      });

      // Continuous wave effect
      charsRef.current.forEach((char, i) => {
        gsap.to(char, {
          y: -10,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chars = text.split('');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={el => charsRef.current[i] = el}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default TextReveal;
