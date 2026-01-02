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
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    title: "Grid layout Generator",
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
];

// Project Card Component - Phone style card
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
      className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[480px] sm:h-[540px] md:h-[580px]"
      style={{ perspective: '1000px' }}
    >
      {/* Phone-like card container */}
      <div className="relative w-full h-full rounded-[40px] bg-gradient-to-b from-[#92140c] via-[#a82010] to-[#111d4a] p-[2px] shadow-2xl shadow-[#92140c]/30">
        
        {/* Inner card */}
        <div className="relative w-full h-full rounded-[38px] bg-gradient-to-b from-[#92140c] via-[#a82010] to-[#111d4a] overflow-hidden">
          
          {/* Subtle inner glow at top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#ffcf99]/20 to-transparent"></div>

          {/* Corner decoration - top left */}
          <div className="absolute top-8 left-8 w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ffcf99]/50"></div>
            <div className="absolute top-0 left-0 h-full w-[2px] bg-[#ffcf99]/50"></div>
          </div>

          {/* Number indicator - top right */}
          <div className="absolute top-7 right-7 w-11 h-11 rounded-full border-2 border-[#ffcf99]/40 flex items-center justify-center backdrop-blur-sm">
            <span className="text-[#ffcf99] font-semibold text-base">0{index + 1}</span>
          </div>

          {/* Main Content - Centered */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-10">
            {/* Project Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#fff8f0] leading-tight mb-3">
              {project.title}
            </h3>
            
            {/* Category */}
            <p className="text-[#ffcf99]/60 text-xs tracking-[0.25em] uppercase mb-8">
              {project.category}
            </p>

            {/* Tech stack icons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((Icon, i) => (
                <div
                  key={i}
                  className="w-11 h-11 rounded-xl bg-[#fff8f0]/10 backdrop-blur-sm flex items-center justify-center text-[#ffcf99] hover:bg-[#ffcf99]/25 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full max-w-[220px] px-6 py-4 bg-[#fff8f0]/10 backdrop-blur-md border border-[#ffcf99]/30 rounded-2xl text-[#fff8f0] font-medium hover:bg-[#ffcf99]/20 transition-all duration-300 group"
            >
              <span className="text-sm tracking-wide">
                EXPLORE<br />PROJECT
              </span>
              <ArrowRight className="w-5 h-5 text-[#ffcf99] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#ffcf99]/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Reflection/Shadow beneath */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-[#92140c]/30 blur-2xl rounded-full"></div>
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
      // Title animations
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
    <div 
      ref={containerRef}
      id="projects"
      className="w-full min-h-screen bg-[#1e1e24] relative py-20 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#92140c]/15 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left side - Text content */}
          <div className="space-y-6">
            <p 
              ref={subtitleRef}
              className="text-[#fff8f0]/60 text-sm tracking-[0.3em] uppercase"
            >
              EXPLORE PROJECTS
            </p>
            
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#fff8f0] leading-tight"
            >
              Check Out My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92140c] to-[#ffcf99]">
                Work.
              </span>
            </h1>

            <p className="text-[#fff8f0]/70 text-lg max-w-md">
              Browse through my recent projects showcasing my skills in web development and design.
            </p>

            {/* Navigation controls */}
            <div className="flex items-center gap-4 pt-8">
              <button 
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-[#ffcf99]/30 flex items-center justify-center text-[#fff8f0]/60 hover:text-[#ffcf99] hover:border-[#ffcf99]/60 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-[#ffcf99]/30 flex items-center justify-center text-[#fff8f0]/60 hover:text-[#ffcf99] hover:border-[#ffcf99]/60 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Progress indicators */}
              <div className="flex gap-2 ml-4">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProject(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'w-8 bg-gradient-to-r from-[#92140c] to-[#ffcf99]' 
                        : 'w-2 bg-[#fff8f0]/20 hover:bg-[#ffcf99]/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project counter */}
            <div className="flex items-baseline gap-2 pt-4">
              <span className="text-5xl font-bold text-[#fff8f0]">0{activeIndex + 1}</span>
              <span className="text-[#fff8f0]/40 text-xl">/</span>
              <span className="text-[#fff8f0]/40 text-xl">0{projects.length}</span>
            </div>
          </div>

          {/* Right side - Project Card */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[550px]">
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
    </div>
  );
};

export default ProjectSlider;