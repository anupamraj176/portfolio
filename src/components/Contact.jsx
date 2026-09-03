import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SketchyButton = ({ text, onClick }) => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      rotation: -2,
      duration: 0.3,
      ease: "back.out(1.5)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      rotation: 1,
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
      className="px-8 py-3 text-2xl font-bold text-white bg-[#e74c3c] transition-all transform hover:bg-[#c0392b]"
      style={{
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
        boxShadow: "4px 6px 0px rgba(0,0,0,0.4)",
        transform: "rotate(1deg)"
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        rotation: -2,
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
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.out",
      });
      setBtnText("Fill all fields!");
      setTimeout(() => setBtnText("Send Message!"), 2000);
      return;
    }
    
    setBtnText("Sending...");
    setTimeout(() => {
      setBtnText("Sent ✓");
      setTimeout(() => {
        setBtnText("Send Message!");
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const inputStyle = {
    borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
    border: "2px solid rgba(255,255,255,0.2)",
    boxShadow: "2px 4px 0px rgba(0,0,0,0.2)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full px-6 py-20 flex flex-col items-center justify-center min-h-screen overflow-hidden relative"
    >
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-2 inline-block relative">
          Let's Connect!
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#e74c3c]" style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px", transform: "rotate(-1deg)" }}></span>
        </h2>
        <p className="text-white/70 mt-6 text-xl max-w-md mx-auto" style={{ fontFamily: "monospace" }}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-[#2a2a2a] p-8 md:p-12 relative z-10"
        style={{
          borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
          boxShadow: "8px 12px 0px rgba(0,0,0,0.5)",
          border: "2px solid rgba(255,255,255,0.1)",
          transform: "rotate(-1deg)"
        }}
      >
        {/* Tape at top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 shadow-sm border border-black/5"
             style={{ transform: "rotate(2deg)" }}></div>

        <div className="flex flex-col gap-6 mb-8 mt-4">
          <div>
            <label className="block text-white/80 mb-2 font-bold text-lg">Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#1a1a1a] text-white focus:outline-none focus:border-[#e74c3c] transition-colors text-lg"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-bold text-lg">Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#1a1a1a] text-white focus:outline-none focus:border-[#e74c3c] transition-colors text-lg"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-bold text-lg">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Hello Anupam..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#1a1a1a] text-white focus:outline-none focus:border-[#e74c3c] transition-colors text-lg resize-none"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <SketchyButton text={btnText} onClick={handleSubmit} />
        </div>
      </form>
      
    </section>
  );
};

export default Contact;