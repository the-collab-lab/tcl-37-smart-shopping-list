import { useState } from 'react';

export const JoinList = () => {
  const [token, setToken] = useState('');
  const joinList = (e) => {
    localStorage.setItem('token', token);
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
      <button type="submit" onClick={joinList} token={token}>
        Join an existing list
      </button>
    </>
  );
};
