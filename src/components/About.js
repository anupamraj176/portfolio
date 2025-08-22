import React from "react";
import portfolioImg from "../assets/portfolio.jpg";
import { infoList } from "../assets/assets";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const SkillBar = ({ name, level }) => {
  return (
    <div className="w-full bg-emerald-100  rounded-lg mb-4">
      <p className="font-semibold ">{name}</p>
      <div className="relative w-full h-2 bg-emerald-500 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-emerald-700 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${level}%` }}
        >
          <div className="w-5 h-5 border-2  border-emerald-700 bg-emerald-50 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export const About = () => {
  const skills = [
    { name: "ReactJS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 89 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Mongo DB", level: 93 },
    { name: "Express JS", level: 87 },
  ];

  return (
    <div
      id="About"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-emerald-100"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
      <h2 className="text-center text-5xl font-Ovo">About Me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        {/* Profile Image */}
        <div className="flex flex-col">
          <div>
            <CardContainer className="inter-var shadow-lg">
              <CardBody className="bg-[#2c693420] w-auto sm:w-[30rem] h-full rounded-3xl p-4 ">
                <CardItem translateZ="100" className="w-full">
                  <img
                    src={portfolioImg}
                    alt="My Portfolio"
                    className="w-full rounded-3xl shadow-black"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          <div className="flex text-emerald-500 gap-8 justify-center h-[100px] items-center ">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagramSquare
                className="text-4xl text-emerald-500 transition-all duration-300 
               hover:scale-110 hover:text-emerald-700 
               hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              />
            </a>

            <a href="https://github.com/anupamraj176" target="_blank" rel="noreferrer">
              <FaGithub
                className="text-4xl text-emerald-500 transition-all duration-300 
               hover:scale-110 hover:text-emerald-700 
               hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter
                className="text-4xl text-emerald-500 transition-all duration-300 
               hover:scale-110 hover:text-emerald-700 
               hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin
                className="text-4xl text-emerald-500 transition-all duration-300 
               hover:scale-110 hover:text-emerald-700 
               hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
              />
            </a>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-sans-serif text-gray-700">
            I'm a third-year Computer Science student at IIIT Bhagalpur with a
            strong passion for full stack development...
          </p>

          {/* Info List */}
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, title, description }, index) => (
              <li
                key={index}
                className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 "
              >
                <img src={icon} alt={title} className="w-7 mt-3" />
                <h3 className="my-4 font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </li>
            ))}
          </ul>

          {/* Tech Stack Section */}
          <div className="flex flex-col mt-5">
            <h1 className="text-3xl font-bold text-emerald-800 mb-6">
              Tech Stack & Proficiencies
            </h1>

            {skills.map((skill, index) => (
              <SkillBar key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
