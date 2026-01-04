import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { FancyButton } from "./fancyButton";
import { useNavigation } from "../context/NavigationContext";

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
  // const buttonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  const { navigateTo, currentSection, isTransitioning } = useNavigation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.7)",
      });

      gsap.from(navItemsRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        onComplete: () => {
          if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  const handleNavClick = (id) => {
    if (!isTransitioning) navigateTo(id);
    setIsOpen(false);
  };

  return (
    <header
      ref={navRef}
      role="banner"
      // Added w-full and box-sizing fix
      className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 md:px-10 bg-[#1e1e24]/90 backdrop-blur-xl sticky top-0 z-50 text-[#fff8f0] border-b border-[#ffcf99]/10 w-full box-border"
    >
      {/* Container to keep logo in view */}
      <div className="flex items-center flex-1">
        <button
          ref={logoRef}
          onClick={() => handleNavClick("home")}
          // Reduced text size on mobile to prevent clipping
          className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-[#92140c] to-[#ffcf99] bg-clip-text text-transparent whitespace-nowrap"
        >
          Anupam Raj
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav aria-label="Main navigation" className="hidden md:block">
        <ul className="flex items-center gap-6 lg:gap-10 font-medium">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <button
                ref={(el) => (navItemsRef.current[index] = el)}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-300 relative py-2 ${
                  currentSection === item.id ? 'text-[#ffcf99]' : 'text-[#fff8f0]/80'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Button */}
      <div className="hidden md:block ml-6">
        <FancyButton 
          link="https://www.linkedin.com/in/anupam-raj-88833134b/" 
          text="Connect With Me" 
        />
      </div>

      {/* Mobile Hamburger - Added explicit width/height for touch target */}
      <button
        className="md:hidden flex items-center justify-center p-2 text-[#fff8f0] z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        id="mobile-menu"
        ref={mobileMenuRef}
        style={{ display: "none" }}
        className="absolute top-[64px] sm:top-[80px] left-0 w-full bg-[#1e1e24] flex-col items-center py-10 gap-6 border-b border-[#ffcf99]/10 md:hidden z-40 shadow-2xl"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-xl font-semibold transition-all ${
              currentSection === item.id ? 'text-[#ffcf99]' : 'text-[#fff8f0]/90'
            }`}
          >
            {item.label}
          </button>
        ))}
        {/* Button inside mobile menu */}
        <div className="mt-4 px-6 w-full flex justify-center">
          <FancyButton 
            link="https://www.linkedin.com/in/anupam-raj-88833134b/" 
            text="Connect With Me" 
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;