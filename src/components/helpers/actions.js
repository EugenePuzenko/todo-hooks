import { formatDistanceToNow } from 'date-fns';

export const ACTIONS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const getFormatDistanceToNow = (currentTime) => {
  return formatDistanceToNow(currentTime, { includeSeconds: true });
};

export const getCurrentTime = () => {
  return new Date().getTime();
};
