import React from "react";
import { useLocation } from "react-router-dom";
import { useDCI } from '../context/DCIContext';
import "./dci.css"; 
import yumCat from "../assets/yumCat-3.png"

export default function DciResult() {
  const { dciValue } = useDCI();
  const location = useLocation();
  const { state } = location;


  if (!dciValue) {
    return (
      <div>
        <h1>Error</h1>
        <p>DCI value not found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="dci-result">
      <h1>Your Calculated Daily Caloric Intake Is:</h1>
      <img
        src= {yumCat}
        alt="yumCat"
      />
      <h2>{dciValue} kcal/day</h2>
    </div>
  );
}
