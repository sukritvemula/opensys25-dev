import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const registrationStartDate = new Date('2025-02-26T00:00:00'); //Registrations Start Date
  const registrationEndDate = new Date('2025-02-28T00:00:00'); //Registrations End Date

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetDate = now < registrationStartDate.getTime() ? registrationStartDate : registrationEndDate;
    const difference = targetDate.getTime() - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      difference,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [registrationPhase, setRegistrationPhase] = useState('pre');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      if (now < registrationStartDate.getTime()) {
        setRegistrationPhase('pre');
      } else if (now < registrationEndDate.getTime()) {
        setRegistrationPhase('during');
      } else {
        setRegistrationPhase('post');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (registrationPhase === 'post') {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl md:text-3xl font-bold text-white font-clash">
          Registrations are closed!
        </span>
      </div>
    );
  }

  if (registrationPhase === 'during') {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl md:text-3xl font-bold text-white font-clash">
          Registrations close in:
        </span>
        <div className="flex gap-4 md:gap-6">
          {Object.entries(timeLeft).map(([unit, value]) => {
            if (unit === 'difference') return null;
            return (
              <div key={unit} className="flex flex-col items-center">
                <div className="glass-card px-4 py-3 rounded-xl">
                  <span className="text-2xl md:text-3xl font-bold text-white font-clash">
                    {Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(Math.max(0, value))}
                  </span>
                </div>
                <span className="text-purple-200 mt-2 text-sm font-sora capitalize">{unit}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-2xl md:text-3xl font-bold text-white font-clash">
        Registrations start in:
      </span>
      <div className="flex gap-4 md:gap-6">
        {Object.entries(timeLeft).map(([unit, value]) => {
          if (unit === 'difference') return null;
          return (
            <div key={unit} className="flex flex-col items-center">
              <div className="glass-card px-4 py-3 rounded-xl">
                <span className="text-2xl md:text-3xl font-bold text-white font-clash">
                  {Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(Math.max(0, value))}
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
