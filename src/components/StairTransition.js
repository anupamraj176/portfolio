import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useNavigation } from '../context/NavigationContext';

const STAIR_COUNT = 7;

const StairTransition = ({ children }) => {
  const { isTransitioning, completeTransition, pendingSection } = useNavigation();
  
  const stairContainerRef = useRef(null);
  const stairsRef = useRef([]);
  const contentRef = useRef(null);
  const overlayTextRef = useRef(null);
  const particlesRef = useRef([]);

  // Section display names
  const sectionNames = {
    home: 'Home',
    about: 'About Me',
    projects: 'Projects',
    contact: 'Contact'
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const tl = gsap.timeline({
      onComplete: () => {
        completeTransition();
      }
    });

    // Phase 1: Show container
    tl.set(stairContainerRef.current, { 
      display: 'flex',
      visibility: 'visible'
    });

    // Animate stairs IN with wave effect
    tl.fromTo(stairsRef.current, 
      { 
        scaleY: 0,
        transformOrigin: 'bottom center',
        opacity: 0.8
      },
      { 
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        stagger: {
          each: 0.05,
          from: 'edges'
        },
        ease: 'power4.out'
      }
    );

    // Add a wave distortion effect
    tl.to(stairsRef.current, {
      scaleX: 1.02,
      duration: 0.15,
      stagger: {
        each: 0.02,
        from: 'center',
        yoyo: true,
        repeat: 1
      },
      ease: 'sine.inOut'
    }, '-=0.3');

    // Animate particles
    tl.fromTo(particlesRef.current,
      { 
        opacity: 0,
        scale: 0,
        y: 50
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: {
          each: 0.05,
          from: 'random'
        },
        ease: 'back.out(2)'
      },
      '-=0.3'
    );

    // Show section name with glitch effect
    tl.fromTo(overlayTextRef.current,
      { 
        opacity: 0, 
        y: 40,
        scale: 0.7,
        rotateX: -20
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.4,
        ease: 'back.out(1.7)'
      },
      '-=0.2'
    );

    // Hold
    tl.to({}, { duration: 0.35 });

    // Hide text with upward motion
    tl.to(overlayTextRef.current, {
      opacity: 0,
      y: -30,
      scale: 1.1,
      duration: 0.25,
      ease: 'power3.in'
    });

    // Hide particles
    tl.to(particlesRef.current, {
      opacity: 0,
      scale: 0,
      y: -30,
      duration: 0.2,
      stagger: {
        each: 0.02,
        from: 'random'
      },
      ease: 'power2.in'
    }, '-=0.2');

    // Phase 2: Animate stairs OUT with flip effect
    tl.to(stairsRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.45,
      stagger: {
        each: 0.04,
        from: 'center'
      },
      ease: 'power4.inOut'
    }, '-=0.1');

    // Hide container
    tl.set(stairContainerRef.current, { 
      display: 'none',
      visibility: 'hidden'
    });

    // Phase 3: Animate content in with bounce
    tl.fromTo(contentRef.current,
      { 
        opacity: 0,
        scale: 1.08,
        y: 30
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.2)'
      },
      '-=0.15'
    );

    return () => {
      tl.kill();
    };
  }, [isTransitioning, completeTransition]);

  // Generate gradient colors for each stair - matching theme with more variety
  const getStairStyle = (index) => {
    const baseHue = 8; // Red-orange hue
    const saturation = 85;
    const lightness = 25 + (index * 4);
    
    return {
      background: `linear-gradient(180deg, 
        hsl(${baseHue}, ${saturation}%, ${lightness + 8}%) 0%, 
        hsl(${baseHue}, ${saturation}%, ${lightness}%) 50%,
        hsl(${baseHue}, ${saturation - 10}%, ${lightness - 5}%) 100%)`,
      boxShadow: `
        0 0 40px rgba(146, 20, 12, 0.4),
        inset 0 2px 0 rgba(255, 207, 153, 0.15),
        inset 0 -2px 0 rgba(0, 0, 0, 0.2)
      `,
    };
  };

  // Generate floating particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 0.3
  }));

  return (
    <div className="relative">
      {/* Stair Transition Overlay */}
      <div 
        ref={stairContainerRef}
        className="fixed inset-0 z-[100] hidden items-stretch"
        style={{ visibility: 'hidden' }}
      >
        {/* Animated Background Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(146, 20, 12, 0.3) 0%, transparent 70%)'
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            ref={el => particlesRef.current[particle.id] = el}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              top: particle.top,
              background: 'radial-gradient(circle, #ffcf99 0%, rgba(255, 207, 153, 0) 70%)',
              opacity: 0,
              filter: 'blur(1px)'
            }}
          />
        ))}

        {/* Stairs */}
        {Array.from({ length: STAIR_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={el => stairsRef.current[index] = el}
            className="flex-1 h-full relative overflow-hidden"
            style={{
              ...getStairStyle(index),
              transform: 'scaleY(0)',
            }}
          >
            {/* Shimmer effect */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255, 207, 153, 0.08) 50%, transparent 60%)',
                animation: 'shimmer 2s infinite'
              }}
            />
            {/* Top edge highlight */}
            <div 
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 10%, rgba(255, 207, 153, 0.4) 50%, transparent 90%)'
              }}
            />
            {/* Side gradients for depth */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-3"
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.2), transparent)'
              }}
            />
            <div 
              className="absolute top-0 bottom-0 right-0 w-3"
              style={{
                background: 'linear-gradient(270deg, rgba(0,0,0,0.2), transparent)'
              }}
            />
          </div>
        ))}
        
        {/* Center Text Overlay */}
        <div 
          ref={overlayTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0, perspective: '1000px' }}
        >
          <div className="text-center">
            {/* Glow backdrop */}
            <div 
              className="absolute inset-0 -m-20"
              style={{
                background: 'radial-gradient(circle, rgba(255, 207, 153, 0.15) 0%, transparent 50%)',
                filter: 'blur(30px)'
              }}
            />
            <span 
              className="relative text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #fff8f0 0%, #ffcf99 50%, #fff8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(255, 207, 153, 0.5))'
              }}
            >
              {pendingSection ? sectionNames[pendingSection] : ''}
            </span>
            {/* Animated underline */}
            <div className="mt-6 flex justify-center">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-transparent via-[#ffcf99] to-transparent"
                style={{ width: '120px' }}
              />
            </div>
            {/* Loading dots */}
            <div className="mt-4 flex justify-center gap-3">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #ffcf99, #92140c)',
                    animation: `pulse 0.8s ease-in-out ${i * 0.15}s infinite`,
                    boxShadow: '0 0 10px rgba(255, 207, 153, 0.5)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef}>
        {children}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default StairTransition;
