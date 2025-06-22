"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./search/SearchModal";

// SEO-friendly Link Component
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-lg font-medium transition-colors ${
        isActive ? "text-gradient" : "text-white hover:text-yellow-400"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF]"
          layoutId="underline"
        />
      )}
    </Link>
  );
};

// Navigation links configuration
const navLinks = [
  { name: "Movies", href: "/movies" },
  { name: "TV Shows", href: "/tv" },
  { name: "Genres", href: "/genres" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search modal with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Site Title / Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className={`flex-shrink-0 text-3xl font-bold tracking-wider transition-colors ${
                  usePathname() === "/"
                    ? "text-gradient"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                Sirb
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <AnimatePresence>
                {navLinks.map((link) => (
                  <NavLink key={link.name} href={link.href}>
                    {link.name}
                  </NavLink>
                ))}
              </AnimatePresence>
            </div>

            {/* Search and Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Open search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white focus:outline-none"
                  aria-label="Open mobile menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 w-full h-screen bg-black/90 z-40 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-[20%] right-5 text-white"
                aria-label="Close mobile menu"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <ul className="flex flex-col items-center gap-y-8">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl font-bold text-white hover:text-yellow-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
