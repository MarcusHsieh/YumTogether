import React from 'react';
import { useUser } from '../context/UserContext'; 
import "../index.css"; 
import yumCat from "../assets/yumCat-3.png"

export default function Index() {
  const { userName } = useUser(); 

  return (
    <div className="index-container">
      <h1>Hello {userName}!</h1> 
      <p>What would you like to do?</p> 
      <img 
        src= {yumCat} 
        alt="yumCat"
        width="698"
        height="480"
        position="absolute" 
      />

    </div>
  );
}