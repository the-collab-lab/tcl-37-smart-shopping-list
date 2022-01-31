import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.value });
    console.log(moment().format());
  };

  console.log(checkedItems);

  return (
    <div>
      <h4> Shareable List Token : {token} </h4>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      Collection
      {value && (
        <ul className="collection-list">
          {value.docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                name={doc.id}
                id={doc.id}
                value={doc.data().item}
                onChange={handleChange}
              />
              <label>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
