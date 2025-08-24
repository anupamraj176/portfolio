// import React from "react";
import { icons } from "../icons/TechIcons";
// import ribbon from '../assets/ribbon.png';

export const Tech = () => {
  return (

    <div id="About" className="w-full px-[12%] py-10 bg-emerald-100 relative">
      {/* <div className="w-full flex items-center justify-center">
               <img src={ribbon} alt="Ribbon"  className=""/>
      </div> */}
      <div className="flex flex-col md:flex-row items-center gap-20 mt-20">
        {/* Left Column - Text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-snug text-red-500">
            <span className="text-7xl md:text-8xl">M</span>
            e and <br />
            My Tech Stack
          </h1>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
            Hi Everyone, My name is{" "}
            <span className="font-semibold text-emerald-600">Anupam Raj</span>.
            I am currently a 3rd year Computer Science and Engineering student
            at
            <span className="font-semibold"> IIIT Bhagalpur</span>. I have a
            strong passion for full stack web development and enjoy building
            scalable web applications and crafting seamless user experiences.
          </p>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-4">
            I actively work on personal projects and contribute to open-source
            to sharpen my problem-solving and coding skills. My current focus is
            on modern technologies like React, Next.js, Node.js, Express, and
            MongoDB, while also building a strong foundation in Data Structures
            & Algorithms to grow as a software engineer.
          </p>
        </div>

        {/* Right Column - Icons */}
        <div className="w-full md:w-1/2 relative flex flex-wrap justify-center gap-10">
          {icons.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-[100px] h-[100px] justify-center transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] shadow-lg rounded-2xl p-4 hover:scale-105"
            >
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                {tech.icon}
              </div>
              <p className="mt-2 text-gray-700 text-sm font-semibold text-center">
                {tech.name}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
