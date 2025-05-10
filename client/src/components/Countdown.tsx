import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderBox = (label: string, value: number) => (
    <div className="flex flex-col items-center justify-center w-20 h-24 bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-md">
      <span className="text-2xl font-extrabold bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-white/70 mt-1">{label}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="mt-16 flex flex-col items-center"
    >
      <p className="text-sm mb-4 text-white/70 tracking-widest uppercase">Launching In</p>
      <div className="flex space-x-4">
        {renderBox("Days", timeLeft.days)}
        {renderBox("Hours", timeLeft.hours)}
        {renderBox("Minutes", timeLeft.minutes)}
        {renderBox("Seconds", timeLeft.seconds)}
      </div>
    </motion.div>
  );
}
