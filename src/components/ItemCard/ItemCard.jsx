import React from 'react';
import { calcTimeDiff, formatDate } from '../../helpers';
import './item-card.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const ItemCard = ({ doc, handleClick, getCategory, deleteItem }) => {
  return (
    <Accordion className={`item-card ${getCategory(doc)}`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="summary"
      >
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
        <label htmlFor={doc.id} className="item-title">
          {doc.item}
        </label>
        {doc.daysUntilPurchase === 0
          ? 'today'
          : doc.daysUntilPurchase < 0
          ? `overdue by ${(doc.daysUntilPurchase *= -1)} day(s)`
          : `${doc.daysUntilPurchase} day(s)`}
        <button className="delete-button" onClick={() => deleteItem(doc)}>
          <DeleteOutlineIcon />
        </button>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};
