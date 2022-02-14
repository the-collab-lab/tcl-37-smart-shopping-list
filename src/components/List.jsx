import React from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../lib/firebase';
import { collection, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

import { getEstimate, calcTimeDiff, formatDate } from '../helpers';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const q = query(collection(db, token), orderBy('estimated_next_purchase'));

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const updateDocument = async (document) => {
    const docRef = doc(db, token, document.id);
    let docData = document.data();

    // this function runs when user selects item as purchased
    await updateDoc(docRef, {
      // update last_purchased_date to current time
      last_purchased_date: moment().format(),
      // update total_purchases by 1
      total_purchases: docData.total_purchases + 1,
      // run getEstimate helper to update estimated_next_purchase
      estimated_next_purchase: getEstimate(docData),
    });
  };

  const handleClick = (data, e) => {
    updateDocument(data);
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
            /* 
              Extract below into ListItem component and use doc as prop?
            */
            <li key={doc.id}>
              <input
                type="checkbox"
                checked={calcTimeDiff(doc.data().last_purchased_date)}
                disabled={calcTimeDiff(doc.data().last_purchased_date)}
                name={doc.id}
                id={doc.id}
                onClick={(e) => handleClick(doc, e)}
                onChange={(e) => handleClick(doc, e)}
              />
              <label htmlFor={doc.id}>{doc.data().item}</label>
              {doc.data().total_purchases > 0 && (
                <p> Total purchases: {doc.data().total_purchases}</p>
              )}
              {doc.data().last_purchased_date && (
                <p>
                  Last purchased date:{' '}
                  {formatDate(doc.data().last_purchased_date)}
                </p>
              )}
              {doc.data().estimated_next_purchase && (
                <p>
                  Estimated next purchase: {doc.data().estimated_next_purchase}{' '}
                  days
                </p>
              )}
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
