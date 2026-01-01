import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaFileDownload, FaInstagramSquare, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import portfolioImg from "../assets/portfolio.jpg";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FancyButton } from "./fancyButton";

// Social links data
const socialLinks = [
  { Icon: FaInstagramSquare, url: "https://instagram.com/anupamraj176" },
  { Icon: FaGithub, url: "https://github.com/anupamraj176" },
  { Icon: FaTwitter, url: "https://twitter.com/anupamraj176" },
  { Icon: FaLinkedin, url: "https://linkedin.com/in/anupamraj176" },
];

export const Header = () => {
  const typedEl = useRef(null);
  const containerRef = useRef(null);
  const imageCardRef = useRef(null);
  const socialsRef = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(imageCardRef.current, { scale: 0.8, opacity: 0, y: 50, duration: 1 })
        .from(socialsRef.current, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.5")
        .from(contentRef.current.children, { x: 30, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.8");

      // Simple Typing Logic
      const roles = ["Fullstack Web Developer", "Web Developer", "Backend Developer", "Coder"];
      let roleIdx = 0, charIdx = 0, isDeleting = false;

      const type = () => {
        const current = roles[roleIdx];
        charIdx += isDeleting ? -1 : 1;
        if (typedEl.current) typedEl.current.textContent = current.substring(0, charIdx);

        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIdx === current.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 500; }
        setTimeout(type, speed);
      };
      type();
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="home" ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 sm:px-10 lg:px-16 bg-[#1e1e24] py-10">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center flex-1">
        <div ref={imageCardRef}>
          <CardContainer>
            <CardBody className="bg-[#111d4a]/40 backdrop-blur-md border border-[#ffcf99]/20 w-[280px] sm:w-[350px] md:w-[400px] rounded-3xl p-4 shadow-2xl">
              <CardItem translateZ="100" className="w-full">
                <img
                  src={portfolioImg}
                  alt="Portfolio"
                  className="w-full rounded-2xl object-cover shadow-2xl"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Socials */}
        <div className="flex text-[#fff8f0]/60 gap-6 mt-8">
          {socialLinks.map(({ Icon, url }, i) => (
            <a 
              key={i} 
              ref={el => socialsRef.current[i] = el} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#ffcf99] hover:scale-110 transition-all duration-300"
            >
              <Icon className="text-3xl sm:text-4xl" />
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div ref={contentRef} className="flex flex-col justify-center flex-1 items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
        <h3 className="text-[#fff8f0]/80 text-xl">Hi! I'm Anupam Raj 👋</h3>
        <h1 className="text-4xl md:text-6xl font-bold min-h-[80px]">
          <span ref={typedEl} className="bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent"></span>
        </h1>
        <p className="text-[#fff8f0]/70 max-w-lg text-lg mt-4">
          I am a B.Tech CSE student passionate about building modern, responsive, and user-friendly web applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <FancyButton href="mailto:anupamraj176@gmail.com" text="Contact" Icon={FaArrowRight} />
          <FancyButton link="https://google.com" text="My Resume" Icon={FaFileDownload} />
        </div>
      </div>
    </div>
  );
};

export default Header;