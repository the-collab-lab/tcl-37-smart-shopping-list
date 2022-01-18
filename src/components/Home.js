import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  };

  useEffect(() => {
    if (token) navigate('/list');
  }, [token, navigate]);

  return <button onClick={() => generateToken()}>Generate Token</button>;
};

export default Home;
