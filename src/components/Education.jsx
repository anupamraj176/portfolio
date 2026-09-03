import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ year, title, subtitle, desc, isLeft }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: isLeft ? -50 : 50, rotation: isLeft ? -5 : 5 },
      {
        opacity: 1,
        x: 0,
        rotation: isLeft ? -1 : 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [isLeft]);

  return (
    <div className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} relative mb-16`}>
      {/* Chalk connecting line */}
      <div className={`hidden md:block absolute top-1/2 ${isLeft ? 'right-[50%] ml-4' : 'left-[50%] mr-4'} w-1/4 h-0.5 bg-white/20`}
           style={{ transform: `translateY(-50%) rotate(${isLeft ? '2deg' : '-2deg'})` }}></div>

      <div 
        ref={itemRef}
        className={`w-full md:w-[45%] bg-[#f4f4f4] p-5 shadow-2xl relative border border-black/10 text-black`}
        style={{
          borderRadius: "16px",
          transform: `rotate(${isLeft ? '-1deg' : '1deg'})`,
          boxShadow: "5px 10px 20px rgba(0,0,0,0.3)"
        }}
      >
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/70 shadow-sm border border-black/10 z-10"
             style={{ transform: `rotate(${isLeft ? '3deg' : '-3deg'})` }}></div>
        
        <span className="inline-block px-3 py-1 bg-[#d97d4d] text-white font-bold text-sm rounded-full mb-3" style={{ fontFamily: "monospace" }}>
          {year}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <h4 className="text-[#c2693b] font-semibold text-sm mb-3 uppercase tracking-wider">{subtitle}</h4>
        <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "Kalam, cursive" }}>
          {desc}
        </p>
      </div>
      
      {/* Chalk dot on the timeline */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#d97d4d] border-2 border-[#1a1a1a] rounded-full z-10"></div>
    </div>
  );
};

export const Education = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    // Animate the central chalk line drawing downwards
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current.parentElement,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section id="education" className="w-full min-h-screen relative pt-24 pb-20 px-6 overflow-hidden">
      
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white inline-block relative">
          My Journey
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] h-1.5 bg-[#d97d4d] rounded-full opacity-80" style={{ transform: "rotate(1deg)" }}></span>
        </h2>
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Central Chalk Timeline Line */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/10 rounded-full">
          <div ref={lineRef} className="w-full bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
        </div>

        <TimelineItem 
          year="2020 - 2024"
          title="B.Tech in Computer Science"
          subtitle="XYZ University"
          desc="Graduated with honors. Focused on full-stack web development, data structures, and algorithms. Built multiple scalable applications and participated in various hackathons."
          isLeft={true}
        />

        <TimelineItem 
          year="2023"
          title="Full-Stack Developer Intern"
          subtitle="Tech Startup Inc."
          desc="Developed and maintained web applications using the MERN stack. Collaborated closely with the design team to implement responsive user interfaces."
          isLeft={false}
        />

        <TimelineItem 
          year="2022"
          title="Web Development Certification"
          subtitle="Online Bootcamp"
          desc="Completed an intensive 6-month bootcamp covering modern JavaScript, React, Node.js, and database architecture."
          isLeft={true}
        />
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-10 pointer-events-none opacity-30">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <path d="M10,50 L40,90 L90,10" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>
      
    </section>
  );
};

export default Education;
