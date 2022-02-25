import moment from 'moment';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

export const sanitize = (input) => {
  const lowerCase = input.toLowerCase();
  return lowerCase.trim();
};

export const formatDate = (date) => {
  const formattedDate = moment(date).format('MMMM Do, YYYY');
  return formattedDate;
};

export const calcTimeDiff = (purchasedTime) => {
  const timeNow = moment().format();
  const date1 = moment(timeNow, 'YYYYMMDD HH:mm:ss');
  const date2 = moment(purchasedTime, 'YYYYMMDD HH:mm:ss');
  const timeDiff = date1.diff(date2, 'hours');

  return timeDiff < 24;
};

export const calcDaysSince = (transactionDate) => {
  const date1 = moment();
  const date2 = moment(transactionDate, 'YYYYMMDD HH:mm:ss');
  const timeDiff = date1.diff(date2, 'days');

  return timeDiff;
};

export const getEstimate = (data) => {
  // helper function to destructure fields for calculateEstimate
  const {
    date_added,
    last_purchased_date,
    estimated_next_purchase,
    total_purchases,
  } = data;
  // if estimated_next_purchase exists, use in calculateEstimate, otherwise pass as undefined
  let prevEstimate = undefined;
  if (estimated_next_purchase) prevEstimate = estimated_next_purchase;

  let daysSinceLastTransaction = calcDaysSince(
    last_purchased_date || date_added,
  );

  // If no days have passed, return the user's original guess
  if (daysSinceLastTransaction === 0)
    daysSinceLastTransaction = estimated_next_purchase;

  return calculateEstimate(
    prevEstimate,
    daysSinceLastTransaction,
    total_purchases,
  );
};
