import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Title from '../../assets/smartshopperr_title_transparent.png';
import './Navigation.css';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Navigation = ({ setToken, token }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token).then(() =>
      toast('Token copied to clipboard!', {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false,
        draggable: false,
      }),
    );
  };

  // properties in this object will affect all icons
  // turn this into a prop
  const navIconStyle = {
    fontSize: '2.5rem',
    display: 'inline-block',
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="logo">
        <img src={Title} alt="Smart Shopper" />
      </Link>
      <IconButton aria-label="add item" onClick={() => navigate('/add')}>
        <AddIcon sx={navIconStyle} />
      </IconButton>
      <IconButton aria-label="list" onClick={() => navigate('/list')}>
        <ListIcon sx={navIconStyle} />
      </IconButton>
      <IconButton aria-label="sign out" onClick={() => handleSignOut()}>
        <LogoutIcon sx={navIconStyle} />
      </IconButton>
      <IconButton aria-label="share token" onClick={() => copyToClipboard()}>
        <ShareIcon sx={navIconStyle} />
      </IconButton>
    </nav>
  );
};

export default Navigation;
