import React, { useState } from 'react';

export const AddItemView = () => {
  const [inputs, setInputs] = useState({});

  console.log(inputs);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1>Smart Shopping List</h1>
      <form>
        <div>
          <label htmlFor="name">Item name</label>
          <input
            type="text"
            required
            id="name"
            name="item"
            value={inputs.item || ''}
            onChange={handleChange}
          />
        </div>
        <h3 htmlFor="options">How soon will you buy this again?</h3>
        <div>
          <input
            type="radio"
            value="7"
            id="soon"
            name="days"
            onChange={handleChange}
          />
          <label htmlFor="soon">Soon</label>

          <input
            type="radio"
            value="14"
            id="kind-soon"
            name="days"
            onChange={handleChange}
          />
          <label htmlFor="kind-soon">Kind of Soon</label>

          <input
            type="radio"
            value="30"
            id="not-soon"
            name="days"
            onChange={handleChange}
          />
          <label htmlFor="not-soon">Soon</label>

          <button type="submit">Add Item</button>
        </div>
      </form>
    </div>
  );
};
