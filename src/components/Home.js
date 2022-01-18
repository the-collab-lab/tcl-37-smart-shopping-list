import {
  getToken,
  words,
  calculateEstimate,
} from '@the-collab-lab/shopping-list-utils';

const generateToken = () => {
  const token = getToken();
  console.log(token);
  localStorage.token = token;
};

const Home = () => {
  return <button onClick={() => generateToken()}>Generate Token</button>;
};

export default Home;
