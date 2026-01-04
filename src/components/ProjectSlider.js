import React, { useEffect, useRef, useState } from "react";
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
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

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
    gradient: "from-amber-500 via-orange-600 to-red-700",
    accentColor: "amber",
  },
  {
    id: 2,
    title: "Grid Layout Generator",
    category: "WEB DEVELOPMENT",
    desc: "It help to generate css grid layout code easily",
    stack: [FaReact, FaNodeJs, SiRedux, SiTailwindcss, SiJavascript ],
    github: "https://github.com/anupamraj176/GridLayoutGenrator",
    live: "https://grid-layout-genrator.vercel.app/",
    gradient: "from-amber-500 via-orange-600 to-red-700",
    accentColor: "amber",
  },
  {
    id: 3,
    title: "Video Gallery",
    category: "WEB DEVELOPMENT",
    desc: "A responsive video gallery with hover-to-play previews",
    stack: [SiHtml5, SiCss3, SiJavascript, SiVercel],
    github: "https://github.com/anupamraj176/GALLERY",
    live: "https://gallery-six-delta.vercel.app/",
    gradient: "from-purple-600 via-purple-700 to-purple-900",
    accentColor: "purple",
  },
  {
    id: 4,
    title: "GIF Generator",
    category: "REACT APPLICATION",
    desc: "Random GIF Generator with clean, lightweight UI",
    stack: [FaReact, SiTailwindcss, SiVercel],
    github: "https://github.com/anupamraj176/Gif_generator",
    live: "https://gif-generator-eight-psi.vercel.app/",
    gradient: "from-cyan-500 via-cyan-600 to-cyan-800",
    accentColor: "cyan",
  },
  {
    id: 5,
    title: "NPM package - Constellation Background",
    category: "NPM PACKAGE",
    desc: "A customizable constellation background effect for web applications",
    stack: [SiJavascript, SiHtml5, SiVercel],
    github: "https://github.com/anupamraj176/my-constellation-bg",
    live: "https://www.npmjs.com/package/my-constellation-bg",
    gradient: "from-cyan-500 via-cyan-600 to-cyan-800",
    accentColor: "cyan",
  },
];

const ProjectCard = ({ project, index, isActive, direction }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          x: direction === 'next' ? 100 : -100,
          rotateY: direction === 'next' ? 15 : -15,
        },
        { 
          opacity: 1, 
          x: 0, 
          rotateY: 0,
          duration: 0.7, 
          ease: "power3.out" 
        }
      );
    }
  }, [isActive, direction]);

  if (!isActive) return null;

  return (
    <div
      ref={cardRef}
      className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] xl:w-[420px] h-[380px] sm:h-[430px] md:h-[480px] lg:h-[520px] xl:h-[580px]"
      style={{ perspective: '1000px' }}
    >
      {/* Phone-like card container with premium styling */}
      <div className="relative w-full h-full rounded-[40px] bg-gradient-to-b from-[#c41f0f] via-[#8b1a0a] to-[#1a1a2e] p-[2px] shadow-2xl shadow-[#c41f0f]/40">
        
        {/* Inner card */}
        <div className="relative w-full h-full rounded-[38px] bg-gradient-to-b from-[#c41f0f] via-[#8b1a0a] to-[#1a1a2e] overflow-hidden">
          
          {/* Glossy top overlay */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#ff8c5a]/20 to-transparent pointer-events-none rounded-t-[38px]"></div>

          {/* Premium corner elements */}
          <div className="absolute top-8 left-8 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#ff8c5a]/70 to-[#ff8c5a]/20"></div>
            <div className="absolute top-0 left-0 h-full w-[1.5px] bg-gradient-to-b from-[#ff8c5a]/70 to-[#ff8c5a]/20"></div>
          </div>

          <div className="absolute bottom-8 right-8 w-12 h-12">
            <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-gradient-to-r from-[#ff8c5a]/20 to-[#ff8c5a]/70"></div>
            <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-gradient-to-b from-[#ff8c5a]/20 to-[#ff8c5a]/70"></div>
          </div>

          {/* Project number indicator - Premium design */}
          <div className="absolute top-7 right-7 w-12 h-12 rounded-full border border-[#ff8c5a]/40 flex items-center justify-center backdrop-blur-md bg-[#ff8c5a]/5 hover:bg-[#ff8c5a]/15 transition-all duration-300">
            <span className="text-[#ff8c5a] font-bold text-sm">0{index + 1}</span>
          </div>

          {/* Main Content - Premium Layout */}
          <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-10 py-12">
            
            {/* Top section */}
            <div>
              {/* Category with premium styling */}
              <p className="text-[#ff8c5a]/50 text-[11px] tracking-[0.35em] uppercase font-semibold mb-6 letter-spacing-wider">
                {project.category}
              </p>

              {/* Project Title - Enhanced */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2 tracking-tight">
                {project.title}
              </h3>
              
              {/* Divider line */}
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#ff8c5a]/80 to-[#ff8c5a]/20 my-6"></div>

              {/* Description - Enhanced */}
              <p className="text-white/70 text-sm leading-relaxed max-w-xs font-light">
                {project.desc}
              </p>
            </div>

            {/* Bottom section */}
            <div>
              {/* Tech stack - Premium design */}
              <p className="text-[#ff8c5a]/40 text-[10px] tracking-[0.25em] uppercase font-semibold mb-4">
                TECH STACK
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {project.stack.map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-md border border-[#ff8c5a]/20 flex items-center justify-center text-[#ff8c5a]/80 hover:bg-gradient-to-br hover:from-[#ff8c5a]/25 hover:to-[#ff8c5a]/15 hover:text-[#ff8c5a] hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg shadow-[#ff8c5a]/5"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Premium design */}
              <div className="flex gap-3">
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#ff8c5a]/20 to-[#ff8c5a]/10 backdrop-blur-md border border-[#ff8c5a]/40 rounded-xl text-white font-semibold text-sm hover:from-[#ff8c5a]/35 hover:to-[#ff8c5a]/20 hover:border-[#ff8c5a]/60 transition-all duration-300 group shadow-lg shadow-[#ff8c5a]/10"
                >
                  <ExternalLink className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                  LIVE
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-[#ff8c5a]/10 to-[#ff8c5a]/5 backdrop-blur-md border border-[#ff8c5a]/30 rounded-xl text-[#ff8c5a]/80 font-semibold text-sm hover:text-[#ff8c5a] hover:bg-gradient-to-r hover:from-[#ff8c5a]/20 hover:to-[#ff8c5a]/10 hover:border-[#ff8c5a]/50 transition-all duration-300 group shadow-lg shadow-[#ff8c5a]/5"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  CODE
                </a>
              </div>
            </div>
          </div>

          {/* Bottom premium glow */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-[#ffcf99]/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* Elegant shadow beneath */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-gradient-to-b from-[#92140c]/25 to-transparent blur-3xl rounded-full"></div>
    </div>
  );
};

export const ProjectSlider = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (idx) => {
    setDirection(idx > activeIndex ? 'next' : 'prev');
    setActiveIndex(idx);
  };

  return (
    <section 
      ref={containerRef}
      id="projects"
      aria-labelledby="projects-title"
      className="w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] bg-[#1e1e24] relative py-4 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 overflow-hidden flex items-center"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-[#92140c]/12 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-24 items-center">
          
          {/* Left side - Premium Text content */}
          <div className="space-y-3 sm:space-y-6 text-center lg:text-left">
            <div>
              <p 
                ref={subtitleRef}
                className="text-[#ffcf99]/70 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase font-bold mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
              >
                <span className="w-4 sm:w-8 h-[1px] bg-gradient-to-r from-[#ffcf99]/80 to-transparent"></span>
                FEATURED WORK
              </p>
              
              <h1 
                id="projects-title"
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#fff8f0] leading-tight tracking-tight"
              >
                My{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92140c] via-[#ffcf99] to-[#ffb866]">
                  Projects
                </span>
              </h1>
            </div>

            <p className="text-[#fff8f0]/65 text-xs sm:text-sm lg:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
              Explore my portfolio of work showcasing expertise in web development, design, and innovative solutions.
            </p>

            {/* Premium Navigation controls */}
            <div className="flex items-center gap-3 sm:gap-6 pt-2 sm:pt-4 justify-center lg:justify-start">
              <div className="flex gap-2 sm:gap-3">
                <button 
                  onClick={prevProject}
                  aria-label="Previous project"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#ffcf99]/30 flex items-center justify-center text-[#fff8f0]/60 hover:text-[#ffcf99] hover:border-[#ffcf99]/70 hover:bg-[#ffcf99]/10 transition-all duration-300 group backdrop-blur-sm"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={nextProject}
                  aria-label="Next project"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#ffcf99]/30 flex items-center justify-center text-[#fff8f0]/60 hover:text-[#ffcf99] hover:border-[#ffcf99]/70 hover:bg-[#ffcf99]/10 transition-all duration-300 group backdrop-blur-sm"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Premium Progress indicators */}
              <nav aria-label="Project pagination" className="flex gap-1.5 sm:gap-2.5 ml-2 sm:ml-6">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProject(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                    aria-current={idx === activeIndex ? 'true' : 'false'}
                    className={`rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-[#92140c] to-[#ffcf99] shadow-lg shadow-[#ffcf99]/30' 
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#fff8f0]/25 hover:bg-[#ffcf99]/50'
                    }`}
                  />
                ))}
              </nav>
            </div>

            {/* Premium Project counter - hidden on small screens */}
            <div className="hidden sm:flex items-baseline gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-[#fff8f0]/15 justify-center lg:justify-start">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#92140c] to-[#ffcf99]">
                0{activeIndex + 1}
              </span>
              <span className="text-[#fff8f0]/30 text-xl sm:text-2xl font-light">/</span>
              <span className="text-[#fff8f0]/40 text-lg sm:text-xl font-light">0{projects.length}</span>
            </div>
          </div>

          {/* Right side - Project Card */}
          <div className="relative flex justify-center lg:justify-end items-center h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeIndex}
                direction={direction}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;