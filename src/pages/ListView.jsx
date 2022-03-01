import React from 'react';
import { List, PageWrapper, Navigation, PageTitle } from '../components';

const ListView = ({ token, setToken }) => {
  return (
    <PageWrapper navbar={<Navigation setToken={setToken} token={token} />}>
      <PageTitle>Shopping List</PageTitle>
      {token && <List token={token} />}
    </PageWrapper>
  );
};

export default ListView;
