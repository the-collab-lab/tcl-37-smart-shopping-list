import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import { useNavigate } from 'react-router-dom';

export const Navigation = ({ setToken }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
      <AddIcon onClick={() => navigate('/add')} />
      <ListIcon onClick={() => navigate('/list')} />
      <LogoutIcon onClick={() => handleSignOut()} />
      <ShareIcon />
    </nav>
  );
};

export default Navigation;
