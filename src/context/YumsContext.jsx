import React, { createContext, useContext, useEffect, useState } from 'react';
import { getYums } from '../yums'; 

const YumsContext = createContext(); 

export const useYums = () => useContext(YumsContext);

export function YumsProvider({ children }) {
  const [yums, setYums] = useState([]); 

  useEffect(() => {
    async function fetchYums() {
      const fetchedYums = await getYums(); 
      setYums(fetchedYums); 
    }

    fetchYums(); 
  }, []);

  const updateSidebar = async () => {
    try {
      const updatedYums = await getYums(); 
      setYums(updatedYums); 
    } catch (error) {
      console.error("Failed to update sidebar:", error); 
    }
  };

  return (
    <YumsContext.Provider value={{ yums, setYums, updateSidebar }}>
      {children}
    </YumsContext.Provider>
  );
}
