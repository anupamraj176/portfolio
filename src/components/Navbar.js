import React, { useState } from "react";
import { FancyButton } from "../components/fancyButton";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about" },
  { label: "Project", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between h-20 px-6 sm:px-10 md:px-16 bg-[#0e8c62aa] backdrop-blur-md sticky top-0 z-50 text-white shadow-lg shadow-emerald-600 rounded-b-lg">
      <div className="flex items-center">
        <span
          onClick={() => scrollTo("home")}
          className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide cursor-pointer"
        >
          Anupam Raj
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-[16px] lg:text-[18px] font-medium">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="hover:text-blue-100 transition-colors duration-75 cursor-pointer"
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <a
          href="https://www.linkedin.com/in/anupam-raj-88833134b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FancyButton text={"Connect With Me"} />
        </a>
      </div>

      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0e8c62ee] backdrop-blur-md shadow-lg rounded-b-lg md:hidden flex flex-col items-center gap-6 py-6 text-lg font-medium">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-blue-100 cursor-pointer"
            >
              {item.label}
            </li>
          ))}
          <a
            href="https://www.linkedin.com/in/anupam-raj-88833134b/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FancyButton text={"Connect With Me"} />
          </a>
        </div>
      )}
    </div>
  );
};
