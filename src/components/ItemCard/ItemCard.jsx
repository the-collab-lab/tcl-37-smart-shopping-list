import React, { useState } from 'react';
import { calcTimeDiff, formatDate } from '../../helpers';
// import './item-card.css';
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
        aria-controls="panel1a-content"
        id="panel1a-header"
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
          <span>{doc.daysUntilPurchase}</span>
          <br />
          day(s)
        </div>
        <button className="delete-button" onClick={() => deleteItem(doc)}>
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
          <div>
            <p>Purchase interval: {doc.estimated_next_purchase} days</p>
            <p>
              Purchase:{' '}
              {doc.daysUntilPurchase === 0
                ? 'today'
                : doc.daysUntilPurchase < 0
                ? `overdue by ${Math.abs(doc.daysUntilPurchase)} day(s)`
                : `in ${doc.daysUntilPurchase} day(s)`}
            </p>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ItemCard;
