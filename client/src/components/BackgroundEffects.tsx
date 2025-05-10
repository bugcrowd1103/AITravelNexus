import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <>
      {/* Background Orbs */}
      <motion.div 
        animate={{ 
          rotate: 360,
          opacity: [0.3, 0.2, 0.3]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-[500px] h-[500px] top-[10%] left-[-10%] opacity-30 absolute bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)] rounded-full z-0"
      />
      
      <motion.div 
        animate={{ 
          rotate: 360,
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-[700px] h-[700px] top-[40%] right-[-15%] opacity-20 absolute bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)] rounded-full z-0"
      />
    </>
  );
}
