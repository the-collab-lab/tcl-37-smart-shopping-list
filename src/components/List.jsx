import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../lib/firebase';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

import { getEstimate, calcTimeDiff, formatDate } from '../helpers';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  let [filterText, setFilterText] = useState('');

  const updateDocument = async (document) => {
    const docRef = doc(db, token, document.id);
    let docData = document.data();

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

  const deleteDocument = async (document) => {
    await deleteDoc(doc(db, token, document.id));
  };

  const confirmDelete = (document) => {
    if (
      window.confirm(`Are you sure you want to delete ${document.data().item}?`)
    ) {
      deleteDocument(document);
    }
  };

  const handleClick = (doc, e) => {
    updateDocument(doc);
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="welcoming">
      <h1>Smart Shopping List</h1>
      <strong> Shareable List Token : {token} </strong>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && value.docs.length > 0 ? (
        <div>
          <div style={{ marginTop: '1em' }}>
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
            {value.docs
              .filter((doc) =>
                doc
                  .data()
                  .item.toLowerCase()
                  .includes(filterText.toLowerCase()),
              )
              .map((doc) => (
                <li key={doc.id}>
                  <input
                    type="checkbox"
                    checked={calcTimeDiff(doc.data().last_purchased_date)}
                    disabled={calcTimeDiff(doc.data().last_purchased_date)}
                    name={doc.id}
                    id={doc.id}
                    onClick={(e) => handleClick(doc, e)}
                    onChange={(e) => handleClick(doc, e)}
                  />
                  <label htmlFor={doc.id}>{doc.data().item}</label>
                  <button onClick={() => confirmDelete(doc)}>delete</button>
                  {doc.data().total_purchases > 0 && (
                    <p> Total purchases: {doc.data().total_purchases}</p>
                  )}
                  {doc.data().last_purchased_date && (
                    <p>
                      Last purchased date:{' '}
                      {formatDate(doc.data().last_purchased_date)}
                    </p>
                  )}
                  {doc.data().estimated_next_purchase && (
                    <p>
                      Estimated next purchase:{' '}
                      {doc.data().estimated_next_purchase} days
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
