import React from 'react';
import './footer.css';
import { RouteLink } from '../RouteLink';

export const Footer = () => {
  return (
    <footer>
      <RouteLink to="/list">List</RouteLink>
      <RouteLink to="/add">Add Item</RouteLink>
    </footer>
  );
};
