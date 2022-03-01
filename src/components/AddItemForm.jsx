import React from 'react';
import './Buttons/Buttons.css';

const AddItemForm = ({ handleChange, handleSubmit, inputs }) => {
  return (
    <div className="input-item">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Item Name:</h3>
          <input
            type="text"
            required
            id="name"
            name="item"
            value={inputs.item || ''}
            onChange={handleChange}
          />
        </div>
        <div className="how-soon-div">
          <h3>How soon will you buy this again?</h3>
          <div className="soon-buttons">
            <label className="soon-box" htmlFor="soon">
              <input
                className="soon"
                defaultChecked
                type="radio"
                value={7}
                id="soon"
                name="days"
                onChange={handleChange}
              />
              Soon
            </label>
            <label className="kind-of-soon-box" htmlFor="kind-soon">
              <input
                className="kind-soon"
                type="radio"
                value={14}
                id="kind-soon"
                name="days"
                onChange={handleChange}
              />
              Kind of Soon
            </label>

            <label className="not-soon-box" htmlFor="not-soon">
              <input
                className="not-soon"
                type="radio"
                value={30}
                id="not-soon"
                name="days"
                onChange={handleChange}
              />
              Not Soon
            </label>
          </div>
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
