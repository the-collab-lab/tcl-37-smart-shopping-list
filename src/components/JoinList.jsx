import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinList = (props) => {
  console.log(props);
  const [tokenInput, setTokenInput] = useState('');

  let navigate = useNavigate();

  const onClick = (e) => {
    localStorage.setItem('token', tokenInput);
    props.setToken(tokenInput);
    if (tokenInput) navigate('/list');

    //  use it to view the appropriate list
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTokenInput(value);
  };
  return (
    <>
      <p> -or- </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <p> Share token </p>
      <input type="text" value={tokenInput} onChange={handleChange} />
      <br />
      <br />
      <button type="submit" onClick={onClick}>
        Join an existing list
      </button>
    </>
  );
};
