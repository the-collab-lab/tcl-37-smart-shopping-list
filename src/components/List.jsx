import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import db from '../lib/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const calcTimeDiff = (purchasedTime) => {
    const timeNow = moment().format();
    const date1 = moment(timeNow, 'YYYYMMDD HH:mm:ss');
    const date2 = moment(purchasedTime, 'YYYYMMDD HH:mm:ss');
    const timeDiff = date1.diff(date2, 'hours');

    return timeDiff < 24;
  };

  const updateDocument = async (id) => {
    const docRef = doc(db, token, id);
    await updateDoc(docRef, {
      purchased_date: moment().format(),
    });
  };

  const handleClick = (data, e) => {
    updateDocument(data.id);
  };

  return (
    <div className="welcoming">
      <h1>Smart Shopping List</h1>
      <strong> Shareable List Token : {token} </strong>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && value.docs.length > 0 ? (
        <ul className="collection-list">
          {value.docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                checked={calcTimeDiff(doc.data().purchased_date)}
                disabled={calcTimeDiff(doc.data().purchased_date)}
                name={doc.id}
                id={doc.id}
                onClick={(e) => handleClick(doc, e)}
                onChange={(e) => handleClick(doc, e)}
              />
              <label htmlFor={doc.id}>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>Your shopping list is currently empty.</p>
          <button type="button" onClick={() => navigate('/add')}>
            ADD YOUR FIRST ITEM
          </button>
        </div>
      )}
    </div>
  );
};
