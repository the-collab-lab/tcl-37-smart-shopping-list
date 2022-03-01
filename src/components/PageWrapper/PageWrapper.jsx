import React from 'react';
import './page-wrapper.css';

const PageWrapper = ({ children, navbar }) => {
  return (
    <div className="green-bg">
      {navbar}
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default PageWrapper;
