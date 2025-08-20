import React from "react";
import Image from "../assets/portfolio.jpg";
import HandIcon from "../assets/hand-icon.png";
import { FaArrowRight,FaFileDownload  } from "react-icons/fa";
import { FancyButton } from "./fancyButton";

export const Header = () => {
  return (
    <div className="w-full  text-center mx-auto h-screen flex flex-col items-center justify-center gap-6 bg-emerald-100">
      {/* Profile Image */}
      <div className="border-[10px] rounded-full border-emerald-500 shadow-2xl">
      <div className="overflow-hidden rounded-full hover:scale-110  transition-all duration-100 ease-in-out border-[5px] border-emerald-700">
        <img
          src={Image}
          alt=""
          className="w-40 h-40 object-contain translate-y-4 scale-150 shadow-md"
        />
      </div>
</div>
      {/* Intro */}
      <h3 className="flex items-center justify-center gap-2 text-lg md:text-xl font-medium mb-2">
        Hi! I'm Anupam Raj
        <img src={HandIcon} alt="" className="w-6" />
      </h3>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-Ovo leading-tight">
        Fullstack Web Developer <br/> from India.
         {/* Crafting Modern & Responsive Web
        Experiences */}
      </h1>

      {/* Description */}
      <p className="max-w-2xl mx-auto font-Ovo text-gray-600 text-base sm:text-lg">
        I am a B.Tech CSE student passionate about building modern, responsive,
        and user-friendly web applications. Currently learning Full Stack
        Development with React, Node.js, and Tailwind CSS.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <FancyButton 
          href="#Contact"
          text={"Contact"}
          Icon={FaArrowRight}
        />
          {/* <img src={rightArrow} alt="" className="w-5" /> */}

        <FancyButton
          link="https://www.google.com"
          text={"My Resume"}
          Icon={FaFileDownload}
        />
        {/* <img src={downloadIcon} alt="" className="w-4" /> */}
      </div>
    </div>
  );
};

export default Header;
