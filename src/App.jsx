import React from "react";
import { NavigationProvider } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Header } from './components/HeroSection';
import ProjectSlider from './components/ProjectSlider';
import { Contact } from './components/Contact';
import { AnimatedCursor, ParticlesBackground } from './components/animations';
import DrawingCanvas from './components/DrawingCanvas';

function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen text-white relative">
        {/* Animated Custom Cursor */}
        <AnimatedCursor />
        
        {/* Floating Particles Background (acts like chalk dust) */}
        <ParticlesBackground count={20} />
        
        {/* Interactive Chalk Canvas Overlay */}
        <DrawingCanvas />
        
        <Navbar />
        
        <main className="flex flex-col w-full relative pt-24" role="main">
          <section id="home" className="min-h-screen w-full flex items-center justify-center relative">
            <Header />
          </section>
          
          <section id="projects" className="w-full relative">
            <ProjectSlider />
          </section>
          
          <section id="contact" className="min-h-screen w-full flex items-center justify-center relative">
            <Contact />
          </section>
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;