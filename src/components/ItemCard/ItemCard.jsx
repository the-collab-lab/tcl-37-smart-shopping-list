import React from 'react';
import { calcTimeDiff, formatDate } from '../../helpers';

export const ItemCard = ({ doc, handleClick, getCategory, deleteItem }) => {
  return (
    <li className={getCategory(doc)}>
      <input
        type="checkbox"
        checked={calcTimeDiff(doc.last_purchased_date)}
        disabled={calcTimeDiff(doc.last_purchased_date)}
        name={doc.id}
        id={doc.id}
        onClick={(e) => handleClick(doc)}
        onChange={(e) => handleClick(doc)}
        aria-label={getCategory(doc)}
      />
      <label htmlFor={doc.id}>{doc.item}</label>
      {doc.total_purchases > 0 && (
        <p> Total purchases: {doc.total_purchases}</p>
      )}
      {doc.last_purchased_date && (
        <p>Last purchased date: {formatDate(doc.last_purchased_date)}</p>
      )}
      {doc.estimated_next_purchase && (
        <p>
          Estimated next purchase: {doc.estimated_next_purchase} days
          <br />
          Purchase:{' '}
          {doc.daysUntilPurchase === 0
            ? 'today'
            : doc.daysUntilPurchase < 0
            ? `overdue by ${(doc.daysUntilPurchase *= -1)} day(s)`
            : `in ${doc.daysUntilPurchase} day(s)`}
        </p>
      )}
      <button className="delete-button" onClick={() => deleteItem(doc)}>
        delete
      </button>
    </li>
  );
};
