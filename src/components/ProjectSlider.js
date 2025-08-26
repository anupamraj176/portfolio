import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import videoGallery from "../assets/Video-Gallery.jpg";
import {
  SiTailwindcss,
  SiRedux,
  SiNextdotjs,
  SiVercel,
  SiJavascript,
} from "react-icons/si";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsLink45Deg,
} from "react-icons/bs";
import { FancyButton } from "./fancyButton";

// --- Project Data ---
const projects = [
  {
    id: 1,
    title: "Tint & Orange",
    desc: "A sleek, modern landing page for a car modification company specializing in high-quality paint protection films and automotive vinyl wraps.",
    stack: [SiNextdotjs, SiTailwindcss, SiRedux, SiVercel, FaReact],
    github: "#",
    live: "#",
    image: videoGallery,
  },
  {
    id: 2,
    title: "Portfolio Website",
    desc: "A personal portfolio built with Next.js and Framer Motion to showcase my projects and skills with a focus on fluid animations.",
    stack: [FaReact, SiNextdotjs, SiTailwindcss, FaGithub],
    github: "#",
    live: "#",
    image: "/images/projects/project2.jpg",
  },
  {
    id: 3,
    title: "E-Commerce App",
    desc: "A full-stack shopping application featuring a dynamic shopping cart, user authentication, and a streamlined checkout process.",
    stack: [FaReact, FaNodeJs, SiRedux, SiTailwindcss, SiJavascript],
    github: "#",
    live: "#",
    image: "/images/projects/project3.jpg",
  },
];

// --- Animation Variants ---
const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.8,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  }),
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const contentItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

// --- The Main Component ---
export const ProjectSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="w-full min-h-screen bg-emerald-100 flex flex-col items-center justify-center relative px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6 sm:mb-10 z-10 text-center">
        My Projects
      </h1>

      {/* Container */}
      <div className="relative w-full max-w-7xl flex items-center justify-center">
        {/* Prev */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 text-3xl sm:text-5xl text-emerald-500/70 hover:text-emerald-400 transition"
          aria-label="Previous Project"
        >
          <BsArrowLeftCircleFill />
        </button>

        {/* Card */}
        <div className="relative w-full max-w-5xl h-[400px] sm:h-[500px] md:h-[550px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={projects[current].id}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 bg-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/40"
            >
              {/* Image */}
              <div className="w-full h-48 sm:h-full">
                <img
                  src={projects[current].image}
                  alt={projects[current].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <motion.div
                variants={contentContainerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 sm:p-6 md:p-8 flex flex-col justify-center text-white text-center md:text-left"
              >
                <motion.h2 variants={contentItemVariants} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-emerald-400">
                  {projects[current].title}
                </motion.h2>
                <motion.p variants={contentItemVariants} className="mb-4 sm:mb-6 text-slate-300 text-sm sm:text-base md:text-lg">
                  {projects[current].desc}
                </motion.p>

                <motion.div variants={contentItemVariants} className="flex flex-wrap gap-3 sm:gap-4 text-2xl sm:text-3xl mb-6 sm:mb-8 justify-center md:justify-start">
                  {projects[current].stack.map((Icon, index) => (
                    <div
                      key={index}
                      className="p-2 bg-slate-700/50 rounded-md hover:bg-emerald-500/50 hover:scale-110 transition-all cursor-pointer"
                    >
                      <Icon />
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={contentItemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center md:justify-start">
                  <a href={projects[current].github} target="_blank" rel="noreferrer" aria-label="GitHub repository">
                    <FaGithub className="text-3xl sm:text-4xl text-slate-400 hover:text-emerald-400 transition" />
                  </a>
                  <a href={projects[current].live} target="_blank" rel="noreferrer" aria-label="Live demo">
                    <BsLink45Deg className="text-3xl sm:text-4xl text-slate-400 hover:text-emerald-400 transition" />
                  </a>
                  <FancyButton text="View Case Study" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 text-3xl sm:text-5xl text-emerald-500/70 hover:text-emerald-400 transition"
          aria-label="Next Project"
        >
          <BsArrowRightCircleFill />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
              index === current ? "bg-emerald-400 scale-110 sm:scale-125" : "bg-slate-600"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
