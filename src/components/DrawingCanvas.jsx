import React, { useEffect, useRef, useState } from 'react';

const COLORS = {
  white: '#ffffff',
  red: '#e74c3c',
  yellow: '#f1c40f',
};

export const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [activeTool, setActiveTool] = useState(null); // 'white', 'red', 'yellow', 'eraser', or null
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const strokesRef = useRef([]); // Store strokes for redrawing on resize

  // Setup canvas size and listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollWidth = document.documentElement.scrollWidth;
      
      // Only resize if it actually grew (to avoid clearing on mobile browser bar hide/show)
      if (canvas.width !== scrollWidth || canvas.height !== scrollHeight) {
        canvas.width = scrollWidth;
        canvas.height = scrollHeight;
        redrawAll();
      }
    };

    const redrawAll = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      strokesRef.current.forEach(stroke => {
        if (stroke.tool === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineWidth = 40;
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.lineWidth = 4;
          ctx.strokeStyle = COLORS[stroke.tool] || COLORS.white;
          // Slight opacity for chalk effect
          ctx.globalAlpha = 0.8;
        }

        ctx.beginPath();
        if (stroke.points.length > 0) {
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
          }
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1.0;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Using ResizeObserver to catch layout changes
    const observer = new ResizeObserver(updateCanvasSize);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      observer.disconnect();
    };
  }, []);

  // Handle drawing events globally
  useEffect(() => {
    if (!activeTool) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const startDrawing = (e) => {
      // Don't draw if clicking on interactive elements
      if (e.target.closest('button, a, input, textarea, .chalk-toolbar')) {
        return;
      }
      
      isDrawing.current = true;
      const x = e.pageX;
      const y = e.pageY;
      lastPos.current = { x, y };

      // Start a new stroke
      strokesRef.current.push({ tool: activeTool, points: [{ x, y }] });

      // Draw dot
      ctx.beginPath();
      if (activeTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 4;
        ctx.strokeStyle = COLORS[activeTool];
        ctx.globalAlpha = 0.8;
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      
      const x = e.pageX;
      const y = e.pageY;

      // Add point to current stroke
      const currentStroke = strokesRef.current[strokesRef.current.length - 1];
      if (currentStroke) {
        currentStroke.points.push({ x, y });
      }

      ctx.beginPath();
      if (activeTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 40;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 4;
        ctx.strokeStyle = COLORS[activeTool];
        ctx.globalAlpha = 0.8;
      }
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPos.current = { x, y };
    };

    const stopDrawing = () => {
      isDrawing.current = false;
    };

    window.addEventListener('pointerdown', startDrawing);
    window.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', stopDrawing);
    window.addEventListener('pointercancel', stopDrawing);

    return () => {
      window.removeEventListener('pointerdown', startDrawing);
      window.removeEventListener('pointermove', draw);
      window.removeEventListener('pointerup', stopDrawing);
      window.removeEventListener('pointercancel', stopDrawing);
    };
  }, [activeTool]);

  // Dynamic cursor based on tool
  let cursorStyle = 'default';
  if (activeTool === 'white') cursorStyle = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'><circle cx=\'8\' cy=\'8\' r=\'4\' fill=\'%23ffffff\'/></svg>") 8 8, crosshair';
  if (activeTool === 'red') cursorStyle = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'><circle cx=\'8\' cy=\'8\' r=\'4\' fill=\'%23e74c3c\'/></svg>") 8 8, crosshair';
  if (activeTool === 'yellow') cursorStyle = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\'><circle cx=\'8\' cy=\'8\' r=\'4\' fill=\'%23f1c40f\'/></svg>") 8 8, crosshair';
  if (activeTool === 'eraser') cursorStyle = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><rect x=\'0\' y=\'0\' width=\'32\' height=\'32\' fill=\'white\' fill-opacity=\'0.5\' stroke=\'white\' stroke-width=\'2\'/></svg>") 16 16, cell';

  return (
    <>
      {/* Absolute Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 40 }}
      />
      
      {/* Body cursor override when drawing */}
      {activeTool && (
        <style>
          {`body { cursor: ${cursorStyle} !important; user-select: none; }`}
        </style>
      )}

      {/* Floating Toolbar */}
      <div className="chalk-toolbar fixed bottom-8 right-8 z-50 flex items-end gap-3 bg-[#2a2a2a]/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl transition-transform duration-300">
        
        {/* White Chalk */}
        <button 
          onClick={() => setActiveTool(activeTool === 'white' ? null : 'white')}
          className={`w-4 h-16 rounded-t-sm transition-all shadow-md relative ${activeTool === 'white' ? '-translate-y-4 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'hover:-translate-y-2'}`}
          style={{ background: 'linear-gradient(to right, #e0e0e0, #ffffff, #d0d0d0)' }}
          aria-label="White Chalk"
        >
          <div className="absolute bottom-0 w-full h-4 bg-[#8b5a2b] opacity-80" />
        </button>

        {/* Red Chalk */}
        <button 
          onClick={() => setActiveTool(activeTool === 'red' ? null : 'red')}
          className={`w-4 h-16 rounded-t-sm transition-all shadow-md relative ${activeTool === 'red' ? '-translate-y-4 shadow-[0_0_15px_rgba(231,76,60,0.5)]' : 'hover:-translate-y-2'}`}
          style={{ background: 'linear-gradient(to right, #c0392b, #e74c3c, #a93226)' }}
          aria-label="Red Chalk"
        >
          <div className="absolute bottom-0 w-full h-4 bg-[#8b5a2b] opacity-80" />
        </button>

        {/* Yellow Chalk */}
        <button 
          onClick={() => setActiveTool(activeTool === 'yellow' ? null : 'yellow')}
          className={`w-4 h-16 rounded-t-sm transition-all shadow-md relative ${activeTool === 'yellow' ? '-translate-y-4 shadow-[0_0_15px_rgba(241,196,15,0.5)]' : 'hover:-translate-y-2'}`}
          style={{ background: 'linear-gradient(to right, #d4ac0d, #f1c40f, #b7950b)' }}
          aria-label="Yellow Chalk"
        >
          <div className="absolute bottom-0 w-full h-4 bg-[#8b5a2b] opacity-80" />
        </button>

        <div className="w-[1px] h-12 bg-white/20 mx-1" />

        {/* Eraser */}
        <button 
          onClick={() => setActiveTool(activeTool === 'eraser' ? null : 'eraser')}
          className={`w-12 h-8 rounded transition-all shadow-md bg-[#e67e22] relative border-b-4 border-[#d35400] ${activeTool === 'eraser' ? '-translate-y-4 shadow-[0_0_15px_rgba(230,126,34,0.5)]' : 'hover:-translate-y-2'}`}
          aria-label="Eraser"
        >
          <div className="absolute top-0 w-full h-3 bg-[#2c3e50] rounded-t opacity-80" />
        </button>

      </div>
    </>
  );
};

export default DrawingCanvas;
