import React from 'react';
import { calcTimeDiff, formatDate } from '../../helpers';
import './item-card.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// to do: prevent expansion for other click events

export const ItemCard = ({ doc, handleClick, getCategory, deleteItem }) => {
  const [expand, setExpand] = React.useState(false);
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
        className="summary"
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
