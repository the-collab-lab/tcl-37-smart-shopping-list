import React from 'react';
import './page-wrapper.css';

export const PageWrapper = ({ children }) => {
  return (
    <div className="green-bg">
      <div className="wrapper">{children}</div>
    </div>
  );
};
