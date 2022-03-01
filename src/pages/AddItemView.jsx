import React, { useState } from 'react';
import db from '../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { AddItemForm, PageWrapper, Navigation, PageTitle } from '../components';
import { toast } from 'react-toastify';
import moment from 'moment';

const AddItemView = ({ token, setToken }) => {
  const [inputs, setInputs] = useState({
    days: 7,
    last_purchased_date: null,
  });

  const notify = () => toast.success('Item added!');
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
      const currentItems = items.map((item) => {
        return item
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .split(' ')
          .join('');
      });

      const escapedItemName = inputs.item
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(' ')
        .join('');

      if (currentItems.includes(escapedItemName)) {
        duplicate();
        return;
      }

      await addDoc(collection(db, token), {
        item: inputs.item,
        last_purchased_date: inputs.last_purchased_date,
        date_added: moment().format(),
        estimated_next_purchase: parseInt(inputs.days),
        total_purchases: 0,
      });
      setInputs((prevState) => ({ ...prevState, item: '' }));
      notify();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <PageWrapper navbar={<Navigation setToken={setToken} token={token} />}>
      <PageTitle>Add Item</PageTitle>
      <AddItemForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputs={inputs}
      />
    </PageWrapper>
  );
};

export default AddItemView;
