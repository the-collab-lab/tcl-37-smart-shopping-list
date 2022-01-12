import React, { useState, useEffect } from 'react';
import { addDoc } from 'firebase/firestore';
import db from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Db() {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'list'), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => {
        snapshotDocs.push({ ...doc.data(), id: doc.id });
      });
      setDocs(snapshotDocs);
    });
    return () => {
      unsub();
    };
  }, []);

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'list'), {
        item: 'green beans',
        quantity: '1 pound',
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      Send data:
      <button onClick={sendData}>Send data to database</button>
      <ul>
        {docs.map((doc) => {
          return (
            <li key={doc.id}>
              {doc.item} : {doc.quantity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
