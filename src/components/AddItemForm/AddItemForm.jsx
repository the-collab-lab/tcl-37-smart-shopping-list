import React from 'react';
import { OrangeButton, Input, RadioButtons } from '../index';
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
          <RadioButtons handleChange={handleChange} />
        </div>
      </div>
      <OrangeButton>Add Item</OrangeButton>
    </form>
  );
};

export default AddItemForm;
