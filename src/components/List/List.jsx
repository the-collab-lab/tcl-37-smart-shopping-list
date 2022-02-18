import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../lib/firebase';
import { collection, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import './list.css';
import {
  getEstimate,
  calcTimeDiff,
  formatDate,
  calcDaysSince,
} from '../../helpers';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const q = query(collection(db, token), orderBy('item'));
  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  let [filterText, setFilterText] = useState('');
  let [items, setItems] = useState([]);

  useEffect(() => {
    if (value) {
      let arr = [];
      value.docs.forEach((item) => {
        arr.push({ ...item.data(), id: item.id });
      });
      arr.map((item) => (item.isActive = handleActive(item)));
      arr.sort(
        (itemA, itemB) =>
          itemA.estimated_next_purchase - itemB.estimated_next_purchase,
      );
      arr.sort(
        (itemA, itemB) => Number(itemB.isActive) - Number(itemA.isActive),
      );
      setItems(arr);
    }
  }, [value]);

  const handleActive = (item) => {
    if (
      calcTimeDiff(item.last_purchased_date) ||
      // check if time elapsed works
      calcDaysSince(item.last_purchased_date) > item.estimated_next_purchase * 2
    ) {
      return false;
    }
    return true;
  };

  console.log(items);

  // useEffect(() => {
  //   const handleActive = (item) => {
  //     if (
  //       item.total_purchases < 2 ||
  //       // check if time elapsed works
  //       calcDaysSince(item.last_purchased_date) >
  //         item.estimated_next_purchase * 2 ||
  //       calcTimeDiff(item.last_purchased_date)
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   };

  //   items.map((item) => (item.isActive = handleActive(item)));
  //   items.sort(
  //     (itemA, itemB) => Number(itemB.isActive) - Number(itemA.isActive),
  //   );
  // }, [items]);

  const updateDocument = async (document) => {
    const docRef = doc(db, token, document.id);
    let docData = document;
    console.log(docData);

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

  const handleClick = (doc, e) => {
    updateDocument(doc);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const setColor = (item) => {
    console.log(item.item);
    console.log(item.isActive);

    if (!item.isActive) {
      return 'inactive';
    } else if (item.estimated_next_purchase <= 7) {
      return 'soon';
    } else if (item.estimated_next_purchase < 30) {
      return 'kinda-soon';
    } else {
      return 'not-soon';
    }
  };

  return (
    <div className="welcoming">
      <h1>Smart Shopping List</h1>
      <strong> Shareable List Token : {token} </strong>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {items && items.length > 0 ? (
        <div>
          <div className="search-field">
            <input
              placeholder="Start typing here..."
              value={filterText}
              onChange={handleFilterChange}
            />
            <button
              style={{ marginLeft: '10px' }}
              onClick={() => setFilterText('')}
            >
              X
            </button>
          </div>
          <ul className="collection-list">
            {items
              .filter((doc) =>
                doc.item.toLowerCase().includes(filterText.toLowerCase()),
              )
              .map((doc) => (
                <li key={doc.id} className={`${setColor(doc)}`}>
                  <input
                    type="checkbox"
                    checked={calcTimeDiff(doc.last_purchased_date)}
                    disabled={calcTimeDiff(doc.last_purchased_date)}
                    name={doc.id}
                    id={doc.id}
                    onClick={(e) => handleClick(doc, e)}
                    onChange={(e) => handleClick(doc, e)}
                    aria-label={setColor(doc)}
                  />
                  <label htmlFor={doc.id}>{doc.item}</label>
                  {doc.total_purchases > 0 && (
                    <p> Total purchases: {doc.total_purchases}</p>
                  )}
                  {doc.last_purchased_date && (
                    <p>
                      Last purchased date: {formatDate(doc.last_purchased_date)}
                    </p>
                  )}
                  {doc.estimated_next_purchase && (
                    <p>
                      Estimated next purchase: {doc.estimated_next_purchase}{' '}
                      days
                    </p>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Your shopping list is currently empty.</p>
          <button type="button" onClick={() => navigate('/add')}>
            ADD YOUR FIRST ITEM
          </button>
        </div>
      )}
    </div>
  );
};
