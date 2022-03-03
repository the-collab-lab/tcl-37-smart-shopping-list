import React from 'react';
import { OrangeButton, Input } from '../index';
import '../Buttons/Buttons.css';
import './additemform.css';

const AddItemForm = ({ handleChange, handleSubmit, inputs, clearInput }) => {
  return (
    <form className="add-item" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="item">Item Name:</label>
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
        <label htmlFor="days">How soon will you buy this again?</label>
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
  );
};

export default AddItemForm;
