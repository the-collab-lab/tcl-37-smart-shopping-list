import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import { IconButton, Tooltip } from '@mui/material';
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
      toast(
        ({ closeButton }) => (
          <div>
            Token copied to clipboard! <br /> <strong>{token}</strong>
          </div>
        ),
        {
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: false,
          closeOnClick: false,
        },
      ),
    );
  };

  const navIconStyle = {
    fontSize: '2.5rem',
    display: 'inline-block',
    color: 'black',
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="logo">
        <img src={Title} alt="Smart Shopper" />
      </Link>
      <Tooltip title="Add item">
        <IconButton aria-label="add item" onClick={() => navigate('/add')}>
          <AddIcon sx={navIconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="View list">
        <IconButton aria-label="list" onClick={() => navigate('/list')}>
          <ListIcon sx={navIconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share token">
        <IconButton aria-label="share token" onClick={() => copyToClipboard()}>
          <ShareIcon sx={navIconStyle} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sign out">
        <IconButton aria-label="sign out" onClick={() => handleSignOut()}>
          <LogoutIcon sx={navIconStyle} />
        </IconButton>
      </Tooltip>
    </nav>
  );
};

export default Navigation;
