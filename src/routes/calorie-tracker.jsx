
import React, { useState, useEffect } from 'react';
import { useYums } from '../context/YumsContext';
import { Link } from 'react-router-dom';
import { calculateDailyCaloricIntake } from '../utils/dciCalculator';
import { useDCI } from '../context/DCIContext';
import YumCat from "../assets/yumCat-2.png";
import "./dci.css"


export default function CalorieTracker() {
  const { yums } = useYums(); 
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); 
  const [caloricSum, setCaloricSum] = useState(0); 
  const { dciValue } = useDCI();

  useEffect(() => {
    const sum = yums
      .filter((yum) => yum.date === date)
      .reduce((total, yum) => total + (yum.calories || 0), 0);

    setCaloricSum(sum);
  }, [yums, date]); 

  return (
    <div className="calorie-tracker-container">
      <h1>Calorie Tracker</h1>

      <div className="date-picker">
        <label htmlFor="tracker-date">Date:</label>
        <input
          type="date"
          id="tracker-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="caloric-summary">
        <img 
            src= {YumCat} 
            alt="Yum Cat" 

        />
        <h2>Caloric Intake</h2>

        {dciValue ? (
          <>
            <p>
              Current Total: {caloricSum} kcal / Maximum DCI: {dciValue} kcal
            </p>
            <div className="caloric-bar">
              <div
                className="caloric-progress"
                style={{ width: `${(caloricSum / dciValue) * 100}%` }}
              ></div>
            </div>
          </>
        ) : (
          <p>
            No DCI calculated. Please <Link to="/home/dci-calc">calculate your DCI</Link> first.
          </p>
        )}
      </div>
    </div>
  );
}
