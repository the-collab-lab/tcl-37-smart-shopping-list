import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [checkedItems, setCheckedItems] = useState({});

  const updateDocument = async (id) => {
    // debugger;
    const docRef = doc(db, token, id);
    await updateDoc(docRef, {
      purchased_date: moment().format(),
    });
  };

  const handleClick = (data, e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.value });
    updateDocument(data.id);
  };
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
                // checked={doc.data().purchased_date ? false : true}
                name={doc.id}
                id={doc.id}
                value={doc.data().item}
                onClick={(e) => handleClick(doc, e)}
              />
              <label>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
