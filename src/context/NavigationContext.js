import React, { createContext, useContext, useState, useCallback } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);

  const navigateTo = useCallback((sectionId) => {
    if (isTransitioning || sectionId === currentSection) return;
    
    setIsTransitioning(true);
    setPendingSection(sectionId);
  }, [isTransitioning, currentSection]);

  // Called when stairs fully cover the screen - change content now
  const switchSection = useCallback(() => {
    if (pendingSection) {
      setCurrentSection(pendingSection);
    }
  }, [pendingSection]);

  // Called when transition animation is complete
  const completeTransition = useCallback(() => {
    setPendingSection(null);
    setIsTransitioning(false);
  }, []);

  const value = {
    currentSection,
    isTransitioning,
    pendingSection,
    navigateTo,
    switchSection,
    completeTransition,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
