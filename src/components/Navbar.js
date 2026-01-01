import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { FancyButton } from "./fancyButton";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Project", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar entrance animation
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Logo animation
      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.7)",
      });

      // Nav items stagger animation
      gsap.from(navItemsRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      });

      // Button animation
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          delay: 0.8,
          ease: "back.out(1.7)",
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          {
            opacity: 0,
            y: -20,
            display: "none",
          },
          {
            opacity: 1,
            y: 0,
            display: "flex",
            duration: 0.3,
            ease: "power2.out",
          }
        );

        gsap.from(mobileMenuRef.current.children, {
          x: -30,
          opacity: 0,
          duration: 0.3,
          stagger: 0.08,
          delay: 0.1,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const handleNavHover = (e, isEntering) => {
    gsap.to(e.currentTarget, {
      y: isEntering ? -3 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={navRef}
      className="flex items-center justify-between h-20 px-6 sm:px-10 md:px-16 bg-[#1e1e24]/90 backdrop-blur-xl sticky top-0 z-50 text-[#fff8f0] shadow-2xl shadow-black/20 border-b border-[#ffcf99]/10"
    >
      <div className="flex items-center">
        <span
          ref={logoRef}
          onClick={() => scrollTo("home")}
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight cursor-pointer hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent"
        >
          Anupam Raj
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-[15px] lg:text-[16px] font-medium">
        {navItems.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => (navItemsRef.current[index] = el)}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            className="hover:text-[#ffcf99] transition-colors duration-300 cursor-pointer relative text-[#fff8f0]/80"
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div ref={buttonRef} className="hidden md:block">
        <FancyButton 
          link="https://www.linkedin.com/in/anupam-raj-88833134b/" 
          text="Connect With Me" 
        />
      </div>

      <button
        className="md:hidden p-2 hover:scale-110 transition-transform duration-200 hover:text-[#ffcf99]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        ref={mobileMenuRef}
        style={{ display: "none" }}
        className="absolute top-20 left-0 w-full bg-[#1e1e24]/95 backdrop-blur-xl shadow-2xl border-b border-[#ffcf99]/10 md:hidden flex-col items-center gap-6 py-8 text-lg font-medium"
      >
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="hover:text-[#ffcf99] cursor-pointer list-none hover:scale-105 transition-all duration-200 text-[#fff8f0]/80"
          >
            {item.label}
          </li>
        ))}
        <FancyButton 
          link="https://www.linkedin.com/in/anupam-raj-88833134b/" 
          text="Connect With Me" 
        />
      </div>
    </div>
  );
};

export default Navbar;