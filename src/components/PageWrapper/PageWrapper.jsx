import React from 'react';
import './pagewrapper.css';

const PageWrapper = ({ children, navbar }) => {
  return (
    <div className="green-bg">
      {navbar}
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default PageWrapper;
