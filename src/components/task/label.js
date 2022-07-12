import { useEffect, useState } from 'react';

import { getFormatDistanceToNow, formatTimer } from '../helpers/actions';

const Label = ({ createdTime, onStartClick, onStopClick, message, timer }) => {
  const [time, setTime] = useState(getFormatDistanceToNow(createdTime));

  useEffect(() => {
    const interval = setInterval(() => setTime(getFormatDistanceToNow(createdTime)), 1000);
    return () => clearInterval(interval);
  });

  return (
    <label>
      <span className="title">{message}</span>
      <span className="description">
        <button className="icon icon-play" onClick={onStartClick}></button>
        <button className="icon icon-pause" onClick={onStopClick}></button>
        <span className="time">{formatTimer(timer)}</span>
      </span>
      <span className="description">created {time} ago</span>
    </label>
  );
};

export default Label;
