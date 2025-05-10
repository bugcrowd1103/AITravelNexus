// FeaturesSection.tsx — Immersive Feature Carousel with Ref Support
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Sparkles, Map, Compass, Users, Smartphone, Wallet,
  Bot, Calendar, Eye, ShieldCheck, Languages, MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import Tilt from 'react-parallax-tilt';
import React from "react";

const features = [
  { icon: Sparkles, title: "AI & Personalization", desc: "Emotion-based suggestions powered by behavior analytics." },
  { icon: Map, title: "Smart Planning", desc: "Visual itineraries, offline access & real-time syncing." },
  { icon: Compass, title: "Local Experience", desc: "Hidden gems, eco-tourism & authentic local vibes." },
  { icon: Users, title: "Community & Gamification", desc: "Trip sharing, badges & group collab tools." },
  { icon: Smartphone, title: "Device Integration", desc: "Smartwatch widgets, AR tours & voice assistants." },
  { icon: Wallet, title: "Budget Assistant", desc: "Live conversion, bill splitting & expense tracking." },
  { icon: Bot, title: "AI Concierge", desc: "Plan, modify and book — all via your smart travel assistant." },
  { icon: Calendar, title: "Time Predictor", desc: "Know the best time to go using cost + crowd + weather AI." },
  { icon: Eye, title: "AR/VR Preview", desc: "Try before you fly — immersive 360° previews of attractions." },
  { icon: ShieldCheck, title: "Safety Alerts", desc: "Scam reports, traveler warnings, and secure zones." },
  { icon: Languages, title: "Language Buddy", desc: "Practice phrases, etiquette tips, and AI translation." },
  { icon: MessageSquare, title: "Verified Reviews", desc: "Only real, AI-vetted traveler feedback shown." }
];

function chunkArray(array: any[], size: number) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

const FeaturesSection = React.forwardRef<HTMLElement>((_, ref) => {
  const slides = chunkArray(features, 6);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    renderMode: "performance",
    created(slider) {
      setInterval(() => slider.next(), 5000);
    },
  });

  return (
    <section
      ref={ref}
      id="features"
      className="relative w-full py-24 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden"
    >
      {/* Diagonal Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[12vw] font-extrabold uppercase text-white/5 select-none pointer-events-none z-0">
        Coming Soon
      </div>

      {/* Glowing background trails */}
      <div className="absolute -top-32 left-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400/10 blur-[100px] rounded-full animate-pulse" />

      <div className="text-center mb-12 relative z-10">
        <span className="inline-block text-sm bg-pink-500/10 text-pink-300 px-4 py-1 rounded-full mb-3">
          🚀 Coming Soon
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Experience the Future of <span className="bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">AI Travel</span>
        </h2>
      </div>

      <div ref={sliderRef} className="keen-slider relative z-10">
        {slides.map((group, i) => (
          <div
            key={i}
            className="keen-slider__slide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
          >
            {group.map((feature, j) => {
              const Icon = feature.icon;
              return (
                <Tilt
                  key={j}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  glareEnable={false}
                  className="w-full h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: j * 0.1 }}
                    viewport={{ once: true }}
                    className="w-full h-full bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all"
                  >
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-500 text-white mb-4 shadow-lg">
                      <span className="absolute w-full h-full rounded-2xl animate-ping bg-pink-500/30 z-0" />
                      <Icon className="w-7 h-7 z-10 relative" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                </Tilt>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";
export default FeaturesSection;
