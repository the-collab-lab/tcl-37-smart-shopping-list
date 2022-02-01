import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      <h4> Shareable List Token : {token} </h4>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      Collection
      {value && value.docs.length > 0 ? (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>{doc.data().item}</li>
          ))}
        </ul>
      ) : (
        <Fragment>
          <p>Your shopping list is currently empty.</p>
          <button type="button" onClick={() => navigate('/add')}>
            ADD YOUR FIRST ITEM
          </button>
        </Fragment>
      )}
    </div>
  );
};
