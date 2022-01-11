import React from 'react';
import { Link } from 'react-router-dom';

export const AddItemView = () => {
  return (
    <div>
      <h1>Add Item View</h1>
      <div className="footer">
        <Link to="/" className="bold">
          List
        </Link>
        <Link to="/add" className="bold">
          Add New Item
        </Link>
      </div>
    </div>
  );
};
