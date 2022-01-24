import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '@the-collab-lab/shopping-list-utils';

export const Home = (props) => {
  let navigate = useNavigate();
  const { token, setToken } = props;

  const generateToken = () => {
    const token = getToken();
    localStorage.token = token;
    setToken(token);
    if (token) navigate('/list');
  };

  return (
    <div>
      <h1>Welcome to your Smart Shopping List!</h1>
      {token ? (
        <Link to="/list">View your shopping list</Link>
      ) : (
        <button onClick={() => generateToken()}>Create a new list</button>
      )}
    </div>
  );
};
