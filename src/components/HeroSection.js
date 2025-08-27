import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import portfolioImg from "../assets/portfolio.jpg";
import HandIcon from "../assets/hand-icon.png";
import {
  FaArrowRight,
  FaFileDownload,
  FaInstagramSquare,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FancyButton } from "./fancyButton";

export const Header = () => {
  // Ref for Typed.js
  const typedEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        "Fullstack Web Developer",
        "Web Developer",
        "Backend Developer",
        "Coder",
      ],
      typeSpeed: 50,
      backSpeed: 80,
      backDelay: 1000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-stretch h-screen px-6 sm:px-10 lg:px-16 bg-emerald-100">
      {/* LEFT SIDE - Profile Image + Socials */}
      <div className="flex flex-col items-center pt-6 sm:pt-10 flex-1 h-full">
        <CardContainer className="inter-var shadow-lg">
          <CardBody className="bg-[#2c693420] w-auto sm:w-[22rem] md:w-[28rem] rounded-3xl h-full p-4">
            <CardItem translateZ="100" className="w-full">
              <img
                src={portfolioImg}
                alt="My Portfolio"
                className="w-full rounded-3xl shadow-black object-cover"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        {/* Social Links */}
        <div className="flex text-emerald-500 gap-6 sm:gap-8 justify-center h-[80px] sm:h-[100px] items-center">
          <a
            href="https://www.instagram.com/anupam__rajj/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagramSquare className="text-3xl sm:text-4xl transition-all duration-300 hover:scale-110 hover:text-emerald-700 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </a>
          <a
            href="https://github.com/anupamraj176"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="text-3xl sm:text-4xl transition-all duration-300 hover:scale-110 hover:text-emerald-700 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </a>
          <a
            href="https://x.com/secret_johnwick"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter className="text-3xl sm:text-4xl transition-all duration-300 hover:scale-110 hover:text-emerald-700 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </a>
          <a
            href="https://www.linkedin.com/in/anupam-raj-88833134b/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="text-3xl sm:text-4xl transition-all duration-300 hover:scale-110 hover:text-emerald-700 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE - Intro + Buttons */}
      <div className="flex flex-col justify-center flex-1 h-full items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5">
        <h3 className="flex items-center justify-center lg:justify-start gap-2 text-base sm:text-lg md:text-xl font-medium">
          Hi! I'm Anupam Raj
          <img src={HandIcon} alt="" className="w-5 sm:w-6" />
        </h3>

        {/* Typed.js */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-Ovo leading-snug text-emerald-700">
          <span ref={typedEl} className="text-pink-900 font-bold"></span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-Ovo mt-3 sm:mt-4 max-w-md md:max-w-xl">
          I am a B.Tech CSE student passionate about building modern,
          responsive, and user-friendly web applications. Currently learning
          Full Stack Development with React, Node.js, and Tailwind CSS.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5 sm:mt-6">
          <FancyButton
            href="mailto:anupamraj176@gmail.com"
            text="Contact"
            Icon={FaArrowRight}
          />
          <FancyButton
            link="https://www.google.com"
            text="My Resume"
            Icon={FaFileDownload}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
