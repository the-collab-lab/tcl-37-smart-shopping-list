import React from 'react';
import db from '../lib/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const calcTimeDiff = (purchasedTime) => {
    let timeNow = moment().format();
    var date1 = moment(timeNow, 'YYYYMMDD HH:mm:ss');
    var date2 = moment(purchasedTime, 'YYYYMMDD HH:mm:ss');
    let timeDiff = date1.diff(date2, 'hours');

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
                checked={calcTimeDiff(doc.data().purchased_date)}
                disabled={calcTimeDiff(doc.data().purchased_date)}
                name={doc.id}
                id={doc.id}
                onClick={(e) => handleClick(doc, e)}
                onChange={(e) => handleClick(doc, e)}
              />
              <label>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
