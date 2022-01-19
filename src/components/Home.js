import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';

const Home = () => {
  let navigate = useNavigate();

  const [token, setToken] = useState('');

  const generateToken = () => {
    const token = getToken();
    console.log(token);
    localStorage.token = token;
    setToken(token);
    if (token) navigate('/list');
  };

  useEffect(() => {
    if (localStorage.token) setToken(localStorage.token);
  }, []);

  return (
    <div>
      <h1>Homepage</h1>

      {token ? <Link to="/list">List View</Link> : null}
      {!token ? (
        <button onClick={() => generateToken()}>Create a new list</button>
      ) : null}
    </div>
  );
};

export default Home;
