import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDCI } from '../context/DCIContext';
import { calculateDailyCaloricIntake } from "../utils/dciCalculator";
import "./dci.css"; 

export default function DciCalc() {
  const { dciValue, setDCIValue } = useDCI(); 
  const navigate = useNavigate(); 

  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "M", 
    activityMultiplier: 1.25, 
  });

  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setFormData({ ...formData, activityMultiplier: value });
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        return formData.age > 0;
      case 1:
        return formData.weight > 0;
      case 2:
        return formData.height > 0;
      default:
        return true; 
    }
  };

  // page slider handler
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        const { weight, height, age, gender, activityMultiplier } = formData;
        const dciValue = calculateDailyCaloricIntake(
          parseFloat(weight),
          parseFloat(height),
          parseFloat(age),
          gender,
          activityMultiplier
        );

        setDCIValue(dciValue);
        navigate("/home/dci-result", { state: { dciValue: dciValue.toFixed(2) } });
      } catch (error) {
        console.error("Calculation error:", error.message);
      }
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Enter Your Age</h2>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>
        );
      case 1:
        return (
          <div>
            <h2>Enter Your Weight (kg)</h2>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Enter Your Height (cm)</h2>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Select Your Gender</h2>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>How Active Are You?</h2>
            <input
              type="range"
              min="1.0"
              max="1.5"
              step="0.01"
              name="activityMultiplier"
              value={formData.activityMultiplier}
              onChange={handleSliderChange}
            />
            <p>Activity Level: {formData.activityMultiplier.toFixed(1)}</p>
          </div>
        );
      default:
        return <p>Invalid step</p>;
    }
  };

  // check if already have DCI val
  if (dciValue) {
    
    return (
      <div className="dci-calc">
        <h1>You already have a DCI calculated</h1>
        <p>Would you like to recalculate it?</p>
        <button onClick={() => {
          setStep(0)
          setDCIValue(null)
        }}>Recalculate DCI</button>
        <button onClick={() => navigate("/home/dci-result")}>Go to DCI Result</button>
      </div>
    );
  }

  return (
    <div className="dci-calc">
      <h1>Update Your Daily Caloric Intake</h1>
      {getStepContent()} 
      <button onClick={handleNext}>
        {step < 4 ? "Next" : "Calculate"}
      </button>
    </div>
  );
}
