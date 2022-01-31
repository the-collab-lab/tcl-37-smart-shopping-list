import React from 'react';
import db from '../lib/firebase';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      <h4> Shareable List Token : {token} </h4>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      Collection
      {value && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>{doc.data().item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
