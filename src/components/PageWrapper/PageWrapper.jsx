import React from 'react';
import './pagewrapper.css';

export const PageWrapper = ({ children }) => {
  return (
    <div className="green-bg">
      <div className="wrapper">{children}</div>
    </div>
  );
};
