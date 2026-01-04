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

  const completeTransition = useCallback(() => {
    if (pendingSection) {
      setCurrentSection(pendingSection);
      setPendingSection(null);
    }
    setIsTransitioning(false);
  }, [pendingSection]);

  const value = {
    currentSection,
    isTransitioning,
    pendingSection,
    navigateTo,
    completeTransition,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
