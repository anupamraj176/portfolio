import React from 'react'
import { FancyButton } from "../components/fancyButton";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-20 px-16 bg-[#0e8c62aa] backdrop-blur-md sticky top-0 z-50 text-white shadow-lg shadow-emerald-600 rounded-b-lg">
      
      <div className="flex items-center">
        <span className="text-xl font-semibold tracking-wide">Anupam Raj</span>
      </div>

      <ul className="flex items-center gap-12 text-[18px]  font-medium">
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Home</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">About Me</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Project</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Contact</li>
      </ul>


      <FancyButton text={"Connect With Me"}/>
    </div>
  )
}
