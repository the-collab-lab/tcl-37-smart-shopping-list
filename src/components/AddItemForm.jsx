import React from 'react';
import { OrangeButton } from './index';
import './Buttons/Buttons.css';
import { Input } from './Input/Input';

const AddItemForm = ({ handleChange, handleSubmit, inputs, clearInput }) => {
  return (
    <div className="input-item">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Item Name:</h3>
          <Input
            required={true}
            name="item"
            id="name"
            placeholder="item"
            value={inputs.item || ''}
            onChange={handleChange}
            onClick={clearInput}
          />
        </div>
        <div className="how-soon-div">
          <h3>How soon will you buy this again?</h3>
          <div className="soon-buttons">
            <input
              type="radio"
              value={7}
              id="soon"
              name="days"
              onChange={handleChange}
              defaultChecked
            />
            <label id="soon" htmlFor="soon">
              Soon
            </label>

            <input
              type="radio"
              value={14}
              id="kind-soon"
              name="days"
              onChange={handleChange}
            />
            <label id="kind-soon" htmlFor="kind-soon">
              Kind of Soon
            </label>

            <input
              type="radio"
              value={30}
              id="not-soon"
              name="days"
              onChange={handleChange}
            />
            <label id="not-soon" htmlFor="not-soon">
              Not Soon
            </label>
          </div>
        </div>
        <OrangeButton>Add Item</OrangeButton>
      </form>
    </div>
  );
};

export default AddItemForm;
