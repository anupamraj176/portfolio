import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaFileDownload, FaInstagramSquare, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import portfolioImg from "../assets/profile.jpeg";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FancyButton } from "./fancyButton";
import { MagneticButton } from "./animations";

// Social links data
const socialLinks = [
  { Icon: FaInstagramSquare, url: "https://instagram.com/anupamraj176", name: "Instagram" },
  { Icon: FaGithub, url: "https://github.com/anupamraj176", name: "GitHub" },
  { Icon: FaTwitter, url: "https://twitter.com/anupamraj176", name: "Twitter" },
  { Icon: FaLinkedin, url: "https://linkedin.com/in/anupamraj176", name: "LinkedIn" },
];

export const Header = () => {
  const typedEl = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const imageCardRef = useRef(null);
  const socialsRef = useRef([]);
  const contentRef = useRef(null);
  const greetingRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Enhanced entrance animation with 3D effect
      tl.from(imageCardRef.current, { 
        scale: 0.5, 
        opacity: 0, 
        y: 100, 
        rotationY: 45,
        duration: 1.2,
        ease: "back.out(1.7)"
      })
      // Floating animation for the image card
      .to(imageCardRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, "+=0")
      
      // Social icons with bounce effect
      .from(socialsRef.current, { 
        y: 40, 
        autoAlpha: 0, 
        scale: 0,
        stagger: 0.1, 
        duration: 0.6,
        ease: "back.out(2)",
        clearProps: "all" 
      }, "-=2")
      
      // Greeting text slide in with rotation
      .from(greetingRef.current, { 
        x: -100, 
        opacity: 0, 
        rotationX: 45,
        duration: 0.8,
        ease: "power4.out"
      }, "-=1.8")
      
      // Description fade in
      .from(descRef.current, { 
        y: 30, 
        opacity: 0, 
        duration: 0.6 
      }, "-=0.5")
      
      // Buttons pop in
      .from(buttonsRef.current?.children || [], { 
        scale: 0.8, 
        opacity: 0, 
        stagger: 0.15, 
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Cursor blinking animation
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });

      // Typing animation with cursor
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

      // Magnetic hover effect for social icons
      socialsRef.current.forEach((icon) => {
        if (!icon) return;
        
        const handleMouseMove = (e) => {
          const rect = icon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(icon, {
            x: x * 0.3,
            y: y * 0.3,
            rotation: x * 0.1,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        };
        
        icon.addEventListener('mousemove', handleMouseMove);
        icon.addEventListener('mouseleave', handleMouseLeave);
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="home" ref={containerRef} className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-10 lg:px-16 bg-[#1e1e24] py-10 overflow-hidden relative">
      
      {/* Animated background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#92140c]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ffcf99]/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center flex-1 max-w-full relative z-10">
        <div ref={imageCardRef} className="w-full flex justify-center">
          <CardContainer>
            <CardBody className="bg-[#111d4a]/40 backdrop-blur-md border border-[#ffcf99]/20 w-[220px] sm:w-[300px] md:w-[350px] lg:w-[400px] rounded-3xl p-3 sm:p-4 shadow-2xl hover:shadow-[0_0_50px_rgba(255,207,153,0.3)] transition-shadow duration-500">
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

        {/* Socials with magnetic hover effect */}
        <nav aria-label="Social media links" className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-6 relative z-50">
          {socialLinks.map(({ Icon, url, name }, i) => (
            <MagneticButton key={i} strength={0.4}>
              <a 
                ref={el => socialsRef.current[i] = el} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#ffcf99] hover:text-white transition-colors duration-300 p-2 block"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <Icon className="text-3xl sm:text-4xl hover:drop-shadow-[0_0_10px_rgba(255,207,153,0.8)] transition-all duration-300" />
              </a>
            </MagneticButton>
          ))}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div ref={contentRef} className="flex flex-col justify-center flex-1 items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0 px-2 relative z-10">
        <h3 ref={greetingRef} className="text-[#fff8f0]/80 text-base sm:text-lg md:text-xl">Hi! I'm Anupam Raj 👋</h3>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold min-h-[50px] sm:min-h-[70px] md:min-h-[80px]">
          <span ref={typedEl} className="bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent"></span>
          <span ref={cursorRef} className="text-[#ffcf99] ml-1">|</span>
        </h1>
        <p ref={descRef} className="text-[#fff8f0]/70 max-w-lg text-sm sm:text-base md:text-lg mt-2 sm:mt-4">
          I am a B.Tech CSE student passionate about building modern, responsive, and user-friendly web applications.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8">
          <MagneticButton strength={0.2}>
            <FancyButton href="mailto:anupamraj176@gmail.com" text="Contact" Icon={FaArrowRight} />
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <FancyButton link="https://google.com" text="My Resume" Icon={FaFileDownload} />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default Header;