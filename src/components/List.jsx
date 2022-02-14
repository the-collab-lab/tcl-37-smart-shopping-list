import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import db from '../lib/firebase';
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  let navigate = useNavigate();
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const calcTimeDiff = (purchasedTime) => {
    const timeNow = moment().format();
    const date1 = moment(timeNow, 'YYYYMMDD HH:mm:ss');
    const date2 = moment(purchasedTime, 'YYYYMMDD HH:mm:ss');
    const timeDiff = date1.diff(date2, 'hours');

    return timeDiff < 24;
  };

  const calcDaysSince = (transactionDate) => {
    const date1 = moment();
    const date2 = moment(transactionDate, 'YYYYMMDD HH:mm:ss');
    const timeDiff = date1.diff(date2, 'days');

    return timeDiff;
  };

  const cleanDate = (date) => {
    const formattedDate = moment(date).format('MMMM Do, YYYY');
    return formattedDate;
  };

  const updateDocument = async (id) => {
    const docRef = doc(db, token, id);
    const document = await getDoc(docRef);
    let docData;
    if (document) {
      docData = document.data();
      console.log(docData);
    }
    const getEstimate = () => {
      // helper function to destructure fields for calculateEstimate
      let prevEstimate;
      const {
        estimated_next_purchase,
        days_since_last_transaction,
        total_purchases,
      } = docData;
      // if no estimated_next_purchase exists, use 'undefined' in calculateEstimate (cannot save undefined fields in db)
      estimated_next_purchase
        ? (prevEstimate = estimated_next_purchase)
        : (prevEstimate = undefined);

      return calculateEstimate(
        prevEstimate,
        days_since_last_transaction,
        total_purchases,
      );
    };
    // this function runs when user selects item as purchased
    await updateDoc(docRef, {
      // if item has been purchased, use last_purchased_date, otherwise date_added
      days_since_last_transaction: calcDaysSince(
        docData.last_purchased_date || docData.date_added,
      ),
      // update last_purchased_date to current time
      last_purchased_date: moment().format(),
      // update total_purchases by 1
      total_purchases: docData.total_purchases + 1,
      // run updateEstimate helper to update estimated_next_purchase
      estimated_next_purchase: getEstimate(),
    });
  };

  const handleClick = (data, e) => {
    updateDocument(data.id);
  };

  return (
    <div className="welcoming">
      <h1>Smart Shopping List</h1>
      <strong> Shareable List Token : {token} </strong>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && value.docs.length > 0 ? (
        <ul className="collection-list">
          {value.docs.map((doc) => (
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
              {doc.data().total_purchases > 0 ? (
                <p> Total purchases: {doc.data().total_purchases}</p>
              ) : null}
              {doc.data().last_purchased_date ? (
                <p>
                  Last purchased date:{' '}
                  {cleanDate(doc.data().last_purchased_date)}
                </p>
              ) : null}
              {doc.data().estimated_next_purchase ? (
                <p>
                  Estimated next purchase: {doc.data().estimated_next_purchase}{' '}
                  days
                </p>
              ) : null}
            </li>
          ))}
        </ul>
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
