import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt,
  FaDatabase
} from "react-icons/fa";
import { 
  SiTailwindcss, 
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiRedux,
  SiFigma
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const TechItem = ({ icon: Icon, name, color, delay, floatAmount }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    // Floating animation
    gsap.to(itemRef.current, {
      y: `+=${floatAmount}`,
      rotation: `+=${floatAmount / 2}`,
      duration: 3 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay
    });
  }, [delay, floatAmount]);

  return (
    <div 
      ref={itemRef}
      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#2a2a2a]/60 backdrop-blur-sm border border-white/10 rounded-2xl transition-colors hover:bg-white/10"
      style={{
        boxShadow: "4px 4px 10px rgba(0,0,0,0.3)"
      }}
    >
      <Icon size={40} color={color} className="mb-2 drop-shadow-md" />
      <span className="text-white/80 font-bold text-sm text-center font-mono">{name}</span>
    </div>
  );
};

export const TechStack = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const frontendRef = useRef(null);
  const backendRef = useRef(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        rotation: -2,
        duration: 0.8,
        ease: "back.out(1.5)"
      })
      .from(frontendRef.current.children, {
        y: 20,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4")
      .from(backendRef.current.children, {
        y: 20,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
      .from(toolsRef.current.children, {
        y: 20,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="w-full min-h-screen relative flex flex-col items-center justify-center pt-24 pb-16 px-6"
    >
      
      {/* Background Hand-drawn Grid (adds to the chalkboard feel) */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
        backgroundSize: `40px 40px`
      }}></div>

      <div ref={titleRef} className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white inline-block relative">
          My Arsenal
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] h-1.5 bg-[#f1c40f] rounded-full opacity-80" style={{ transform: "rotate(-1deg)" }}></span>
        </h2>
        <p className="text-white/60 mt-6 text-xl max-w-2xl mx-auto font-mono">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10">
        
        {/* Chalk Arrows connecting clusters (visible on md+) */}
        <div className="hidden md:block absolute top-1/3 left-1/4 w-32 h-32 pointer-events-none opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M90,10 Q50,40 10,90" />
            <path d="M10,90 L20,70 M10,90 L30,95" />
          </svg>
        </div>
        <div className="hidden md:block absolute top-1/3 right-1/4 w-32 h-32 pointer-events-none opacity-40 scale-x-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M90,10 Q50,40 10,90" />
            <path d="M10,90 L20,70 M10,90 L30,95" />
          </svg>
        </div>

        {/* Frontend Cluster */}
        <div className="flex flex-col items-center">
          <div className="mb-6 relative">
            <h3 className="text-2xl font-bold text-[#d97d4d] font-mono border-2 border-white/20 px-6 py-2 rounded-[20px] shadow-lg bg-[#2a2a2a]/40" style={{ transform: "rotate(-2deg)" }}>
              Frontend
            </h3>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/50" style={{ transform: "rotate(3deg)" }}></div>
          </div>
          <div ref={frontendRef} className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[250px]">
            <TechItem icon={FaReact} name="React" color="#61DAFB" delay={0.1} floatAmount={8} />
            <TechItem icon={SiNextdotjs} name="Next.js" color="#FFFFFF" delay={0.3} floatAmount={6} />
            <TechItem icon={SiJavascript} name="JavaScript" color="#F7DF1E" delay={0.5} floatAmount={10} />
            <TechItem icon={SiTypescript} name="TypeScript" color="#3178C6" delay={0.2} floatAmount={7} />
            <TechItem icon={SiTailwindcss} name="Tailwind" color="#06B6D4" delay={0.4} floatAmount={9} />
            <TechItem icon={SiRedux} name="Redux" color="#764ABC" delay={0.6} floatAmount={5} />
          </div>
        </div>

        {/* Backend Cluster */}
        <div className="flex flex-col items-center md:mt-16">
          <div className="mb-6 relative">
            <h3 className="text-2xl font-bold text-[#3498db] font-mono border-2 border-white/20 px-6 py-2 rounded-[20px] shadow-lg bg-[#2a2a2a]/40" style={{ transform: "rotate(1deg)" }}>
              Backend
            </h3>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/50" style={{ transform: "rotate(-2deg)" }}></div>
          </div>
          <div ref={backendRef} className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[250px]">
            <TechItem icon={FaNodeJs} name="Node.js" color="#339933" delay={0.2} floatAmount={8} />
            <TechItem icon={SiExpress} name="Express" color="#FFFFFF" delay={0.4} floatAmount={6} />
            <TechItem icon={SiMongodb} name="MongoDB" color="#47A248" delay={0.6} floatAmount={10} />
            <TechItem icon={FaDatabase} name="SQL" color="#336791" delay={0.3} floatAmount={7} />
          </div>
        </div>

        {/* Tools Cluster */}
        <div className="flex flex-col items-center">
          <div className="mb-6 relative">
            <h3 className="text-2xl font-bold text-[#2ecc71] font-mono border-2 border-white/20 px-6 py-2 rounded-[20px] shadow-lg bg-[#2a2a2a]/40" style={{ transform: "rotate(-1deg)" }}>
              Tools
            </h3>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/50" style={{ transform: "rotate(1deg)" }}></div>
          </div>
          <div ref={toolsRef} className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[250px]">
            <TechItem icon={FaGitAlt} name="Git" color="#F05032" delay={0.5} floatAmount={8} />
            <TechItem icon={SiFigma} name="Figma" color="#F24E1E" delay={0.1} floatAmount={6} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
