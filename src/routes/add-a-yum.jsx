import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate } from 'react-router-dom';
import { createYum } from '../yums';
import "./style.css"
import yumCat from "../assets/yumCat-2.png"

export default function AddAYum() {
  const [yumName, setYumName] = useState(''); // Yum name
  const [restaurantName, setRestaurantName] = useState(''); // Restaurant name
  const [calorieCount, setCalorieCount] = useState(''); // Calorie count
  const [rating, setRating] = useState(0); // Star rating
  const [date, setDate] = useState(''); // Date
  const [notes, setNotes] = useState(''); // Additional notes
  const [pictures, setPictures] = useState([]); // File input for pictures

  const navigate = useNavigate(); // Navigation function

  // File change handler
  const handleFileChange = (event) => {
    setPictures(Array.from(event.target.files)); // Store selected files
  };

  // Rating change handler
  const handleRating = (rate) => {
    setRating(rate);
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior

    const yumData = {
      yumName,
      restaurantName,
      calorieCount: parseInt(calorieCount, 10), // Ensure it's a number
      rating,
      date,
      notes,
      pictures,
    };

    await createYum(yumData); // Create a new Yum entry
    navigate("/home"); // Redirect to home after submission
  };

  return (
    <div className="add-a-yum-container">
      <h1>Add a Yum!</h1>

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
            placeholder="Enter Calorie Count"
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
          <label htmlFor="pictures">Add Pictures:</label>
          <input
            type="file"
            id="pictures"
            multiple // Allow multiple file selection
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            placeholder="Enter Additional Notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        

        <div>
          <label htmlFor="rating">Rating:</label>
          <Rating
            onClick={handleRating}
            initialValue={rating}
            iconsCount={10} // Use 10-star rating
            size={25} // Icon size in pixels
            transition // Smooth hover transition
            allowFraction // Allow fractional star ratings
          />
        </div>

        <button type="submit">Add Yum!</button>
      </form>
      <img src= {yumCat} alt="yumCat-2" />
    </div>
  );
}
