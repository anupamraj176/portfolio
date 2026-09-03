import React, { useEffect, useRef } from "react";
import { FaInstagramSquare, FaGithub, FaTwitter, FaLinkedin, FaFileDownload, FaGraduationCap, FaCode, FaHeart } from "react-icons/fa";
import gsap from "gsap";
import portfolioImg from "../assets/profile.jpeg";

export const Header = () => {
  const polaroidRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    // Initial float up animation
    gsap.fromTo(
      polaroidRef.current,
      { y: 50, opacity: 0, rotation: -5 },
      { y: 0, opacity: 1, rotation: -2, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(
      noteRef.current,
      { y: 50, opacity: 0, rotation: 10 },
      { y: 0, opacity: 1, rotation: 3, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Continuous subtle swinging
    gsap.to(polaroidRef.current, {
      rotation: 1,
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(noteRef.current, {
      rotation: 5,
      y: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative">
      
      {/* Left Content */}
      <div className="flex-1 w-full text-center lg:text-left z-10 relative">
        <div className="mb-6">
          <span className="text-[#d97d4d] text-xl font-bold tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
            <span className="text-white/50">{"<"}</span> Hello World <span className="text-white/50">{"/>"}</span>
          </span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 relative inline-block">
          I'm Anupam Raj
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#d97d4d] rounded-full opacity-80" style={{ transform: "rotate(-1deg)" }}></span>
        </h1>
        
        <p className="text-[#d97d4d] text-xl md:text-2xl mt-4 font-bold tracking-wider" style={{ fontFamily: "monospace" }}>
          Full-Stack Developer • Problem Solver
        </p>

        <p className="mt-8 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ fontFamily: "monospace" }}>
          I build scalable web applications with a focus on clean code and beautiful user experiences. 
          Currently specializing in the MERN stack and modern frontend frameworks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
          <a
            href="#projects"
            className="px-8 py-3 text-lg font-bold text-white bg-[#d97d4d] transition-colors hover:bg-[#c2693b] rounded-full shadow-lg"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.2)" }}
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            className="px-8 py-3 text-lg font-bold text-white bg-transparent border-2 border-white/20 transition-all hover:bg-white/10 rounded-full flex items-center gap-2"
          >
            <FaFileDownload /> Resume
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
          {[
            { icon: <FaGithub />, link: "https://github.com/anupamraj" },
            { icon: <FaLinkedin />, link: "https://linkedin.com/in/anupamraj" },
            { icon: <FaTwitter />, link: "https://twitter.com/anupamraj" },
            { icon: <FaInstagramSquare />, link: "https://instagram.com/anupamraj" }
          ].map((social, idx) => (
            <a 
              key={idx}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-[#d97d4d] text-3xl transition-colors hover:-translate-y-1 transform duration-200"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right Content - Polaroid & Sticky Note */}
      <div className="relative z-10 flex-shrink-0 mt-10 lg:mt-0 w-[280px] h-[350px]">
        
        {/* The Polaroid */}
        <div 
          ref={polaroidRef}
          className="bg-[#f4f4f4] p-4 pb-12 shadow-2xl relative transform transition-transform hover:rotate-0 duration-300 rounded-sm"
          style={{
            boxShadow: "10px 15px 25px rgba(0,0,0,0.5)",
            width: "280px"
          }}
        >
          {/* Tape */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-white/60 shadow-sm border border-black/5 z-20"
               style={{ transform: "translateX(-50%) rotate(-1deg)" }}></div>
          
          <img
            src={portfolioImg}
            alt="Anupam"
            className="w-full h-auto aspect-[3/4] object-cover rounded-sm grayscale-[20%] contrast-110"
          />
          <p className="text-black/80 font-bold text-center mt-4 text-2xl" style={{ fontFamily: "Kalam, cursive" }}>Me!</p>
        </div>

        {/* The Sticky Note */}
        <div 
          ref={noteRef}
          className="absolute top-[75%] left-[50%] w-64 bg-[#f1c40f] p-5 shadow-xl z-20 origin-top-left rounded-bl-3xl"
          style={{
            boxShadow: "4px 8px 15px rgba(0,0,0,0.3)"
          }}
        >
          {/* Push Pin */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#e74c3c] rounded-full shadow-md">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
          
          <ul className="text-black/80 font-bold text-lg mt-2 flex flex-col gap-2">
            <li className="flex items-center gap-2"><FaCode className="text-[#d97d4d]"/> MERN Stack</li>
            <li className="flex items-center gap-2"><FaCode className="text-[#d97d4d]"/> Next.js & Tailwind</li>
            <li className="flex items-center gap-2"><FaGraduationCap className="text-[#d97d4d]"/> B.Tech CS</li>
            <li className="flex items-center gap-2"><FaHeart className="text-[#e74c3c]"/> Coffee & Code</li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default Header;