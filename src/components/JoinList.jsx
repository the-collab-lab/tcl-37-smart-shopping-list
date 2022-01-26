import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinList = () => {
  const [token, setToken] = useState('');

  let navigate = useNavigate();

  const onClick = (e) => {
    localStorage.setItem('token', token);
    navigate('/list');

    //  use it to view the appropriate list
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setToken(value);
  };
  return (
    <>
      <p> -or- </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <p> Share token </p>
      <input type="text" value={token} onChange={handleChange} />
      <br />
      <br />
      <button type="submit" onClick={onClick} token={token}>
        Join an existing list
      </button>
    </>
  );
};
