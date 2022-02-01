import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection, doc } from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [itemId, setItemId] = useState(' ');

  const [docValue] = useDocument(doc(db, token, itemId), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  console.log(docValue);

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (data, e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.value });
    // console.log(moment().format());
    console.log(data.id);
    console.log(data.data());

    setItemId(data.id);

    // const itemRef = db.collection(token).doc(data.id);

    console.log(itemId);
  };

  // console.log(checkedItems);

  // value && (console.log(value.docs.map((doc) => {
  //   return doc.data();
  // })));

  // console.log(new Date);

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
