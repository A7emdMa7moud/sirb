"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { debounce } from "lodash";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import movieRequests from "@/api/movieRequests";
import SearchCard from "./SearchCard";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { history, addSearchTerm, removeSearchTerm, clearHistory } = useSearchHistory();
  const inputRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length > 1) {
        setIsLoading(true);
        try {
          const res = await axios.get(
            movieRequests.searchMulti(searchQuery),
            API_OPTIONS
          );
          const validResults = res.data.results.filter(
            (item) =>
              (item.media_type === "movie" || item.media_type === "tv") &&
              item.poster_path
          );
          setResults(validResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 350),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  useEffect(() => {
    // Focus the input when the modal opens
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) addSearchTerm(query);
  };

  const handleHistoryClick = (term) => setQuery(term);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };
  
  const onLinkClick = () => {
    if (query.trim()) addSearchTerm(query);
    handleClose();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-400 pt-10" dir="rtl" lang="ar">
          جاري البحث...
        </div>
      );
    }

    if (query && results.length > 0) {
      return (
        <>
          <h2 className="text-xl font-semibold mb-4" dir="rtl" lang="ar">
            نتائج البحث عن &quot;{query}&quot;
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {results.map((item) => (
              <motion.div
                variants={itemVariants}
                key={`${item.media_type}-${item.id}`}
              >
                <SearchCard item={item} onLinkClick={onLinkClick} />
              </motion.div>
            ))}
          </motion.div>
        </>
      );
    }

    if (query && results.length === 0) {
      return (
        <div className="text-center text-gray-400 pt-10" dir="rtl" lang="ar">
          <p>لم يتم العثور على نتائج لـ &quot;{query}&quot;.</p>
          <p className="text-sm">
            حاول التحقق من الإملاء أو البحث عن شيء آخر.
          </p>
        </div>
      );
    }

    if (!query && history.length > 0) {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          dir="rtl"
          lang="ar"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">البحث الأخير</h2>
            <button
              onClick={clearHistory}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-2 py-1"
              aria-label="مسح كل سجل البحث"
            >
              مسح الكل
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {history.map((term) => (
              <motion.div variants={itemVariants} key={term}>
                <div className="group inline-flex items-center bg-gray-800/80 rounded-full transition-colors duration-200 hover:bg-gray-700/70">
                  <span
                    onClick={() => handleHistoryClick(term)}
                    className="text-light-100 text-right pr-4 pl-2 py-2 cursor-pointer truncate"
                  >
                    {term}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent search when deleting
                      removeSearchTerm(term);
                    }}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 ml-1 rounded-full text-gray-500 hover:text-white transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    aria-label={`إزالة ${term} من سجل البحث`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <div className="text-center text-gray-400 pt-10" dir="rtl" lang="ar">
        <p className="text-lg">ابحث عن فيلم أو مسلسل تلفزيوني جديد.</p>
        <p className="text-sm">ابدأ بالكتابة في شريط البحث أعلاه.</p>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start pt-[10vh]"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="نافذة البحث"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-primary/90 border border-gray-700/50 rounded-xl shadow-2xl w-[90vw] max-w-5xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        lang="ar"
      >
        <div className="p-4 border-b border-gray-700/50 flex-shrink-0">
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن فيلم أو مسلسل تلفزيوني..."
              className="w-full bg-gray-800/80 text-white placeholder-gray-400 px-5 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-transparent focus:border-transparent text-right"
              aria-label="شريط البحث"
              dir="rtl"
              lang="ar"
            />
          </form>
        </div>
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700/80 scrollbar-track-transparent">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchModal;
