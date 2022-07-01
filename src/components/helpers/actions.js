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

export const formatTimer = (timer) => {
  const time = timer.split(':');
  let min = +time[0];
  let sec = +time[1];

  if (min) {
    min = min < 10 ? '0' + min : min;
  } else {
    min = '00';
  }
  if (sec) {
    sec = sec < 10 ? '0' + sec : sec;
  } else {
    sec = '00';
  }

  return min + ':' + sec;
};
