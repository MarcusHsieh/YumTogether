import React, { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { createYum, updateYum } from '../yums';
import { Rating } from 'react-simple-star-rating';
import "./style.css";
import yumCat from '../assets/yumCat-2.png';

export default function EditYum() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const yum = loaderData?.yum;

  const [yumName, setYumName] = useState(yum?.yumName || '');
  const [restaurantName, setRestaurantName] = useState(yum?.restaurantName || '');
  const [calorieCount, setCalorieCount] = useState(yum?.calorieCount || '');
  const [rating, setRating] = useState(yum?.rating || 0);
  const [date, setDate] = useState(yum?.date || '');
  const [notes, setNotes] = useState(yum?.notes || '');
  const [picture, setPicture] = useState(yum?.picture || ''); 

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0]; 
  
      if (!file) {
        throw new Error("No file selected");
      }
  
      const formData = new FormData();
      formData.append("picture", file); 
  
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("File upload failed");
      }
  
      const data = await response.json(); 
      const uploadedFilename = data.file.filename; 
  
      setPicture(uploadedFilename); 
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  
  

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const yumData = {
      yumName,
      restaurantName,
      calorieCount: parseInt(calorieCount, 10),
      rating,
      date,
      notes,
      picture, 
    };

    let newYum;

    if (yum) {
      await updateYum(yum.id, yumData); 
      newYum = yum; 
    } else {
      newYum = await createYum(yumData);
    }

    navigate(`/home/yums/${newYum.id}`);
  };

  return (
    <div className="edit-yum-container">
      <h1>{yum ? 'Edit Yum' : 'Add a Yum'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="yum-name">Yum Name:</label>
          <input
            type="text"
            id="yum-name"
            placeholder="Enter Yum Name"
            value={yumName}
            onChange={(e) => setYumName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="restaurant-name">Restaurant Name:</label>
          <input
            type="text"
            id="restaurant-name"
            placeholder="Enter Restaurant Name (optional)"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="calorie-count">Calorie Count:</label>
          <input
            type="number"
            id="calorie-count"
            value={calorieCount}
            onChange={(e) => setCalorieCount(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="picture">Add Picture:</label>
          <input
            type="file"
            id="picture"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label htmlFor="rating">Rating:</label>
          <Rating
            onClick={handleRating}
            initialValue={rating}
            iconsCount={10}
            size={25}
            transition
          />
        </div>

        <button type="submit">Save</button>
        
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
      <img src={yumCat} alt="yumCat-2" /> 
    </div>
  );
}
