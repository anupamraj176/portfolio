import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import gsap from 'gsap';

const ThemeToggle = () => {
  const [isWhiteboard, setIsWhiteboard] = useState(false);

  useEffect(() => {
    if (isWhiteboard) {
      document.body.classList.add('whiteboard-mode');
      gsap.to(document.body, { backgroundColor: '#f8f9fa', duration: 0.5 });
    } else {
      document.body.classList.remove('whiteboard-mode');
      gsap.to(document.body, { backgroundColor: '#1a1a1a', duration: 0.5 });
    }
  }, [isWhiteboard]);

  return (
    <button
      onClick={() => setIsWhiteboard(!isWhiteboard)}
      className="fixed top-6 right-6 z-[100] p-3 rounded-full border-2 border-[#d97d4d] bg-[#2a2a2a]/80 whiteboard-mode:bg-white text-[#d97d4d] hover:bg-[#d97d4d] hover:text-white transition-all shadow-lg flex items-center justify-center group"
      style={{
        boxShadow: "2px 4px 0px rgba(0,0,0,0.2)"
      }}
      aria-label="Toggle Whiteboard Mode"
      title="Toggle Whiteboard Mode"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun 
          className={`absolute transition-all duration-500 ${isWhiteboard ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
          size={20} 
        />
        <Moon 
          className={`absolute transition-all duration-500 ${!isWhiteboard ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`} 
          size={20} 
        />
      </div>
      
      {/* Hand-drawn circle effect on hover */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity scale-125" viewBox="0 0 100 100" style={{ transform: "rotate(15deg)" }}>
        <path 
          d="M 50,5 C 75,5 95,25 95,50 C 95,75 75,95 50,95 C 25,95 5,75 5,50 C 5,25 25,5 50,5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
