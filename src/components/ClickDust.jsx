import React, { useEffect } from 'react';

export const ClickDust = () => {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't spawn dust if clicking on the drawing canvas toolbar or if drawing
      if (e.target.closest('.chalk-toolbar') || e.target.tagName.toLowerCase() === 'canvas') {
        return;
      }

      const { clientX, clientY } = e;
      const numParticles = 8;
      
      for (let i = 0; i < numParticles; i++) {
        createParticle(clientX, clientY);
      }
    };

    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 4 + 2; // 2px to 6px
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 30 + 10;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 10; // Bias upwards slightly
      
      particle.style.position = 'fixed';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = Math.random() > 0.5 ? '#ffffff' : '#f4f4f4';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';
      particle.style.opacity = '0.8';
      particle.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease-out';
      
      document.body.appendChild(particle);
      
      // Trigger animation
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        particle.style.opacity = '0';
      });
      
      // Cleanup
      setTimeout(() => {
        particle.remove();
      }, 600);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return null;
};

export default ClickDust;
