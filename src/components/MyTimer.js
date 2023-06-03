import React from 'react';
import { useTimer } from 'react-timer-hook';
import '../css/MyTimer.css'

export function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="timer-container">
  {expiryTimestamp > 0 && (
    <div className="countdown-display" style={{ marginRight: -30 }}>
      <div className="countdown-value">{formattedMinutes}</div>
      <div className="countdown-separator">:</div>
      <div className="countdown-value">{formattedSeconds}</div>
      <div style={{fontSize:20}}>&nbsp;&nbsp;&nbsp;:זמן שנותר</div>
    </div>
  )}
</div>
  );
}