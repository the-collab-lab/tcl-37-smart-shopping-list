import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RequireToken = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/');
  }, [navigate]);
  return children;
};

export default RequireToken;
