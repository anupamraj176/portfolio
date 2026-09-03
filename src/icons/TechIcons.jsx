import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaGithub, 
} from "react-icons/fa";

import {
  SiNextdotjs,SiTailwindcss,
  SiExpress, SiMongodb, SiVercel, 
} from "react-icons/si";

export const icons = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={60} /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={60} /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" size={60} /> },
  { name: "React.js", icon: <FaReact className="text-cyan-400" size={60} /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-600" size={60} /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-black" size={60} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" size={50} /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-700" size={60} /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" size={60} /> },
  { name: "GitHub", icon: <FaGithub className="text-gray-900" size={60} /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" size={60} /> },
  { name: "Vercel", icon: <SiVercel className="text-black" size={60} /> },
];
