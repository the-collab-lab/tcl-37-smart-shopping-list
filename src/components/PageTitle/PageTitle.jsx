import React from 'react';
import Graphic from '../../assets/smartshopperr_logo.png';
import './page-title.css';

export const PageTitle = ({ children }) => {
  return (
    <div>
      <div className="mobile-bg"></div>
      <h1>{children}</h1>
      <div className="img-container">
        <img src={Graphic} alt="cartoon of person shopping" />
      </div>
    </div>
  );
};
