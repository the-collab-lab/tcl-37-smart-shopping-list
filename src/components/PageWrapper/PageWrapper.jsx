import React from 'react';
import { Footer } from '../../components';
import './pagewrapper.css';

const PageWrapper = ({ children, navbar }) => {
  return (
    <div className="green-bg">
      {navbar}
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default PageWrapper;
