import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useModalContext } from "../context/ModalContext";
import React from "react";

interface NavbarProps {
  onScrollToSection: (
    section: "features" | "about" | "pricing" | "testimonials"
  ) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openEmailModal } = useModalContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollOrWarn = (
    section: "features" | "about" | "pricing" | "testimonials"
  ) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Section '${section}' not found.`);
      alert(`Section '${section}' not found on the page.`);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-800 backdrop-blur-md shadow-xl"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3">
          <img
            src="/Logo.png"
            alt="Triponic Logo"
            className="h-8 w-8 object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent drop-shadow">
              TripOnic
            </span>
            <span className="text-xs text-white/80 font-medium -mt-1 tracking-wider">
              Your Trip, Reimagined by AI
            </span>
          </div>
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
          >
            Home
          </button>
          <button
            onClick={() => handleScrollOrWarn("about")}
            className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => handleScrollOrWarn("features")}
            className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
          >
            Explore
          </button>
          <button
            onClick={() => alert("Planning feature coming soon!")}
            className="text-sm text-pink-400 border border-pink-500 px-3 py-1 rounded-full hover:bg-pink-600/10 transition-all font-semibold"
          >
            Plan{" "}
            <span className="text-[10px] ml-1 bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
              Soon
            </span>
          </button>
          <button
            onClick={() => handleScrollOrWarn("pricing")}
            className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
          >
            Pricing
          </button>
          <button
            onClick={() => handleScrollOrWarn("testimonials")}
            className="text-sm text-white hover:text-cyan-300 transition-colors font-medium"
          >
            Testimonials
          </button>
          <div className="flex space-x-3">
            <button
              onClick={openEmailModal}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition-all text-sm font-semibold shadow-md"
            >
              Sign Up
            </button>
            <button
              onClick={() =>
                alert("Sign in will be available at launch!")
              }
              className="border border-purple-400 text-purple-200 px-5 py-2 rounded-full hover:bg-purple-800/20 transition-all text-sm font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gradient-to-br from-blue-950 via-purple-900 to-indigo-900 text-white mt-2 py-6 px-6 rounded-xl shadow-lg backdrop-blur-xl"
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="text-sm text-white hover:text-cyan-300 transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                handleScrollOrWarn("about");
                setMobileMenuOpen(false);
              }}
              className="text-sm text-white hover:text-cyan-300 transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => {
                handleScrollOrWarn("features");
                setMobileMenuOpen(false);
              }}
              className="text-sm text-white hover:text-cyan-300 transition-colors py-2"
            >
              Explore
            </button>
            <button
              onClick={() => {
                alert("Planning feature coming soon!");
                setMobileMenuOpen(false);
              }}
              className="text-sm text-pink-400 border border-pink-500 px-3 py-1 rounded-full hover:bg-pink-600/10 transition-all font-semibold"
            >
              Plan{" "}
              <span className="text-[10px] ml-1 bg-pink-500 text-white px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            </button>
            <button
              onClick={() => {
                handleScrollOrWarn("pricing");
                setMobileMenuOpen(false);
              }}
              className="text-sm text-white hover:text-cyan-300 transition-colors py-2"
            >
              Pricing
            </button>
            <button
              onClick={() => {
                handleScrollOrWarn("testimonials");
                setMobileMenuOpen(false);
              }}
              className="text-sm text-white hover:text-cyan-300 transition-colors py-2"
            >
              Testimonials
            </button>

            <div className="flex flex-col space-y-3 pt-4">
              <button
                onClick={() => {
                  openEmailModal();
                  setMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition-all text-sm font-semibold shadow"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  alert("Sign in will be available at launch!");
                  setMobileMenuOpen(false);
                }}
                className="border border-purple-400 text-purple-200 px-5 py-2 rounded-full hover:bg-purple-900/30 transition-all text-sm font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
