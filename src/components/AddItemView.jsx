import React from 'react';
import { Link } from 'react-router-dom';

export const AddItemView = () => {
  return (
    <div>
      <h1>Add Item View</h1>
      <div>
        <Link to="/">List</Link>
        <Link to="/add">Add New Item</Link>
      </div>
    </div>
  );
};
