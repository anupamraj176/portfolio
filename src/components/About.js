import React from "react";
import portfolioImg from '../assets/portfolio.jpg'
import { infoList, toolsData } from '../assets/assets'   // ✅ import your infoList
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export const About = () => {
  return (
    <div id="About" className="w-full px-[12%] py-10 scroll-mt-20 bg-emerald-100">
      <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
      <h2 className="text-center text-5xl font-Ovo">About Me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        {/* Profile Image */}

      <CardContainer className="inter-var shadow-lg">
        <CardBody
          className="bg-[#2c693420] w-auto sm:w-[30rem] h-full rounded-3xl p-4 ">
          <CardItem translateZ="100" className="w-full">
            <img src={portfolioImg} alt="My Portfolio" className="w-full rounded-3xl shadow-black" />
          </CardItem>
        </CardBody>
      </CardContainer>

        {/* Text Section */}
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-sans-serif text-gray-700">
            I'm a third-year Computer Science student at IIIT Bhagalpur with a strong passion for full stack development. Over the past few years, I’ve worked on projects that bridge the gap between intuitive frontends and efficient backends, giving me a solid grasp of the MERN stack and modern web technologies.
    
            Beyond coding, I enjoy solving real-world problems by applying data structures, algorithms, and clean software design principles. My focus is on building scalable, user-centric applications while continuously sharpening my problem-solving and collaboration skills.

            I believe in learning by building, and every project I take on is an opportunity to grow, explore new technologies, and contribute meaningfully to the developer community.
          </p>

          {/* Info List */}
          <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
            {infoList.map(({icon,iconDark,title,description},index) => (

            <li key={index} className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[#fcf4ff]
                                       hover:-translate-y-1 duration-500 '>
                <img src={icon} alt={title} className='w-7 mt-3'/>
                <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                <p className='text-gray-600 text-sm'>{description}</p>
            </li>
              
            ))}
          </ul>
          <h4 className='my-6 text-gray-700 font-Ovo'>Tools I use</h4>
          <ul className='flex items-center gap-3 sm:gap-5 '>
            {toolsData.map((tool,index)=>(
              <li key={index} className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer'>
                <img src={tool} alt="Tool" className="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
