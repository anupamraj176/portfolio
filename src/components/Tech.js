import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaGithub,
} from "react-icons/fa";

import {
  SiNextdotjs, SiTailwindcss,
  SiExpress, SiMongodb, SiVercel,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={60} /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={60} /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" size={60} /> },
  { name: "React.js", icon: <FaReact className="text-cyan-400" size={60} /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" size={60} /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" size={60} /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-500" size={55} /> },
  { name: "Express", icon: <SiExpress className="text-gray-300" size={60} /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" size={60} /> },
  { name: "GitHub", icon: <FaGithub className="text-white" size={60} /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" size={60} /> },
  { name: "Vercel", icon: <SiVercel className="text-white" size={60} /> },
];

export const Tech = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const iconsWrapRef = useRef(null);
  const iconsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 🔒 set initial state ONCE
      gsap.set(iconsRef.current, { scale: 0, opacity: 0 });

      gsap.from(titleRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from([para1Ref.current, para2Ref.current], {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: para1Ref.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(iconsRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: iconsWrapRef.current,
          start: "top 80%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (el, enter) => {
    gsap.to(el, {
      y: enter ? -10 : 0,
      rotate: enter ? 5 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-6 sm:px-10 md:px-[12%] py-16 bg-[#1e1e24]"
    >
      <div className="flex flex-col md:flex-row gap-14 items-center">

        {/* LEFT */}
        <div className="md:w-1/2">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent text-7xl">M</span>
            <span className="text-[#fff8f0]">e and</span><br />
            <span className="bg-gradient-to-r from-[#ffcf99] to-[#92140c] bg-clip-text text-transparent">
              My Tech Stack
            </span>
          </h1>

          <p ref={para1Ref} className="text-[#fff8f0]/70 mb-4">
            Hi, I’m <span className="text-[#ffcf99] font-semibold">Anupam Raj</span>,
            a CSE student at IIIT Bhagalpur with a strong interest in full-stack development.
          </p>

          <p ref={para2Ref} className="text-[#fff8f0]/70">
            I work with React, Next.js, Node, MongoDB and focus heavily on
            Data Structures & Algorithms.
          </p>
        </div>

        {/* RIGHT */}
        <div
          ref={iconsWrapRef}
          className="md:w-1/2 flex flex-wrap justify-center gap-8"
        >
          {icons.map((tech, i) => (
            <div
              key={i}
              ref={(el) => (iconsRef.current[i] = el)}
              onMouseEnter={() => handleHover(iconsRef.current[i], true)}
              onMouseLeave={() => handleHover(iconsRef.current[i], false)}
              className="w-[95px] h-[95px] flex flex-col items-center justify-center
                rounded-2xl bg-[#111d4a]/60 border border-[#ffcf99]/20
                shadow-lg hover:shadow-[0_0_30px_rgba(255,207,153,0.6)]
                transition-all cursor-pointer"
            >
              {tech.icon}
              <p className="mt-2 text-xs text-[#fff8f0] font-semibold">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tech;
