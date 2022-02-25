import React from 'react';
import { List } from '../components/List/List';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';

export const ListView = ({ token }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <PageWrapper>
      {token ? (
        <List token={token} />
      ) : (
        <button style={{ marginTop: '2em' }} onClick={handleClick}>
          Go back to Home
        </button>
      )}
    </PageWrapper>
  );
};
