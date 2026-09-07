import React, { useEffect, useRef } from 'react';

const ChalkTrail = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isMoving: false });
  const points = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const addPoint = (x, y) => {
      points.current.push({
        x,
        y,
        age: 0,
        width: Math.random() * 4 + 2
      });
    };

    const handleMouseMove = (e) => {
      pointer.current.lastX = pointer.current.x;
      pointer.current.lastY = pointer.current.y;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.isMoving = true;
      
      // Interpolate points for smoother lines if moving fast
      const dx = pointer.current.x - pointer.current.lastX;
      const dy = pointer.current.y - pointer.current.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) {
        const steps = Math.floor(dist / 5);
        for (let i = 0; i < steps; i++) {
          addPoint(
            pointer.current.lastX + (dx * i) / steps,
            pointer.current.lastY + (dy * i) / steps
          );
        }
      }
      addPoint(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Neon/Chalk color (handled via CSS variable if possible, but canvas needs hardcoded or fetched color)
      // We will check for neon mode body class in a simple way
      const isNeon = document.body.classList.contains('neon-mode');
      const baseColor = isNeon ? 'rgba(0, 255, 255,' : 'rgba(255, 255, 255,';

      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        p.age += 1;

        if (p.age > 50) {
          points.current.splice(i, 1);
          i--;
          continue;
        }

        const life = 1 - p.age / 50;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.width * life, 0, Math.PI * 2);
        
        // Add chalky scatter effect
        const scatterX = (Math.random() - 0.5) * 4;
        const scatterY = (Math.random() - 0.5) * 4;
        
        ctx.fillStyle = `${baseColor} ${life * 0.5})`;
        ctx.fill();
        
        // Rough chalk edge
        ctx.beginPath();
        ctx.arc(p.x + scatterX, p.y + scatterY, p.width * life * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor} ${life * 0.8})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ChalkTrail;
