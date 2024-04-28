// startup screen

import React from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import "./style.css";

export default function StartupScreen() {
  const navigate = useNavigate(); // Get navigate function
  
  return (
    <div className="startup-screen">  {/* Relative position ensures correct absolute positioning for children */}
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="yumcat" alt="Yumcat" src="https://c.animaapp.com/zOWCZenY/img/yumcat-1-1@2x.png" />
          <img className="group" alt="Group" src="https://c.animaapp.com/zOWCZenY/img/group-1@2x.png" />
          <div className="text-wrapper">YumTogether</div>
          <button 
            className="button"
            onClick={() => navigate("/create-user")} // navigation
          >
            <div className="div">Let’s get started</div>
          </button>
        </div>
      </div>
    </div>
  );
}