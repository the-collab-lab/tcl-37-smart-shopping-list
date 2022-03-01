import React from 'react';
import { List } from '../components/List/List';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import Navigation from '../components/Navigation/Navigation';
import { PageTitle } from '../components/PageTitle/PageTitle';

export const ListView = ({ token, setToken }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <PageWrapper navbar={<Navigation setToken={setToken} token={token} />}>
      <PageTitle>Shopping List</PageTitle>
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
