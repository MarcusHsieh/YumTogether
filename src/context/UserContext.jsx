// hold data in localStorage (username) so it persists

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Use local storage to persist the username
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    // Read the username from local storage when the component mounts
    return localStorage.getItem('userName') || ''; // Default to empty string if not set
  });

  // Whenever the username changes, save it to local storage
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]); // This effect runs every time userName changes

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
