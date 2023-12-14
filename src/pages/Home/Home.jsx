import { useNavigate } from 'react-router-dom';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import './Home.css';
import HeroImage from '../../../src/assets/smartshopperr_logo.png';
import Divider from '../../../src/assets/divider.png';
import Logo from '../../../src/assets/smartshopperr_title_whitefill.png';
import { JoinList, Button } from '../../components';

const Home = ({ token, setToken }) => {
  let navigate = useNavigate();

  const generateToken = () => {
    const token = generateToken();
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
        <img className="home-logo" src={Logo} alt="Smart Shopper logo" />
        <h1>
          Welcome to your <br /> Smart Shopping List!
        </h1>
        {token ? (
          <Button onClick={() => navigate('/list')}>
            View Your Shopping List
          </Button>
        ) : (
          <Button onClick={() => generateToken()}>Create a New List</Button>
        )}
        <img src={Divider} alt="" className="divider" />
        <JoinList setToken={setToken} />
      </main>
    </div>
  );
};

export default Home;
