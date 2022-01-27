import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinList = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState('');

  let navigate = useNavigate();

  const onSubmit = (e) => {
    localStorage.setItem('token', tokenInput);
    setToken(tokenInput);
    if (tokenInput) navigate('/list');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTokenInput(value);
  };
  return (
    <>
      <p> -or- </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="share-token"> Share token </label>
          <input
            type="text"
            name="share-token"
            value={tokenInput}
            placeholder="three word token"
            id="share-token"
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">Join an existing list</button>
        </form>
      </div>
    </>
  );
};
