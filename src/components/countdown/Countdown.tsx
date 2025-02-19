import React, { useEffect, useState } from "react";
import "./countdown.css"; 

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeRemaining = (targetDate: Date): TimeLeft => {
  const now = new Date().getTime();
  const timeDiff = targetDate.getTime() - now;

  if (timeDiff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
    seconds: Math.floor((timeDiff / 1000) % 60),
  };
};

const Countdown: React.FC = () => {
  const targetDate = new Date();
  targetDate.setMonth(2);
  targetDate.setDate(4);
  targetDate.setHours(9, 0, 0, 0);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col gap-10 items-center mb-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl">Countdown: </h1>
        <div className="countdown">
        {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="time-section">
            <div className="time-group">
                {String(value).padStart(2, "0").split("").map((digit, i) => (
                <FlipDigit key={i} digit={digit} />
                ))}
            </div>
            <p>{label}</p>
            </div>
        ))}
        </div>
    </div>
  );
};

const FlipDigit: React.FC<{ digit: string }> = ({ digit }) => {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 600);
    }
  }, [digit, prevDigit]);

  return (
    <div className={`time-segment ${flipping ? "flip" : ""}`}>
      <div className="segment-display">
        <div className="segment-display__top">{digit}</div>
        <div className="segment-display__bottom">{prevDigit}</div>
        <div className="segment-overlay">
          <div className="segment-overlay__top">{prevDigit}</div>
          <div className="segment-overlay__bottom">{digit}</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
