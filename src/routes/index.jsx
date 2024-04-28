import React from 'react';
import { useUser } from '../context/UserContext'; 
import "../index.css"; 

export default function Index() {
  const { userName } = useUser(); 

  return (
    <div className="index-container">
      <h1>Hello {userName}!</h1> 
      <p>What would you like to do?</p> 
      <img src="https://c.animaapp.com/zOWCZenY/img/yumcat-1-1@2x.png" alt="Centered Bottom" />

    </div>
  );
}