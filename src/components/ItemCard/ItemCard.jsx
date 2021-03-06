import React, { useState } from 'react';
import { calcTimeDiff, formatDate } from '../../helpers';
import './itemcard.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ItemCard = ({ doc, handleClick, getCategory, deleteItem }) => {
  const [expand, setExpand] = useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  return (
    <Accordion expanded={expand} className={`item-card ${getCategory(doc)}`}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            onClick={toggleAcordion}
            style={{ color: '#9E9EA7' }}
          />
        }
        aria-controls={`panel1a-content ${doc.id}`}
        id={`panel1a-header ${doc.id}`}
      >
        <div className="container">
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
          <span className="checkmark"></span>
        </div>
        <label htmlFor={doc.id} className="item-title">
          {doc.item}
        </label>
        <div className="estimate">
          <p className="number-days">{doc.daysUntilPurchase}</p>
          {doc.daysUntilPurchase === 1 ? (
            <p className="days">day</p>
          ) : (
            <p className="days">days</p>
          )}
        </div>
        <button
          aria-label="delete"
          className="delete-button"
          onClick={() => deleteItem(doc)}
        >
          <DeleteOutlineIcon style={{ color: '#9E9EA7' }} />
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
            Purchase:{' '}
            {doc.daysUntilPurchase === 0
              ? 'today'
              : doc.daysUntilPurchase < 0
              ? `overdue by ${Math.abs(doc.daysUntilPurchase)} ${
                  doc.daysUntilPurchase === -1 ? 'day' : 'days'
                }`
              : `in ${doc.daysUntilPurchase} ${
                  doc.daysUntilPurchase === 1 ? 'day' : 'days'
                }`}
          </p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ItemCard;
