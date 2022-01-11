import React from 'react';
import { Link } from 'react-router-dom';

export const ListView = () => {
  return (
    <div>
      <h1>List View</h1>
      <div>
        <Link to="/">List</Link>
        <Link to="/add">Add New Item</Link>
      </div>
    </div>
  );
};
