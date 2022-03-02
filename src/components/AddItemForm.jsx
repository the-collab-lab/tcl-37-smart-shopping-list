import React from 'react';
import OrangeButton from './Buttons/OrangeButton';
import { Input } from './Input/Input';

const AddItemForm = ({ handleChange, handleSubmit, inputs }) => {
  return (
    <div>
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
          />
        </div>
        <h3>How soon will you buy this again?</h3>
        <div>
          <label htmlFor="soon">
            <input
              defaultChecked
              type="radio"
              value={7}
              id="soon"
              name="days"
              onChange={handleChange}
            />
            Soon
          </label>
          <label htmlFor="kind-soon">
            <input
              type="radio"
              value={14}
              id="kind-soon"
              name="days"
              onChange={handleChange}
            />
            Kind of Soon
          </label>

          <label htmlFor="not-soon">
            <input
              type="radio"
              value={30}
              id="not-soon"
              name="days"
              onChange={handleChange}
            />
            Not Soon
          </label>
        </div>
        <OrangeButton>Add Item</OrangeButton>
      </form>
    </div>
  );
};

export default AddItemForm;
