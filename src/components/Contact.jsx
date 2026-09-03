import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DrawingCanvas from './DrawingCanvas';
import InteractiveMountains from './InteractiveMountains';

gsap.registerPlugin(ScrollTrigger);

const SketchyButton = ({ text, onClick }) => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="px-8 py-3 text-xl font-bold text-white bg-[#d97d4d] transition-colors hover:bg-[#c2693b] rounded-full shadow-lg relative z-20"
      style={{
        boxShadow: "4px 4px 0px rgba(0,0,0,0.2)",
      }}
    >
      {text}
    </button>
  );
};

export const Contact = () => {
  const [btnText, setBtnText] = useState("Send Message!");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const formContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formContainerRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      gsap.to(formContainerRef.current, {
        x: [-8, 8, -8, 8, 0],
        duration: 0.4,
        ease: "power2.out",
      });
      setBtnText("Fill all fields!");
      setTimeout(() => setBtnText("Send Message!"), 2000);
      return;
    }
    
    // Paper airplane animation for the button
    const btn = formRef.current.querySelector('button');
    gsap.to(btn, {
      x: 100,
      y: -100,
      opacity: 0,
      rotation: 15,
      scale: 0.5,
      duration: 0.6,
      ease: "power2.in"
    });
    
    setTimeout(() => {
      setBtnText("Sent ✓");
      gsap.fromTo(btn, 
        { x: -50, y: 50, opacity: 0, scale: 0.5, rotation: -15 },
        { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)" }
      );
      setTimeout(() => {
        setBtnText("Send Message!");
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 600);
  };

  const inputStyle = {
    borderRadius: "16px",
    border: "2px solid rgba(255,255,255,0.1)",
    boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.1)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full px-6 pt-20 pb-32 flex flex-col items-center justify-center min-h-screen relative"
    >
      {/* Restrict drawing canvas strictly to the footer */}
      <DrawingCanvas />
      
      <div className="text-center mb-8 relative z-20 pointer-events-none">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-2 inline-block relative">
          Let's Connect!
          <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#d97d4d] rounded-full opacity-80"></span>
        </h2>
        <p className="text-white/60 mt-6 text-xl max-w-md mx-auto" style={{ fontFamily: "monospace" }}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      <div
        ref={formContainerRef}
        className="w-full max-w-xl bg-[#2a2a2a]/90 backdrop-blur-md p-8 md:p-12 relative z-20 rounded-[30px]"
        style={{
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-5 mb-8">
            <div>
              <label className="block text-white/70 mb-2 font-medium text-lg ml-2">Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-[#1a1a1a]/80 text-white focus:outline-none focus:border-[#d97d4d] transition-colors text-lg"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-white/70 mb-2 font-medium text-lg ml-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-[#1a1a1a]/80 text-white focus:outline-none focus:border-[#d97d4d] transition-colors text-lg"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-white/70 mb-2 font-medium text-lg ml-2">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Hello Anupam..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-[#1a1a1a]/80 text-white focus:outline-none focus:border-[#d97d4d] transition-colors text-lg resize-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <SketchyButton text={btnText} onClick={handleSubmit} />
          </div>
        </form>
      </div>
      
      {/* Decorative Interactive Mountains */}
      <InteractiveMountains />
    </section>
  );
};

export default Contact;