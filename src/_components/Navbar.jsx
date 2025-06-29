"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "./search/SearchModal";

// SEO-friendly Link Component with Arabic support
const NavLink = ({ href, children, ariaLabel }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
      className={`relative text-lg font-medium transition-colors duration-300 ${
        isActive ? "text-gradient" : "text-white hover:text-yellow-400"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-[-4px] right-0 left-0 h-[2px] bg-gradient-to-l from-[#D6C7FF] to-[#AB8BFF]"
          layoutId="underline"
        />
      )}
    </Link>
  );
};

// Navigation links configuration in Arabic
const navLinks = [
  { name: "أفلام", href: "/movies", ariaLabel: "تصفح الأفلام" },
  { name: "مسلسلات", href: "/tv", ariaLabel: "تصفح المسلسلات" },
  { name: "التصنيفات", href: "/genres", ariaLabel: "تصفح التصنيفات" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search modal and mobile menu with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`m-0 fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary/85 backdrop-blur-sm shadow-lg"
            : "bg-primary/90 backdrop-blur-sm"
        }`}
        dir="rtl"
        lang="ar"
      >
        <nav
          aria-label="القائمة الرئيسية"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between h-20">
            {/* Site Title / Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="العودة للصفحة الرئيسية"
                className={`flex-shrink-0 text-3xl font-bold tracking-wider transition-colors duration-300 ${
                  pathname === "/"
                    ? "text-gradient"
                    : "text-white hover:text-yellow-400"
                }`}
              >
                <h1 className="text-3xl font-bold">سيرب</h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-6">
              <AnimatePresence>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                  >
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
                className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-primary"
                aria-label="فتح البحث"
                aria-expanded={isSearchOpen}
                aria-controls="search-modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-primary"
                  aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.section
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 left-0 w-full h-screen bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
              aria-label="القائمة المتحركة"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="إغلاق القائمة"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <nav
                aria-label="القائمة المتحركة"
                className="flex flex-col items-center"
              >
                <ul className="flex flex-col items-center gap-y-8">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        href={link.href}
                        aria-label={link.ariaLabel}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                        className="text-3xl font-bold text-white hover:text-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-4 py-2"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.section>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
