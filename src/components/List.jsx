import React, { useState, useEffect } from 'react';
import db from '../lib/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [itemId, setItemId] = useState(' ');

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (data, e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.value });

    setItemId(data.id);
  };

  const docRef = doc(db, token, itemId);
  console.log(docRef);

  useEffect(() => {
    const updateDocument = async () => {
      await updateDoc(docRef, {
        purchased_date: moment().format(),
      });
    };
    return () => updateDocument();
  }, []);

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
                onChange={(e) => handleChange(doc, e)}
              />
              <label>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
