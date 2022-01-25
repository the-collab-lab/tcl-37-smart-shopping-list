import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import AddItemForm from '../components/AddItemForm';
import { ToastContainer, toast, error } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const last_purchased_date = "last purchase date";

export const AddItemView = ({ token }) => {
  const [inputs, setInputs] = useState({
    days: 7,
    last_purchased_date: null,
  });

  const notify = () => toast('Item added!');
  const duplicate = () => toast.error('Item already exists!');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const querySnapshot = await getDocs(collection(db, token));
      const items = querySnapshot.docs.map((doc) => doc.data().item);
      const newItems = items.map((item) => {
        return item.toLowerCase().replace(/[^\w\s]/gi, '');
      });

      const mutatedItem = inputs.item.toLowerCase().replace(/[^\w\s]/gi, '');

      if (newItems.includes(mutatedItem)) {
        duplicate();
        return;
      }

      const docRef = await addDoc(collection(db, token), {
        item: inputs.item,
        days: parseInt(inputs.days),
        purchased_date: inputs.last_purchased_date,
      });
      setInputs((prevState) => ({ ...prevState, item: '' }));
      console.log('Document written with ID: ', docRef.id);
      notify();
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
      <ToastContainer />
    </div>
  );
};
