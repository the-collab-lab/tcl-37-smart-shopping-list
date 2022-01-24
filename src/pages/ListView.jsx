import React from 'react';
import { List } from '../components/List';
import { Home } from '../components/Home';
import { useNavigate } from 'react-router-dom';

export const ListView = ({ token }) => {
  console.log('token: ', token.token);
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
    console.log('---->');
  }

  return (
    <div>
      {token ? (
        <List token={token} />
      ) : (
        <button onClick={handleClick}>Go back to Home</button>
      )}
    </div>
  );
};
