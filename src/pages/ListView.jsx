import React from 'react';
import { List } from '../components/List';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ListView = ({ token }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <div>
      <Link to="/">Home</Link>
      {token ? (
        <List token={token} />
      ) : (
        <button onClick={handleClick}>Go back to Home</button>
      )}
    </div>
  );
};
