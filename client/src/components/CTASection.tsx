// ✅ CTASection.tsx
import { motion } from "framer-motion";
import { useModalContext } from "../context/ModalContext";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { ForwardedRef } from "react";

const pricingTiers = [
  {
    name: "Basic",
    price: "0",
    period: "/year",
    subtitle: "Essential travel planning",
    description: "Free forever",
    features: [
      "Basic itinerary planning",
      "Limited destination search",
      "Community recommendations",
      "Basic weather information",
      "Web access only",
    ],
    buttonLabel: "Get Started",
  },
  {
    name: "Premium",
    price: "29",
    period: "/year",
    subtitle: "Enhanced travel experience",
    description: "Everything in Basic",
    features: [
      "Unlimited AI-powered itineraries",
      "Personalized recommendations",
      "Real-time updates and alerts",
      "Mobile app access",
      "Offline downloads",
      "Priority customer support",
    ],
    badge: "MOST POPULAR",
    buttonLabel: "Subscribe Now",
  },
  {
    name: "Pro",
    price: "49",
    period: "/year",
    subtitle: "Ultimate travel luxury",
    description: "Everything in Premium",
    features: [
      "VIP concierge service",
      "Exclusive deals and discounts",
      "Flight and hotel price tracking",
      "Last-minute booking assistance",
      "Family sharing up to 5 users",
      "Augmented Reality experiences",
      "24/7 emergency travel support",
    ],
    buttonLabel: "Subscribe Now",
  },
];

const testimonials = [
  {
    name: "Aarav S.",
    role: "Solo Traveler",
    quote:
      "Triponic changed the way I explore. AI gave me recommendations that felt like it read my mind!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Riya T.",
    role: "Adventure Blogger",
    quote:
      "The AR previews are a game-changer. I planned my whole trip visually before even booking!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Kabir V.",
    role: "Remote Worker",
    quote:
      "Loved the community tips. Got a local food gem recommendation that wasn't on Google Maps!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const CTASection = React.forwardRef<HTMLElement, {}>((_, ref: ForwardedRef<HTMLElement>) => {
  const { openEmailModal } = useModalContext();
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
    created(slider) {
      setInterval(() => slider.next(), 7000);
    },
  });

  return (
    <section
      ref={ref}
      id="pricing"
      className="py-24 px-6 bg-gradient-to-br from-white via-purple-50 to-white relative text-gray-800"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-80px] left-[-100px] w-[500px] h-[500px] bg-pink-400 opacity-10 blur-3xl rounded-full" />
        <div className="absolute top-[20%] right-[-80px] w-[400px] h-[400px] bg-purple-500 opacity-10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Pick Your <span className="text-pink-600">Travel Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Tailored plans to match your travel goals. All tiers include early access to our AI innovations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-3xl shadow-xl border p-8 flex flex-col justify-between text-left ${
                tier.badge ? "border-pink-400 ring-2 ring-pink-200" : "border-gray-200"
              }`}
            >
              {tier.badge && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                  {tier.badge}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{tier.name}</h3>
                <p className="text-sm text-purple-600 mb-3">{tier.subtitle}</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                  <span className="text-gray-600 ml-2">{tier.period}</span>
                </div>
                <p className="text-gray-600 mb-6 text-base">{tier.description}</p>
              </div>
              <ul className="text-sm text-gray-800 mb-6 space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setTimeout(() => openEmailModal(), 200)}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all text-base ${
                  tier.name === "Premium"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-110"
                    : "border border-purple-300 text-purple-600 hover:bg-purple-50"
                }`}
              >
                {tier.buttonLabel}
              </button>
            </motion.div>
          ))}
        </div>

        <div id="testimonials" className="mt-28 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900"
          >
            What Our Explorers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-xl mx-auto mb-12 text-lg"
          >
            Real feedback from real travelers around the world 🌍
          </motion.p>

          <div ref={sliderRef} className="keen-slider">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="keen-slider__slide bg-white border border-gray-200 p-8 rounded-3xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base">{t.name}</h4>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">“{t.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = "CTASection";
export default CTASection;
