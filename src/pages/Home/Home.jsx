import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '@the-collab-lab/shopping-list-utils';
import './Home.css';
import HeroImage from '../../../src/assets/smartshopperr_logo.png';
import { JoinList, OrangeButton } from '../../components';

const Home = (props) => {
  let navigate = useNavigate();
  const { token, setToken } = props;

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    setToken(token);
    if (token) navigate('/list');
  };

  return (
    <div className="home">
      <header className="hero">
        <img src={HeroImage} alt="Logo" />
      </header>
      <main>
        <h1>Welcome to your Smart Shopping List!</h1>
        {token ? (
          <OrangeButton>
            <Link to="/list">View your shopping list</Link>
          </OrangeButton>
        ) : (
          <OrangeButton onClick={() => generateToken()}>
            Create a new list
          </OrangeButton>
        )}
        <JoinList setToken={setToken} />
      </main>
    </div>
  );
};

export default Home;
