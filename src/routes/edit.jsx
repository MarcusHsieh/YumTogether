import React, { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { createYum, updateYum } from '../yums';
import yumCat from '../assets/yumCat-2.png';
import "./style.css";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData)
  await updateYum(params.yumId, updates);
  return redirect(`/home/yums/${params.yumId}`);
}

export default function EditYum() {
  const navigate = useNavigate();
  const loaderData = useLoaderData(); // Load the existing "Yum" data
  const yum = loaderData?.yum; // Access the data, if available

  // State management: if it's editing, use existing data; otherwise, use default values
  const [yumName, setYumName] = useState(yum?.yumName || '');
  const [restaurantName, setRestaurantName] = useState(yum?.restaurantName || '');
  const [calorieCount, setCalorieCount] = useState(yum?.calorieCount || '');
  const [rating, setRating] = useState(yum?.rating || 0);
  const [date, setDate] = useState(yum?.date || '');
  const [notes, setNotes] = useState(yum?.notes || '');
  const [pictures, setPictures] = useState([]); // File input for pictures

  const handleFileChange = (event) => {
    setPictures(Array.from(event.target.files)); // Store selected files
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior

    const yumData = {
      yumName,
      restaurantName,
      calorieCount: parseInt(calorieCount, 10),
      rating,
      date,
      notes,
      pictures,
    };

    if (yum) {
      // If editing an existing Yum
      await updateYum(yum.id, yumData); // Update the existing Yum
      navigate(`/home/yums/${yum.id}`); // Redirect to the updated Yum's page
    } else {
      // If creating a new Yum
      const newYum = await createYum(yumData); // Create a new Yum entry
      navigate(`/home/yums/${newYum.id}`); // Redirect to the new Yum's page
    }
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
            multiple
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
            iconsCount={10}
            size={25}
            transition
            allowFraction
          />
        </div>

        <button type="submit">Save</button>
        
        <button
          type="button"
          onClick={() => navigate(-1)} // Cancel button navigates back
        >
          Cancel
        </button>
      </form>
      <img src={yumCat} alt="YumCat-2" />
    </div>
  );
}
