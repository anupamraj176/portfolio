import React from "react";
import { NavigationProvider } from './context/NavigationContext';
import Navbar from './components/Navbar';
import Header from './components/HeroSection';
import TechStack from './components/TechStack';
import ProjectSlider from './components/ProjectSlider';
import Education from './components/Education';
import Contact from './components/Contact';
import { ParticlesBackground } from './components/animations';
import Doodles from './components/Doodles';
import ClickDust from './components/ClickDust';
import InteractiveMountains from './components/InteractiveMountains';

function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen text-white relative">
        <ClickDust />
        <Doodles />
        
        <Navbar />
        
        <main className="w-full relative pt-24" role="main">
          <section id="home" className="min-h-screen w-full flex items-center justify-center relative">
            <Header />
          </section>
          
          <TechStack />
          
          <ProjectSlider />
          
          <Education />
          
          <Contact />
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;