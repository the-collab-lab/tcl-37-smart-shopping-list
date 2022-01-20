import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import AddItemForm from '../components/AddItemForm';

export const AddItemView = ({ token }) => {
  const [inputs, setInputs] = useState({ 'last purchase date': null });

  console.log(inputs);
  console.log(token);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, token), {
        item: inputs.item,
        days: inputs.days,
        purchased_date: inputs['last purchase date'],
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <h1>Smart Shopping List</h1>
      <AddItemForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
      />
    </div>
  );
};
