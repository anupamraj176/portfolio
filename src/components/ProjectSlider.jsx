import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiRedux, 
  SiVercel, 
  SiJavascript, 
  SiHtml5, 
  SiCss3 
} from "react-icons/si";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Farmer Hub",
    category: "Direct-to-Consumer Platform",
    desc: "Connecting farmers directly with consumers for fresh produce",
    stack: [FaReact, FaNodeJs, SiRedux, SiTailwindcss, SiJavascript ],
    github: "https://github.com/anupamraj176/SAI",
    live: "https://sai-8zrg.onrender.com/",
    rotation: -2,
  },
  {
    id: 2,
    title: "Grid Layout Generator",
    category: "WEB DEVELOPMENT",
    desc: "It help to generate css grid layout code easily",
    stack: [FaReact, FaNodeJs, SiRedux, SiTailwindcss, SiJavascript ],
    github: "https://github.com/anupamraj176/GridLayoutGenrator",
    live: "https://grid-layout-genrator.vercel.app/",
    rotation: 3,
  },
  {
    id: 3,
    title: "Video Gallery",
    category: "WEB DEVELOPMENT",
    desc: "A responsive video gallery with hover-to-play previews",
    stack: [SiHtml5, SiCss3, SiJavascript, SiVercel],
    github: "https://github.com/anupamraj176/GALLERY",
    live: "https://gallery-six-delta.vercel.app/",
    rotation: -1,
  },
  {
    id: 4,
    title: "GIF Generator",
    category: "REACT APPLICATION",
    desc: "Random GIF Generator with clean, lightweight UI",
    stack: [FaReact, SiTailwindcss, SiVercel],
    github: "https://github.com/anupamraj176/Gif_generator",
    live: "https://gif-generator-eight-psi.vercel.app/",
    rotation: 4,
  },
  {
    id: 5,
    title: "Constellation BG",
    category: "NPM PACKAGE",
    desc: "A customizable constellation background effect for web applications",
    stack: [SiJavascript, SiHtml5, SiVercel],
    github: "https://github.com/anupamraj176/my-constellation-bg",
    live: "https://www.npmjs.com/package/my-constellation-bg",
    rotation: -3,
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div 
      className="w-[300px] sm:w-[350px] flex-shrink-0 bg-[#f4f4f4] p-4 pb-6 shadow-2xl relative border border-black/10 transition-transform hover:z-50 hover:scale-105 duration-300"
      style={{ 
        transform: `rotate(${project.rotation * 0.5}deg)`,
        boxShadow: "5px 15px 25px rgba(0,0,0,0.4)",
        borderRadius: "24px"
      }}
    >
      {/* Red Pushpin */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d97d4d] shadow-md border border-[#c2693b] z-20"
           style={{ boxShadow: "2px 5px 5px rgba(0,0,0,0.3)" }}>
        {/* Pin shine */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/60"></div>
        {/* Pin needle shadow */}
        <div className="absolute top-3 left-1 w-0.5 h-4 bg-black/20 transform rotate-45 -z-10"></div>
      </div>

      {/* Project Content */}
      <div className="bg-[#2a2a2a] w-full h-40 sm:h-48 rounded-[16px] flex items-center justify-center overflow-hidden border border-black/20 mb-4 text-white">
        <h3 className="text-2xl font-bold opacity-50 px-4 text-center">{project.title}</h3>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 leading-tight">{project.title}</h3>
        <p className="text-[#d97d4d] text-xs uppercase font-bold tracking-widest mb-3">{project.category}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 h-16">{project.desc}</p>
        
        {/* Tech Stack Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((Icon, i) => (
            <div key={i} className="text-gray-500">
              <Icon size={18} />
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noreferrer" className="p-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:text-[#d97d4d] hover:border-[#d97d4d] transition-colors">
            <Github size={18} />
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="p-2 border-2 border-gray-300 rounded-lg text-gray-600 hover:text-[#d97d4d] hover:border-[#d97d4d] transition-colors">
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ProjectSlider = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const scrollWidth = containerRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.2; // Extra padding
      
      gsap.to(containerRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // Force refresh after a slight delay to ensure all DOM elements are sized correctly
      setTimeout(() => ScrollTrigger.refresh(), 500);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="w-full h-screen relative overflow-hidden flex flex-col justify-center bg-transparent pt-20"
    >
      {/* Title */}
      <div className="absolute top-10 left-6 sm:left-16 z-10 pointer-events-none">
        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-2">
          Projects <span className="text-[#d97d4d]">pinned up</span>
        </h2>
        <div className="w-24 h-1 bg-[#fff] rounded-full mt-2" style={{ transform: "rotate(-1deg)" }}></div>
      </div>
      
      {/* Scroll indicator instructions */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm flex flex-col items-center gap-2 pointer-events-none">
        <span>scroll down to view projects</span>
        <div className="w-0.5 h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#d97d4d] origin-top animate-bounce"></div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef} 
        className="flex gap-8 sm:gap-16 px-[10vw] sm:px-[20vw] pt-10 pb-16 items-center w-max h-full"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
    </section>
  );
};

export default ProjectSlider;