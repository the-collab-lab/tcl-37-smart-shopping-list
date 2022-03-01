import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, PageWrapper, Navigation, PageTitle } from '../components';

const ListView = ({ token, setToken }) => {
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

export default ListView;
