import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import { IconButton } from '@mui/material';
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

  return (
    <nav className="nav-container">
      <IconButton aria-label="add item" onClick={() => navigate('/add')}>
        <AddIcon />
      </IconButton>
      <IconButton
        aria-label="list"
        onClick={() => navigate('/list')}
        className="nav-icon"
      >
        <ListIcon />
      </IconButton>
      <IconButton
        aria-label="sign out"
        onClick={() => handleSignOut()}
        className="nav-icon"
      >
        <LogoutIcon />
      </IconButton>
      <IconButton
        aria-label="share token"
        onClick={() => copyToClipboard()}
        className="nav-icon"
      >
        <ShareIcon />
      </IconButton>
    </nav>
  );
};

export default Navigation;
