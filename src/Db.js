import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebase';

export default function Db() {
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
    </div>
  );
}
