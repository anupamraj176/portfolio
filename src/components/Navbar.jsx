import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

const navItems = [
  { label: "About", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Set up intersection observer to highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
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

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none">
      <header
        ref={navRef}
        role="banner"
        className="pointer-events-auto flex items-center justify-between px-6 py-2 bg-[#2a2a2a]/80 backdrop-blur-md rounded-full shadow-lg border-2 border-white/10"
        style={{
          boxShadow: "4px 6px 0px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.05)",
          borderBottomRightRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      >
        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8 text-xl">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`transition-colors duration-300 relative group px-2 py-1 ${
                    activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {item.label}
                  {/* Handwritten underline effect */}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-[#d97d4d] rounded-full" 
                          style={{ transform: "rotate(-2deg)" }} />
                  )}
                </a>
              </li>
            ))}
            
            <li>
               <a 
                href="https://www.linkedin.com/in/anupam-raj-88833134b/"
                target="_blank"
                rel="noreferrer"
                className="ml-4 px-4 py-1 text-[#d97d4d] border-2 border-[#d97d4d] rounded-full hover:bg-[#d97d4d] hover:text-white transition-all transform hover:scale-105 inline-block"
                style={{
                  borderRadius: "24px",
                }}
              >
                Connect
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Menu */}
        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          className="absolute top-16 right-0 bg-[#2a2a2a] flex-col items-center p-6 gap-4 rounded-2xl border-2 border-white/10 md:hidden z-40"
          style={{
            display: "none",
            boxShadow: "4px 6px 0px rgba(0,0,0,0.4)",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`text-xl font-semibold transition-all w-full text-center py-2 ${
                activeSection === item.id ? 'text-[#d97d4d]' : 'text-white/80'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="https://www.linkedin.com/in/anupam-raj-88833134b/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 px-6 py-2 text-[#d97d4d] border-2 border-[#d97d4d] rounded-full"
            style={{ borderRadius: "24px" }}
          >
            Connect
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;