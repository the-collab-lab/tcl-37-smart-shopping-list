import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { sanitize } from '../helpers';
import OrangeButton from './buttons/OrangeButton';

export const JoinList = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState(' ');

  const notify = () => toast.error('Token not valid');
  const navigate = useNavigate();

  const [value] = useCollection(collection(db, tokenInput), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || value.docs.length < 1) {
      notify();
    } else {
      localStorage.setItem('token', sanitize(tokenInput));
      setToken(tokenInput);
      if (tokenInput) navigate('/list');
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== '') {
      const value = e.target.value;
      setTokenInput(sanitize(value));
    } else {
      setTokenInput(' ');
    }
  };
  return (
    <>
      <p> -or- </p>
      <p> Join an existing shopping list by entering a three word token</p>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="share-token"> Share token </label>
          <input
            type="text"
            name="share-token"
            placeholder="three word token"
            id="share-token"
            onChange={handleChange}
          />
          <br />
          <br />
          <OrangeButton text="Join existing list" />
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
