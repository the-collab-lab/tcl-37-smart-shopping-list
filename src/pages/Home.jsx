import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import '../Home.css';

import { JoinList } from '../components/JoinList';
import OrangeButton from '../components/Buttons/OrangeButton';

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
    <div className="home">
      <h1>Welcome to your Smart Shopping List!</h1>
      {token ? (
        <button>
          <Link to="/list">View your shopping list</Link>
        </button>
      ) : (
        <>
          <OrangeButton onClick={() => generateToken()}>
            Create new List
          </OrangeButton>
        </>
      )}
      <JoinList setToken={setToken} />
    </div>
  );
};
