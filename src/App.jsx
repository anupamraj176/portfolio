import React from "react";
import { NavigationProvider } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import StairTransition from './components/StairTransition';
import SectionRenderer from './components/SectionRenderer';
import { AnimatedCursor, ParticlesBackground } from './components/animations';

function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-[#1e1e24] overflow-hidden relative">
        {/* Animated Custom Cursor */}
        <AnimatedCursor />
        
        {/* Floating Particles Background */}
        <ParticlesBackground count={25} />
        
        <Navbar />
        <StairTransition>
          <SectionRenderer />
        </StairTransition>
      </div>
    </NavigationProvider>
  );
}

export default App;