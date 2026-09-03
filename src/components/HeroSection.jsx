import React, { useEffect, useRef } from "react";
import { FaInstagramSquare, FaGithub, FaTwitter, FaLinkedin, FaFileDownload, FaGraduationCap, FaCode, FaHeart } from "react-icons/fa";
import gsap from "gsap";
import portfolioImg from "../assets/profile.jpeg";

const socialLinks = [
  { Icon: FaLinkedin, url: "https://linkedin.com/in/anupamraj176", color: "#e74c3c" },
  { Icon: FaGithub, url: "https://github.com/anupamraj176", color: "#e74c3c" },
  { Icon: FaTwitter, url: "https://twitter.com/anupamraj176", color: "#e74c3c" },
  { Icon: FaInstagramSquare, url: "https://instagram.com/anupamraj176", color: "#e74c3c" },
];

export const Header = () => {
  const containerRef = useRef(null);
  const polaroidRef = useRef(null);
  const textRef = useRef(null);
  const stickyRef = useRef(null);
  const socialsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Polaroid swing in
      tl.from(polaroidRef.current, { 
        y: -50,
        opacity: 0,
        rotation: -15,
        duration: 1,
        ease: "back.out(1.5)"
      })
      // Text fade and slide
      .from(textRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      // Socials pop
      .from(socialsRef.current, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(2)"
      }, "-=0.4")
      // Sticky note unfold
      .from(stickyRef.current, {
        y: 30,
        opacity: 0,
        rotation: 5,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");

      // Continuous subtle swing for polaroid
      gsap.to(polaroidRef.current, {
        rotation: -4,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-12 gap-12 lg:gap-20 w-full">
      
      {/* LEFT: Polaroid Photo */}
      <div className="relative z-10 flex-shrink-0 mt-10 lg:mt-0">
        <div 
          ref={polaroidRef}
          className="bg-[#f4f4f4] p-4 pb-12 shadow-2xl relative transform -rotate-3 transition-transform hover:rotate-0 duration-300"
          style={{
            boxShadow: "10px 15px 25px rgba(0,0,0,0.5)",
            width: "280px"
          }}
        >
          {/* Tape */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/60 shadow-sm border border-black/5 z-20"
               style={{ transform: "translateX(-50%) rotate(-4deg)" }}></div>
          
          <img
            src={portfolioImg}
            alt="Anupam Raj"
            className="w-full h-auto object-cover grayscale-[20%] contrast-125 border border-black/10"
            style={{ filter: "sepia(20%)" }}
          />
        </div>
      </div>

      {/* RIGHT: Content */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 w-full max-w-2xl">
        
        {/* Header & Socials */}
        <div ref={textRef} className="flex flex-col sm:flex-row items-center sm:items-end justify-between w-full mb-6 gap-4">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2 relative inline-block">
              Anupam Raj
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#e74c3c]" style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px", transform: "rotate(-1deg)" }}></span>
            </h1>
            <p className="text-[#e74c3c] text-xl mt-4 font-bold tracking-wider" style={{ fontFamily: "monospace" }}>
              Full-Stack Developer • Problem Solver
            </p>
          </div>
          
          <div className="flex gap-3">
            {socialLinks.map(({ Icon, url, color }, i) => (
              <a 
                key={i}
                ref={el => socialsRef.current[i] = el}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full transition-transform hover:scale-110"
                style={{
                  color: color,
                  border: `2px solid ${color}`,
                  boxShadow: "3px 4px 0px rgba(0,0,0,0.3)"
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Sticky Note */}
        <div 
          ref={stickyRef}
          className="bg-[#fef3c7] text-[#333] p-6 sm:p-8 w-full relative shadow-xl text-lg sm:text-xl leading-relaxed"
          style={{
            transform: "rotate(1deg)",
            boxShadow: "5px 10px 15px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.05)",
            borderBottomRightRadius: "40px 5px",
          }}
        >
          {/* Sticky Note Tape */}
          <div className="absolute -top-3 left-1/4 w-16 h-6 bg-white/50 shadow-sm border border-black/5"
               style={{ transform: "rotate(2deg)" }}></div>

          <ul className="space-y-4 text-left">
            <li className="flex items-start gap-3">
              <FaGraduationCap className="text-[#e74c3c] mt-1 flex-shrink-0" />
              <span>Currently a B.Tech CSE student passionate about building real-world solutions.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCode className="text-[#e74c3c] mt-1 flex-shrink-0" />
              <span>Building modern, responsive, and user-friendly web applications from scratch.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaHeart className="text-[#e74c3c] mt-1 flex-shrink-0" />
              <span>Obsessed with finding the right problems to solve and crafting clean code.</span>
            </li>
            <li className="flex items-center gap-3 pt-4">
               <a 
                  href="https://google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-1 text-sm text-[#e74c3c] border-2 border-[#e74c3c] rounded-full hover:bg-[#e74c3c] hover:text-white transition-all transform hover:scale-105"
                  style={{ borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}
                >
                  <FaFileDownload /> Resume
                </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Header;