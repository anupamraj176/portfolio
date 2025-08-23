import React from "react";
import { ReactIcon } from '../icons/icon';

export const Tech = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <h1>Me and My Tech Stack</h1>
        <p>
          I'm a third-year Computer Science student at IIIT Bhagalpur with a
          strong passion for full stack development. I enjoy building scalable
          web applications and crafting seamless user experiences using modern
          technologies like React, Node.js, Express, and MongoDB. Alongside my
          academic learning, I actively work on personal projects and contribute
          to open-source to sharpen my problem-solving and coding skills. I have
          hands-on experience with frontend frameworks such as React, Next.js,
          and Tailwind CSS, as well as backend development with Node.js and
          Express. I’m also familiar with version control (Git/GitHub), cloud
          deployment platforms (Vercel, Netlify), and database management
          (MongoDB, MySQL). With a strong foundation in Data Structures &
          Algorithms and a keen interest in exploring new technologies, I aspire
          to grow as a software engineer and contribute to impactful projects.
        </p>
      </div>
      
      <div>
        <ReactIcon color="black"/>
      </div>
      
    </div>
  );
};

// expor Tech;
