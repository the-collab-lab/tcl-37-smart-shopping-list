import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ListView = () => {
  const [list, setList] = useState(false);

  const handleClick = () => {
    setList(true);
  };

  return (
    <div>
      <h1>List View</h1>
      <div className="footer">
        <Link
          to="/"
          className={list ? 'bold' : null}
          onClick={() => handleClick()}
        >
          List
        </Link>
        <Link
          to="/add"
          className={list ? null : 'bold'}
          onClick={() => handleClick()}
        >
          Add New Item
        </Link>
      </div>
    </div>
  );
};
