import React from 'react';
import { List } from '../components/List';
import { useNavigate } from 'react-router-dom';

export const ListView = ({ token }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <div>
      {token ? (
        <List token={token} />
      ) : (
        <button style={{ marginTop: '2em' }} onClick={handleClick}>
          Go back to Home
        </button>
      )}
    </div>
  );
};
