import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Header } from './HeroSection';
import { Tech } from './Tech';
import ProjectSlider from './ProjectSlider';
import { Contact } from './Contact';

const sections = {
  home: Header,
  about: Tech,
  projects: ProjectSlider,
  contact: Contact,
};

const SectionRenderer = () => {
  const { currentSection } = useNavigation();
  
  const SectionComponent = sections[currentSection] || Header;
  
  return (
    <main role="main" aria-label={`${currentSection} section`}>
      <SectionComponent />
    </main>
  );
};

export default SectionRenderer;
