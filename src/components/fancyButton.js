import React, { useRef } from "react";
import gsap from "gsap";

export const FancyButton = ({ link, href, text, Icon }) => {
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const Component = link || href ? "a" : "button";
  const linkProps = link ? { href: link, target: "_blank", rel: "noopener noreferrer" } : href ? { href } : {};

  return (
    <Component {...linkProps}>
      <button
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          relative px-4 py-2 text-sm 
          sm:px-6 sm:py-3 sm:text-base md:text-lg 
          rounded-[15px] font-extrabold 
          text-[#fff8f0] hover:text-[#1e1e24]
          bg-gradient-to-r from-[#92140c] to-[#ffcf99]
          hover:shadow-[0_8px_20px_rgba(146,20,12,0.5)] 
          transition-all duration-300 overflow-hidden group
        "
      >
        <span className="relative z-10 flex gap-2 items-center">
          {text}
          {Icon && <Icon ref={iconRef} />}
        </span>
        <span
          className="
            absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-[#ffcf99] to-[#fff8f0] rounded-[15px] 
            shadow-[0_6px_16px_rgba(146,20,12,0.4)]
            transition-all duration-300 group-hover:w-full
          "
        ></span>
      </button>
    </Component>
  );
};

export default FancyButton;