// Coming Soon Landing Page - AR/VR Travel Teaser with Video + Image Fallback
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useModalContext } from "../context/ModalContext";
import React from "react";

const ExperienceShowcase = forwardRef<HTMLElement>((_, ref) => {
  const { openEmailModal } = useModalContext();

  return (
    <section
      ref={ref}
      id="about"
      className="relative h-screen w-full overflow-hidden text-white"
    >
      {/* Background Video (Desktop) & Image (Mobile) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          className="hidden md:block w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/VR.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img
          src="/hero.jpg"
          alt="Triponic Hero"
          className="block md:hidden w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4"
      >
        <p className="text-sm uppercase tracking-widest text-pink-300 mb-3">
          Coming Soon
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Travel the World<br />
          <span className="text-pink-400">Through AR & VR</span>
        </h1>
        <p className="max-w-xl text-base md:text-lg text-gray-200 mb-10">
          Dive into immersive 360° previews, walkthroughs, and interactive destination tours — powered by AI.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={openEmailModal}
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-white text-sm font-semibold rounded-full shadow-lg hover:from-pink-400 hover:to-purple-500 transition-all duration-200"
        >
          Get Early Access
        </motion.button>
      </motion.div>
    </section>
  );
});

ExperienceShowcase.displayName = "ExperienceShowcase";

export default ExperienceShowcase;