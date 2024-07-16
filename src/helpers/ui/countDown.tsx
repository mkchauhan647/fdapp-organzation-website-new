"use client"
import React, { useState, useEffect } from 'react';
import { Timer } from '@/utils/schema/countDown';

function CountdownDisplay({ targetDate, isBlue }: { targetDate: any; isBlue?: boolean }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft:Timer = {
      days:0,
      hours:0,
      minutes:0,
      seconds:0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const zeroPad = (num : number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    
      <div className='flex items-center justify-center gap-3'>
          <div className='time-box-wrapper'>
              <div className="time-box">
                  <p className='time text-[12px] sm:text-[18px] font-bold'>{zeroPad(timeLeft.days)}</p>
              </div>
              <span className={isBlue ? ` text-[12px] sm:text-[16px] text-[var(--c-primary)] font-bold`:` text-[12px] sm:text-[16px] font-bold`}>Day</span>
          </div>
          <div className='time-box-wrapper'>
              <div className="time-box">
                  <p className='time text-[12px] sm:text-[18px] font-bold'>{zeroPad(timeLeft.hours)}</p>
              </div>
              <span className={isBlue ? ` text-[12px] sm:text-[16px] text-[var(--c-primary)] font-bold`:` text-[12px] sm:text-[16px] font-bold`}>Hrs</span>
          </div>
          <div className='time-box-wrapper'>
              <div className="time-box">
                  <p className='time text-[12px] sm:text-[18px] font-bold'>{zeroPad(timeLeft.minutes)}</p>

              </div>
              <span className={isBlue ? ` text-[12px] sm:text-[16px] text-[var(--c-primary)] font-bold`:` text-[12px] sm:text-[16px] font-bold`}>Min</span>
          </div>
          <div className='time-box-wrapper'>
              <div className="time-box">
                  <p className='time text-[12px] sm:text-[18px] font-bold'>{zeroPad(timeLeft.seconds)}</p>

              </div>
              <span className={isBlue ? ` text-[12px] sm:text-[16px] text-[var(--c-primary)] font-bold`:` text-[12px] sm:text-[16px] font-bold`}>Sec</span>
          </div>
      </div>
  );
}

export default CountdownDisplay;
