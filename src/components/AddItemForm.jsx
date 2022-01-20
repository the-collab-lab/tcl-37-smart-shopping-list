import React from 'react';

const AddItemForm = ({ handleChange, handleSubmit, inputs }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            defaultChecked
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
          <label htmlFor="not-soon">Not Soon</label>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
