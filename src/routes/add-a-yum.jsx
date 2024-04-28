import React, { useState } from 'react';

export default function AddAYum() {
  const [mealType, setMealType] = useState('Meal'); // Default selection
  const [yumName, setYumName] = useState(''); // Default empty input

  return (
    <div className="add-a-yum-container">
      <h1>Add a Yum!</h1>

      <form>
        <div>
          <label htmlFor="meal-type">Meal Type:</label>
          <select
            id="meal-type"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="Meal">Meal</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

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

        <button type="submit">Add Yum!</button>
      </form>
    </div>
  );
}