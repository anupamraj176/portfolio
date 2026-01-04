import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Header } from './HeroSection';
import { Tech } from './Tech';
import ProjectSlider from './ProjectSlider';
import { Contact } from './Contact';
import { Divider } from './Divider';

const sections = {
  home: () => (
    <>
      <Header />
      <Divider />
    </>
  ),
  about: () => (
    <>
      <Tech />
      <Divider />
    </>
  ),
  projects: () => (
    <>
      <ProjectSlider />
      <Divider />
    </>
  ),
  contact: () => (
    <>
      <Contact />
      <Divider />
    </>
  ),
};

const SectionRenderer = () => {
  const { currentSection } = useNavigation();
  
  const SectionComponent = sections[currentSection];
  
  if (!SectionComponent) {
    return sections.home();
  }
  
  return <SectionComponent />;
};

export default SectionRenderer;
