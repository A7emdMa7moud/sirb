"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import axios from "axios";
import MovieCard from "./card/MovieCard";
import Loading from "./Loading";
import LoadingAndErrorStatus from "./status/LoadingAndErrorStatus";
import movieRequests from "../api/movieRequests";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

// ترجمة التصنيفات إلى العربية
const genreTranslations = {
  Action: "أكشن",
  Adventure: "مغامرة",
  Animation: "رسوم متحركة",
  Comedy: "كوميديا",
  Crime: "جريمة",
  Documentary: "وثائقي",
  Drama: "دراما",
  Family: "عائلي",
  Fantasy: "فانتازيا",
  History: "تاريخي",
  Horror: "رعب",
  Music: "موسيقى",
  Mystery: "غموض",
  Romance: "رومانسي",
  "Science Fiction": "خيال علمي",
  "TV Movie": "فيلم تلفزيوني",
  Thriller: "إثارة",
  War: "حرب",
  Western: "غربي",
};

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [searchError, setSearchError] = useState("");
  const [popularError, setPopularError] = useState("");
  const [movieGenres, setMovieGenres] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentGenreId, setCurrentGenreId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch popular movies and genres on component mount
  useEffect(() => {
    fetchPopularMovies();
    fetchMovieGenres();
  }, []);

  // Search movies when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim() && !selectedGenre) {
        searchMovies(searchQuery);
      } else if (!searchQuery.trim() && !selectedGenre) {
        setSearchResults([]);
        setSearchError("");
      }
    }, 500); // Debounce search for 500ms

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, selectedGenre]);

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchMovieGenres = async () => {
    try {
      setIsLoadingGenres(true);
      const response = await axios.get(
        movieRequests.fetchMovieGenres,
        API_OPTIONS
      );
      setMovieGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching movie genres:", error);
    } finally {
      setIsLoadingGenres(false);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      setIsLoadingPopular(true);
      setPopularError("");
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc",
        API_OPTIONS
      );
      setPopularMovies(response.data.results.slice(0, 20)); // Show first 20 movies
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setPopularError(
        "فشل في تحميل الأفلام الشائعة. يرجى المحاولة مرة أخرى لاحقاً."
      );
    } finally {
      setIsLoadingPopular(false);
    }
  };

  const searchMovies = async (query) => {
    try {
      setIsSearching(true);
      setSearchError("");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}`,
        API_OPTIONS
      );
      setSearchResults(response.data.results);
      // Scroll to top after search
      setTimeout(scrollToTop, 100);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError("فشل في البحث عن الأفلام. يرجى المحاولة مرة أخرى.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchMoviesByGenre = async (genreId, genreName, page = 1) => {
    try {
      setIsSearching(true);
      setSearchError("");
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`,
        API_OPTIONS
      );
      setSearchResults(response.data.results);
      setSearchQuery(genreName); // Set the genre name in search field for display
      setCurrentPage(page);
      setTotalPages(response.data.total_pages);
      setCurrentGenreId(genreId);
      setSelectedGenre({ id: genreId, name: genreName });
      // Scroll to top after genre selection
      setTimeout(scrollToTop, 100);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      setSearchError("فشل في جلب الأفلام حسب التصنيف. يرجى المحاولة مرة أخرى.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || selectedGenre) return;
    await searchMovies(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
    setCurrentPage(1);
    setTotalPages(0);
    setCurrentGenreId(null);
    setSelectedGenre(null);
    // Scroll to top after clearing
    setTimeout(scrollToTop, 100);
  };

  const clearSelectedGenre = () => {
    setSelectedGenre(null);
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
    setCurrentPage(1);
    setTotalPages(0);
    setCurrentGenreId(null);
    // Scroll to top after clearing genre
    setTimeout(scrollToTop, 600);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1 && currentGenreId) {
      const genre = movieGenres.find((g) => g.id === currentGenreId);
      if (genre) {
        fetchMoviesByGenre(currentGenreId, genre.name, currentPage - 1);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && currentGenreId) {
      const genre = movieGenres.find((g) => g.id === currentGenreId);
      if (genre) {
        fetchMoviesByGenre(currentGenreId, genre.name, currentPage + 1);
      }
    }
  };

  return (
    <main className="min-h-screen relative bg-primary" dir="rtl" lang="ar">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 px-4 sm:px-6 lg:px-8 pt-20"
      >
        {/* Show search form only when no genre is selected */}
        {!selectedGenre && (
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن أفلام، مسلسلات، ممثلين..."
                  className="w-full px-6 py-4 pr-14 pl-12 text-lg bg-light-100/5 backdrop-blur-lg border border-light-100/20 rounded-2xl text-white placeholder-light-200 focus:outline-none focus:ring-2 focus:ring-light-100 focus:border-transparent transition-all duration-300 text-right"
                  aria-label="شريط البحث عن الأفلام والمسلسلات"
                  dir="rtl"
                  lang="ar"
                />

                {/* Search Icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search
                    className="w-6 h-6 text-light-200"
                    aria-hidden="true"
                  />
                </div>

                {/* Clear Button */}
                {searchQuery && (
                  <motion.button
                    type="button"
                    onClick={clearSearch}
                    className="absolute left-4 top-[25%] p-1 hover:bg-light-100/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    aria-label="مسح البحث"
                  >
                    <X className="w-5 h-5 text-light-200" aria-hidden="true" />
                  </motion.button>
                )}
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="px-8 py-4 bg-light-100/10 border border-light-100/20 text-light-100 font-semibold rounded-2xl hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="تنفيذ البحث"
              >
                {isSearching ? (
                  <div className="flex items-center space-x-reverse space-x-2">
                    <div className="w-4 h-4 border-2 border-light-100 border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري البحث...</span>
                  </div>
                ) : (
                  "بحث"
                )}
              </motion.button>
            </div>
          </form>
        )}

        {/* Selected Genre Display */}
        {selectedGenre && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white">
                أفلام{" "}
                {genreTranslations[selectedGenre.name] || selectedGenre.name}
              </h2>
              <button
                onClick={clearSelectedGenre}
                className="px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                aria-label="إلغاء التصنيف المحدد"
              >
                إلغاء
              </button>
            </div>
          </motion.div>
        )}

        {/* Movie Genres */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 text-center"
        >
          <h3 className="text-sm font-medium text-light-200 mb-3">
            {selectedGenre ? "تصفح تصنيفات أخرى" : "تصفح حسب التصنيف"}
          </h3>
          {isLoadingGenres ? (
            <div className="flex justify-center">
              <div
                className="w-4 h-4 border-2 border-light-100 border-t-transparent rounded-full animate-spin"
                aria-label="جاري التحميل"
              ></div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2">
              {movieGenres
                .filter(
                  (genre) => !selectedGenre || genre.id !== selectedGenre.id
                )
                .map((genre) => (
                  <motion.button
                    key={genre.id}
                    onClick={() => fetchMoviesByGenre(genre.id, genre.name)}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                      selectedGenre?.id === genre.id
                        ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                        : "bg-light-100/5 border border-light-100/20 text-light-200 hover:bg-light-100/10 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`تصفح أفلام ${
                      genreTranslations[genre.name] || genre.name
                    }`}
                  >
                    {genreTranslations[genre.name] || genre.name}
                  </motion.button>
                ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Search Results */}
      {(searchQuery || selectedGenre) && (
        <LoadingAndErrorStatus
          isLoading={isSearching}
          errorMessage={searchError}
          sectionTitle={
            selectedGenre
              ? `أفلام ${
                  genreTranslations[selectedGenre.name] || selectedGenre.name
                }`
              : `نتائج البحث عن "${searchQuery}"`
          }
          requestKey="search"
        >
          <div className="px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="mb-10 text-2xl font-semibold text-white">
              {searchResults.length > 0 && selectedGenre
                ? `أفلام ${
                    genreTranslations[selectedGenre.name] || selectedGenre.name
                  } (${searchResults.length} فيلم)`
                : searchResults.length > 0 &&
                  movieGenres.some((genre) => genre.name === searchQuery)
                ? `أفلام ${genreTranslations[searchQuery] || searchQuery} (${
                    searchResults.length
                  } فيلم)`
                : `نتائج البحث عن "${searchQuery}" (${searchResults.length} فيلم)`}
            </h2>
            <motion.ul
              className="flex flex-wrap gap-6 justify-center"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {searchResults.map((movie, index) => (
                <motion.li
                  key={movie.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="flex-shrink-0"
                >
                  <MovieCard movie={movie} index={index} />
                </motion.li>
              ))}
            </motion.ul>

            {/* Pagination */}
            {currentGenreId && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center items-center gap-4 mt-8"
              >
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="الصفحة السابقة"
                >
                  السابق
                </button>

                <span className="text-light-200 px-4 py-2">
                  صفحة {currentPage} من {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="الصفحة التالية"
                >
                  التالي
                </button>
              </motion.div>
            )}
          </div>
        </LoadingAndErrorStatus>
      )}

      {/* Popular Movies */}
      {!searchQuery && !selectedGenre && (
        <LoadingAndErrorStatus
          isLoading={isLoadingPopular}
          errorMessage={popularError}
          sectionTitle="الأفلام الشائعة"
          requestKey="popular"
        >
          <div className="px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="mb-10 text-2xl font-semibold text-white">
              الأفلام الشائعة
            </h2>
            <motion.ul
              className="flex flex-wrap gap-6 justify-center"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {popularMovies.map((movie, index) => (
                <motion.li
                  key={movie.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="flex-shrink-0"
                >
                  <MovieCard movie={movie} index={index} />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </LoadingAndErrorStatus>
      )}
    </main>
  );
};

export default SearchSection;
