import React from 'react';

const AddItemForm = ({ handleChange, handleSubmit, inputs }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3 htmlFor="options">Item Name:</h3>
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
          <label htmlFor="soon">
            <input
              defaultChecked
              type="radio"
              value="7"
              id="soon"
              name="days"
              onChange={handleChange}
            />
            Soon
          </label>
          <label htmlFor="kind-soon">
            <input
              type="radio"
              value="14"
              id="kind-soon"
              name="days"
              onChange={handleChange}
            />
            Kind of Soon
          </label>

          <label htmlFor="not-soon">
            <input
              type="radio"
              value="30"
              id="not-soon"
              name="days"
              onChange={handleChange}
            />
            Not Soon
          </label>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
