import React, { useState, useEffect } from 'react';
import db from '../lib/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export const ListView = () => {
  // const [docs, setDocs] = useState([]);
  const [value, loading, error] = useCollection(collection(db, 'list'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, 'list'), (snapshot) => {
  //     const snapshotDocs = [];
  //     snapshot.forEach((doc) => {
  //       snapshotDocs.push({ ...doc.data(), id: doc.id });
  //     });
  //     setDocs(snapshotDocs);
  //   });
  //   return () => {
  //     unsub();
  //   };
  // }, []);

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'list'), {
        item: 'ravioli',
        quantity: '1 pound',
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <button onClick={sendData}>Send data to database</button>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      Collection
      {value && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>
              {doc.data().item} : {doc.data().quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
