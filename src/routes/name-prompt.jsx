import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function NamePrompt() {
  const [inputName, setInputName] = useState('');
  const { setUserName } = useUser(); // Get the setUserName function
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setUserName(inputName); // This updates the context and triggers local storage update
      navigate('/home'); // Navigate to the home route
    }
  };

  return (
    <div className="name-prompt-container">
      <h1>What's your name?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
