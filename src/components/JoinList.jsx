import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { sanitize } from '../helpers';
import { Button, Input } from './index';

const JoinList = ({ setToken }) => {
  const [tokenInput, setTokenInput] = useState('');

  const notify = () => toast.error('Token not valid');
  const navigate = useNavigate();

  const [value] = useCollection(collection(db, sanitize(tokenInput) || ' '), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || value.docs.length < 1) {
      notify();
    } else {
      localStorage.setItem('token', sanitize(tokenInput));
      setToken(sanitize(tokenInput));
      if (tokenInput) navigate('/list');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTokenInput(value);
  };

  return (
    <>
      <p> Join an existing shopping list by entering a three word token</p>
      <div>
        <Input
          required={false}
          name="share-token"
          placeholder="three word token"
          ariaLabel="Join an existing list by entering a three word token"
          id="share-token"
          value={tokenInput}
          onChange={handleChange}
          onClick={() => setTokenInput(() => '')}
        />
        <Button onClick={handleSubmit}>Join Existing List</Button>
      </div>
    </>
  );
};

export default JoinList;
