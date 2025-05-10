import { motion } from "framer-motion";

const footerLinks = {
  Platform: ["Features", "Roadmap", "Beta Program"],
  Company: ["About", "Careers", "Press Kit"],
  Resources: ["Blog", "Partners", "Support"],
  Legal: ["Privacy", "Terms", "Security"],
  Contact: ["41 George St. S, Brampton", "+1 343-989-7204", "triponicai@gmail.com"],
};

const socialLinks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    href: "https://x.com/triponic_ai",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </svg>
    ),
    href: "https://www.instagram.com/triponic.ai/",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.78-1.75-1.75S5.53 5.2 6.5 5.2s1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.08-.92-2-2-2s-2 .92-2 2v4.5h-3v-9h3v1.23c.43-.67 1.22-1.23 2-1.23 2.21 0 4 1.79 4 4v5z"/>
      </svg>
    ),
    href: "https://www.linkedin.com/company/triponic/?viewAsMember=true",
  },
];

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-[#0e0d1c] text-white border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Brand & Social */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-transparent drop-shadow-glow">
              Triponic
            </h2>
            <p className="mt-2 text-sm text-white/60 max-w-md">
              Revolutionizing luxury travel with AI-powered personalization and immersive experiences.
            </p>
          </div>
          <div className="flex gap-5">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-transform hover:scale-110 hover:drop-shadow-glow"
                aria-label={`Social ${i + 1}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Link columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-10 text-sm"
        >
          {Object.entries(footerLinks).map(([title, items], i) => (
            <div key={i}>
              <h4 className="font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2 text-white/60">
                {items.map((item, j) => (
                  <li key={j}>
                    {title === "Contact" && item.includes("@") ? (
                      <a href={`mailto:${item}`} className="hover:text-pink-400 hover:underline">
                        {item}
                      </a>
                    ) : title === "Contact" && item.includes("+") ? (
                      <a href={`tel:${item.replace(/\s+/g, '')}`} className="hover:text-pink-400 hover:underline">
                        {item}
                      </a>
                    ) : (
                      <span>{item}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center text-xs text-white/50 border-t border-white/10 pt-6"
        >
          <span>&copy; {new Date().getFullYear()} Triponic. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Made with 💜 for world explorers</span>
        </motion.div>
      </div>
    </footer>
  );
}
