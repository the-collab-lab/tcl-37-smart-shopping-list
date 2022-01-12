import React, { useState, useEffect } from 'react';
import { addDoc } from 'firebase/firestore';
import db from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Db() {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => {
        snapshotDocs.push({ ...doc.data(), id: doc.id });
        console.log(doc.id);
      });
      setDocs(snapshotDocs);
    });
  }, []);
  // console.log(docs.forEach((doc) => console.log(doc.data())));
  console.log(docs);

  //doc.data() returns a data object from the db.
  //   {
  //     "first": "Ada",
  //     "last": "Lovelace",
  //     "born": 1815
  // }

  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
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
        {/* {
          docs.map(doc => {
            return (
              <li>{doc.last}</li>
            )
          })
        } */}
      </ul>
    </div>
  );
}
