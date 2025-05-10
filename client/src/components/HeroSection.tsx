import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useModalContext } from "@/context/ModalContext";

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const liveUsers = [
  "Aditi from Bangalore",
  "Sam from Toronto",
  "Luis from Madrid",
  "Fatima from Dubai",
  "Yuki from Tokyo",
  "Carlos from Mexico City",
  "Emily from New York",
  "Liam from London",
  "Zara from Cape Town",
  "Raj from Delhi",
  "Sofia from Rome",
  "Mei from Shanghai",
  "Omar from Cairo",
  "Lucas from São Paulo",
  "Anna from Berlin",
];

export default function HeroSection({ onScrollToFeatures }: HeroSectionProps) {
  const { openEmailModal } = useModalContext();
  const [joinCount, setJoinCount] = useState(468);
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 4); // 4 hours in seconds
  const [liveJoinIndex, setLiveJoinIndex] = useState(0);

  useEffect(() => {
    const emailTimer = setTimeout(() => {
      openEmailModal();
    }, 5000);

    const countInterval = setInterval(() => {
      setJoinCount((prev) => Math.min(prev + Math.floor(Math.random() * 2) + 1, 5000));
    }, 5000);

    const timeInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const liveJoinTimer = setInterval(() => {
      setLiveJoinIndex((i) => (i + 1) % liveUsers.length);
    }, 8000);

    return () => {
      clearTimeout(emailTimer);
      clearInterval(countInterval);
      clearInterval(timeInterval);
      clearInterval(liveJoinTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen pt-28 pb-20 px-6 overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-800 text-white font-sans"
    >
      {/* Live Join Floating Pill */}
      <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl text-base font-semibold text-white z-50 shadow-lg animate-pulse">
        👤 {liveUsers[liveJoinIndex]} just joined Triponic
      </div>

      {/* Background blobs */}
      <div className="absolute -top-[280px] -right-[250px] w-[500px] h-[500px] bg-pink-500 opacity-20 blur-[160px] rounded-full mix-blend-multiply"></div>
      <div className="absolute top-[35%] -left-[200px] w-[400px] h-[400px] bg-yellow-400 opacity-20 blur-[150px] rounded-full mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-20 w-[400px] h-[400px] bg-blue-500 opacity-20 blur-[150px] rounded-full mix-blend-multiply"></div>

      {/* Sparkles */}
      <div className="absolute top-10 left-10 text-white/30 animate-pulse">✨</div>
      <div className="absolute bottom-10 right-10 text-white/40 animate-pulse">✨</div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium flex items-center">
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Travel Made Simple
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white"
          >
            <span>Your Dream</span>
            <span className="block">Vacation,</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
              Designed by AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg mb-2 max-w-lg text-white/80"
          >
            Our advanced AI creates personalized travel experiences that adapt to your preferences, emotions, and travel style.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-sm text-purple-200 font-semibold mb-2"
          >
            🔥 Already {joinCount.toLocaleString()} explorers joined Triponic
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-sm text-yellow-200 font-semibold mb-6"
          >
            ⏰ Early access closes in {formatTime(timeLeft)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={openEmailModal}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all text-white px-6 py-3 rounded-full font-medium flex items-center shadow-lg"
            >
              Start Your Adventure →
            </button>
            <button
              onClick={onScrollToFeatures}
              className="border border-white/30 hover:bg-white/10 transition-all text-white px-6 py-3 rounded-full font-medium"
            >
              Explore Features
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-4"
          >
            {[
              "Emotion-based recommendations",
              "1000+ destinations",
              "Smart itineraries",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-full px-4 py-2 text-sm flex items-center text-white/80"
              >
                ✨ {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE — Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="/herophoto.png" // Make sure this image is inside /public
            alt="Triponic Preview"
            className="w-[300px] md:w-[400px] rounded-2xl shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
