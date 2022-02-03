import React, { useState, useEffect } from 'react';
import db from '../lib/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export const List = ({ token }) => {
  const [value, loading, error] = useCollection(collection(db, token), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [checkedItems, setCheckedItems] = useState({});
  // const [timeNow, setTimeNow] = useState("");

  // useEffect(() =>{
  //   setTimeNow(moment().format());
  //   console.log(timeNow);
  // }, []);

  // const timeNow = moment();
  // console.log(timeNow);

  const calcTimeDiff = (purchasedTime) => {
    let timeNow = moment().format();
    // let purchaseTime = "2022-02-01T12:50:22-09:00"
    // const duration = moment.duration(x.diff(y));
    var date1 = moment(timeNow, 'YYYYMMDD HH:mm:ss');
    var date2 = moment(purchasedTime, 'YYYYMMDD HH:mm:ss');

    console.log(date1.diff(date2, 'hours') + 'hrs'); // "7d"
    let timeDiff = date1.diff(date2, 'hours');
    console.log(timeDiff);

    return timeDiff < 24;
  };

  // calcTimeDiff();

  const updateDocument = async (id) => {
    // debugger;
    const docRef = doc(db, token, id);
    await updateDoc(docRef, {
      purchased_date: moment().format(),
    });
  };

  const handleClick = (data, e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.value });
    updateDocument(data.id);
  };
  return (
    <div>
      <h4> Shareable List Token : {token} </h4>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      Collection
      {value && (
        <ul className="collection-list">
          {value.docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                checked={calcTimeDiff(doc.data().purchased_date)}
                disabled={calcTimeDiff(doc.data().purchased_date)}
                name={doc.id}
                id={doc.id}
                // value={doc.data().item}
                onClick={(e) => handleClick(doc, e)}
                onChange={(e) => handleClick(doc, e)}
              />
              <label>{doc.data().item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
