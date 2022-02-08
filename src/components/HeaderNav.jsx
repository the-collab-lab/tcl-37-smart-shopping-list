import { Link, useNavigate } from 'react-router-dom';

const HeaderNav = ({ token, setToken }) => {
  let navigate = useNavigate();
  const handleSignOut = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="header">
      <Link to="/">HOME</Link>
      {token ? (
        <button type="button" onClick={() => handleSignOut()}>
          Sign out
        </button>
      ) : null}
    </nav>
  );
};

export default HeaderNav;
