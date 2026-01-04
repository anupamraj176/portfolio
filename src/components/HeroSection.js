import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaFileDownload, FaInstagramSquare, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import portfolioImg from "../assets/portfolio.jpg";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FancyButton } from "./fancyButton";

// Social links data
const socialLinks = [
  { Icon: FaInstagramSquare, url: "https://instagram.com/anupamraj176", name: "Instagram" },
  { Icon: FaGithub, url: "https://github.com/anupamraj176", name: "GitHub" },
  { Icon: FaTwitter, url: "https://twitter.com/anupamraj176", name: "Twitter" },
  { Icon: FaLinkedin, url: "https://linkedin.com/in/anupamraj176", name: "LinkedIn" },
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
        // Added autoAlpha and clearProps to ensure they don't disappear after animating
        .from(socialsRef.current, { 
            y: 20, 
            autoAlpha: 0, 
            stagger: 0.1, 
            duration: 0.5, 
            clearProps: "all" 
        }, "-=0.5")
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
    <div id="home" ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-10 lg:px-16 bg-[#1e1e24] py-10 overflow-hidden">
      
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center flex-1 max-w-full">
        <div ref={imageCardRef} className="w-full flex justify-center">
          <CardContainer>
            <CardBody className="bg-[#111d4a]/40 backdrop-blur-md border border-[#ffcf99]/20 w-[220px] sm:w-[300px] md:w-[350px] lg:w-[400px] rounded-3xl p-3 sm:p-4 shadow-2xl">
              <CardItem translateZ="100" className="w-full">
                <img
                  src={portfolioImg}
                  alt="Anupam Raj - Fullstack Web Developer"
                  className="w-full rounded-2xl object-cover shadow-2xl"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Socials - Fixed visibility with z-index and explicit colors */}
        <nav aria-label="Social media links" className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-6 relative z-50">
          {socialLinks.map(({ Icon, url, name }, i) => (
            <a 
              key={i} 
              ref={el => socialsRef.current[i] = el} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#ffcf99] hover:text-white hover:scale-110 transition-all duration-300 p-2"
              style={{ opacity: 1, visibility: 'visible' }} // Force initial visibility for browser
            >
              <Icon className="text-3xl sm:text-4xl" />
            </a>
          ))}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div ref={contentRef} className="flex flex-col justify-center flex-1 items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0 px-2">
        <h3 className="text-[#fff8f0]/80 text-base sm:text-lg md:text-xl">Hi! I'm Anupam Raj 👋</h3>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold min-h-[50px] sm:min-h-[70px] md:min-h-[80px]">
          <span ref={typedEl} className="bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent"></span>
        </h1>
        <p className="text-[#fff8f0]/70 max-w-lg text-sm sm:text-base md:text-lg mt-2 sm:mt-4">
          I am a B.Tech CSE student passionate about building modern, responsive, and user-friendly web applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8">
          <FancyButton href="mailto:anupamraj176@gmail.com" text="Contact" Icon={FaArrowRight} />
          <FancyButton link="https://google.com" text="My Resume" Icon={FaFileDownload} />
        </div>
      </div>
    </div>
  );
};

export default Header;