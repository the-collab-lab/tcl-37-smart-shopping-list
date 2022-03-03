import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import db from '../../lib/firebase';
import {
  collection,
  doc,
  updateDoc,
  query,
  deleteDoc,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import './list.css';
import { getEstimate, calcDaysSince } from '../../helpers';
import { ItemCard, OrangeButton, Input } from '../../components';

const List = ({ token }) => {
  let navigate = useNavigate();
  const q = query(collection(db, token));
  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  let [filterText, setFilterText] = useState('');
  let [items, setItems] = useState([]);

  useEffect(() => {
    if (value) {
      let arr = value.docs.map((item) => {
        const data = item.data();
        return {
          ...data,
          id: item.id,
          isActive: getActiveStatus(data),
          daysUntilPurchase: getDaysUntilPurchase(data),
        };
      });
      arr.sort(
        (itemA, itemB) =>
          Number(itemB.isActive) - Number(itemA.isActive) ||
          itemA.daysUntilPurchase - itemB.daysUntilPurchase ||
          itemA.item.localeCompare(itemB.item),
      );
      setItems(arr);
    }
  }, [value]);

  // Check active status of items purchased & not purchased
  const getActiveStatus = (item) => {
    return (
      calcDaysSince(item.last_purchased_date || item.date_added) <=
      item.estimated_next_purchase * 2
    );
  };

  // Calculate days until next purchase and use for item categories
  const getDaysUntilPurchase = (item) => {
    const daysSincePreviousTransaction = calcDaysSince(
      item.last_purchased_date || item.date_added,
    );

    let daysUntilNextPurchase =
      item.estimated_next_purchase - daysSincePreviousTransaction;
    return daysUntilNextPurchase;
  };

  const updateDocument = async (document) => {
    const docRef = doc(db, token, document.id);
    let docData = document;

    // this function runs when user selects item as purchased
    await updateDoc(docRef, {
      // update last_purchased_date to current time
      last_purchased_date: moment().format(),
      // update total_purchases by 1
      total_purchases: docData.total_purchases + 1,
      // run getEstimate helper to update estimated_next_purchase
      estimated_next_purchase: getEstimate(docData),
    });
  };

  const deleteItem = async (document) => {
    if (window.confirm(`Are you sure you want to delete "${document.item}"?`)) {
      await deleteDoc(doc(db, token, document.id));
    }
  };

  const handleClick = (doc, e) => {
    updateDocument(doc);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const getCategory = (item) => {
    if (!item.isActive) {
      return 'inactive';
    } else if (item.daysUntilPurchase <= 7) {
      return 'soon';
    } else if (item.daysUntilPurchase < 30) {
      return 'kinda-soon';
    } else {
      return 'not-soon';
    }
  };

  return (
    <main>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {items && items.length > 0 ? (
        <section>
          <div className="search-field">
            <Input
              placeholder="search for item"
              value={filterText}
              onChange={handleFilterChange}
              onClick={() => setFilterText(() => '')}
            />
          </div>
          <ul className="collection-list">
            {items
              .filter((doc) =>
                doc.item.toLowerCase().includes(filterText.toLowerCase()),
              )
              .map((doc) => (
                <ItemCard
                  key={doc.id}
                  doc={doc}
                  handleClick={handleClick}
                  getCategory={getCategory}
                  deleteItem={deleteItem}
                />
              ))}
          </ul>
        </section>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <section className="welcome">
          <p>
            Your shopping list is currently empty. <br /> Click the button below
            to get started!
          </p>
          <OrangeButton onClick={() => navigate('/add')}>
            Add an Item
          </OrangeButton>
        </section>
      )}
    </main>
  );
};

export default List;
