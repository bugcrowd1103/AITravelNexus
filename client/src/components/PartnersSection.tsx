import { motion } from "framer-motion";

const partners = [
  { name: "AirTravel", icon: <YourIcon1 /> },
  { name: "LuxStay", icon: <YourIcon2 /> },
  { name: "AI Tech", icon: <YourIcon3 /> },
  { name: "WorldExp", icon: <YourIcon4 /> },
  // Duplicate for seamless loop
  { name: "AirTravel", icon: <YourIcon1 /> },
  { name: "LuxStay", icon: <YourIcon2 /> },
  { name: "AI Tech", icon: <YourIcon3 /> },
  { name: "WorldExp", icon: <YourIcon4 /> },
];

// Replace with your original SVGs
function YourIcon1() {
  return (
    <svg className="w-6 h-6 text-pink-400 mr-2" viewBox="0 0 24 24" fill="none">
      <path d="M22.5 14.5L23.5 16H21.5..." stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function YourIcon2() {
  return (
    <svg className="w-6 h-6 text-purple-400 mr-2" viewBox="0 0 24 24" fill="none">
      <path d="M19 21V5a2 2 0 00..." stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function YourIcon3() {
  return (
    <svg className="w-6 h-6 text-cyan-400 mr-2" viewBox="0 0 24 24" fill="none">
      <path d="M7 8l-4 4 4 4M..." stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function YourIcon4() {
  return (
    <svg className="w-6 h-6 text-blue-400 mr-2" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a10 10 0 100..." stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative py-24 px-6 bg-[#0e0e1a] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500 opacity-30 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] bg-pink-500 opacity-20 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
            Backed by Visionaries
          </h2>
          <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
            Collaborating with leaders in travel, AI, and immersive tech.
          </p>
        </div>

        {/* Autoplay Marquee */}
        <div className="overflow-hidden relative">
          <div className="flex gap-6 animate-marquee whitespace-nowrap w-max">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="min-w-[220px] bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-lg shadow-md hover:scale-105 hover:shadow-xl hover:border-pink-500 transition duration-300 flex items-center"
              >
                {partner.icon}
                <span className="font-semibold text-white text-base tracking-wide">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
