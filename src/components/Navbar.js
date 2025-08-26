import React ,{useState} from 'react'
import { FancyButton } from "../components/fancyButton";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

export const Navbar = () => {
 const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between h-20 px-6 sm:px-10 md:px-16 bg-[#0e8c62aa] backdrop-blur-md sticky top-0 z-50 text-white shadow-lg shadow-emerald-600 rounded-b-lg">
      
      {/* Brand */}
      <div className="flex items-center">
        <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">
          Anupam Raj
        </span>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-8 lg:gap-12 text-[16px] lg:text-[18px] font-medium">
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Home</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">About Me</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Project</li>
        <li className="hover:text-blue-100 transition-colors duration-75 cursor-pointer">Contact</li>
      </ul>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <FancyButton text={"Connect With Me"} />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28}/> : <Menu size={28}/> }
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#0e8c62ee] backdrop-blur-md shadow-lg rounded-b-lg md:hidden flex flex-col items-center gap-6 py-6 text-lg font-medium">
          <li className="hover:text-blue-100 cursor-pointer">Home</li>
          <li className="hover:text-blue-100 cursor-pointer">About Me</li>
          <li className="hover:text-blue-100 cursor-pointer">Project</li>
          <li className="hover:text-blue-100 cursor-pointer">Contact</li>
          <FancyButton text={"Connect With Me"} />
        </div>
      )}
    </div>
  )
}
