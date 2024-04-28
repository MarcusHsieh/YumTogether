import React, { createContext, useContext, useState, useEffect } from 'react';

const DCIContext = createContext(null);

export const useDCI = () => {
  const context = useContext(DCIContext);
  if (!context) {
    throw new Error('useDCI must be used within a DCIProvider');
  }
  return context;
};

export const DCIProvider = ({ children }) => {
  const [dciValue, setDCIValue] = useState(() => {
    const storedDCI = localStorage.getItem('dciValue');
    return storedDCI ? parseFloat(storedDCI) : null; 
  });

 
  useEffect(() => {
    if (dciValue !== null) {
      localStorage.setItem('dciValue', dciValue.toString());
    }
  }, [dciValue]); 

  return (
    <DCIContext.Provider value={{ dciValue, setDCIValue }}>
      {children}
    </DCIContext.Provider>
  );
};
