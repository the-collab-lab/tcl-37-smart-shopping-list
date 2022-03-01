import React from 'react';
import { Footer } from '../Footer/Footer';
import './page-wrapper.css';

export const PageWrapper = ({ children, navbar }) => {
  return (
    <div className="green-bg">
      {navbar}
      <div className="wrapper">{children}</div>
      <Footer />
    </div>
  );
};
