// hold data in localStorage (username) so it persists

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || ''; 
  });

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]); 

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
