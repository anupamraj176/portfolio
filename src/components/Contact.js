import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FancyButton = ({ text, onClick }) => {
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      y: -5,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative px-10 py-4 font-semibold text-[#fff8f0] bg-gradient-to-r from-[#92140c] to-[#d97d4d] rounded-xl overflow-hidden group transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#ffcf99]/30"
    >
      <span className="absolute inset-0 w-0 bg-[#fff8f0] transition-all duration-500 ease-out group-hover:w-full"></span>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#92140c]">
        {text}
      </span>
    </button>
  );
};

export const Contact = () => {
  const [btnText, setBtnText] = useState("Send");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Refs
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Set initial states (important!)
      gsap.set([titleRef.current, subtitleRef.current, descRef.current, formRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set([nameInputRef.current, emailInputRef.current, messageInputRef.current, buttonContainerRef.current], {
        opacity: 0,
        y: 30,
      });

      // Animate in sequence
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .to(formRef.current, { opacity: 1, y: 0, duration: 1, ease: "back.out(1.4)" }, "-=0.4")
        .to([nameInputRef.current, emailInputRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }, "-=0.6")
        .to(messageInputRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(buttonContainerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    gsap.to(e.target, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(255, 207, 153, 0.2)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleBlur = (e) => {
    gsap.to(e.target, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setBtnText("Fill all fields!");
      setTimeout(() => setBtnText("Send"), 2000);
      return;
    }
    setBtnText("Sending...");
    // Add your submission logic here
    setTimeout(() => {
      setBtnText("Sent ✓");
      setTimeout(() => {
        setBtnText("Send");
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div
      id="contact"
      ref={sectionRef}
      className="w-full px-6 py-20 bg-[#1e1e24] flex flex-col items-center justify-center min-h-screen"
    >
      <div className="text-center mb-12 max-w-3xl">
        <h4
          ref={titleRef}
          className="text-[#ffcf99] font-medium tracking-widest uppercase text-sm mb-3"
        >
          Connect With Me
        </h4>

        <h2
          ref={subtitleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#fff8f0] leading-tight"
        >
          Get in touch
        </h2>

        <p
          ref={descRef}
          className="text-[#fff8f0]/60 mt-6 text-lg max-w-md mx-auto"
        >
          I'd love to hear from you! Please use the form below.
        </p>
      </div>

      <div
        ref={formRef}
        className="w-full max-w-2xl bg-[#1a1a20]/90 backdrop-blur-lg p-8 md:p-12 rounded-2xl border border-[#ffcf99]/20 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            ref={nameInputRef}
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full px-5 py-4 rounded-xl bg-[#2a2a32] text-white border border-[#ffcf99]/20 focus:border-[#ffcf99] focus:outline-none transition-all placeholder:text-gray-500 shadow-lg"
          />

          <input
            ref={emailInputRef}
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full px-5 py-4 rounded-xl bg-[#2a2a32] text-white border border-[#ffcf99]/20 focus:border-[#ffcf99] focus:outline-none transition-all placeholder:text-gray-500 shadow-lg"
          />
        </div>

        <textarea
          ref={messageInputRef}
          name="message"
          rows={6}
          placeholder="How can I help you?"
          value={formData.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full px-5 py-4 rounded-xl bg-[#2a2a32] text-white border border-[#ffcf99]/20 focus:border-[#ffcf99] focus:outline-none transition-all placeholder:text-gray-500 mb-8 resize-none shadow-lg"
        />

        <div ref={buttonContainerRef} className="flex justify-center">
          <FancyButton text={btnText} onClick={handleSubmit} />
        </div>


      </div>
    </div>
  );
};

export default Contact;