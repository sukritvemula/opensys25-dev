import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const targetDate = new Date('2025-02-26T00:00:00');

  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      difference
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      
      if (newTime.difference <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.difference <= 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl md:text-3xl font-bold text-white font-clash">
          Registrations are live now!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 md:gap-6">
        {Object.entries(timeLeft).map(([unit, value]) => {
          if (unit === 'difference') return null;
          
          return (
            <div key={unit} className="flex flex-col items-center">
              <div className="glass-card px-4 py-3 rounded-xl">
                <span className="text-2xl md:text-3xl font-bold text-white font-clash">
                  {Math.max(0, value).toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-purple-200 mt-2 text-sm font-sora capitalize">{unit}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountdownTimer;
