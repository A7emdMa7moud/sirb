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

  // Fetch popular movies and genres on component mount
  useEffect(() => {
    fetchPopularMovies();
    fetchMovieGenres();
  }, []);

  // Search movies when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        searchMovies(searchQuery);
      } else {
        setSearchResults([]);
        setSearchError("");
      }
    }, 500); // Debounce search for 500ms

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

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
      setPopularError("Failed to load popular movies. Please try again later.");
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
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchError("Failed to search movies. Please try again.");
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
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
      setSearchError("Failed to fetch movies by genre. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await searchMovies(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
    setCurrentPage(1);
    setTotalPages(0);
    setCurrentGenreId(null);
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
    <main className="min-h-screen relative bg-primary">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 px-4 sm:px-6 lg:px-8 pt-20"
      >
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows, actors..."
                className="w-full px-6 py-4 pl-14 pr-12 text-lg bg-light-100/5 backdrop-blur-lg border border-light-100/20 rounded-2xl text-white placeholder-light-200 focus:outline-none focus:ring-2 focus:ring-light-100 focus:border-transparent transition-all duration-300"
              />

              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-6 h-6 text-light-200" />
              </div>

              {/* Clear Button */}
              {searchQuery && (
                <motion.button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-[25%] p-1 hover:bg-light-100/10 rounded-full transition-colors"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <X className="w-5 h-5 text-light-200" />
                </motion.button>
              )}
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="px-8 py-4 bg-light-100/10 border border-light-100/20 text-light-100 font-semibold rounded-2xl hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-light-100 border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Search"
              )}
            </motion.button>
          </div>

          {/* Movie Genres */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 text-center"
            >
              <h3 className="text-sm font-medium text-light-200 mb-3">
                Browse by Genre
              </h3>
              {isLoadingGenres ? (
                <div className="flex justify-center">
                  <div className="w-4 h-4 border-2 border-light-100 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-2">
                  {movieGenres.map((genre) => (
                    <motion.button
                      key={genre.id}
                      onClick={() => fetchMoviesByGenre(genre.id, genre.name)}
                      className="px-3 py-1.5 bg-light-100/5 border border-light-100/20 rounded-full text-light-200 hover:bg-light-100/10 hover:text-white transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {genre.name}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Search Results */}
      {searchQuery && (
        <LoadingAndErrorStatus
          isLoading={isSearching}
          errorMessage={searchError}
          sectionTitle={`Search Results for "${searchQuery}"`}
          requestKey="search"
        >
          <div className="px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="mb-10 capitalize text-2xl font-semibold text-white">
              {searchResults.length > 0 &&
              movieGenres.some((genre) => genre.name === searchQuery)
                ? `${searchQuery} Movies (${searchResults.length} movies)`
                : `Search Results for "${searchQuery}" (${searchResults.length} movies)`}
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
                  className="px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>

                <span className="text-light-200 px-4 py-2">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </LoadingAndErrorStatus>
      )}

      {/* Popular Movies */}
      {!searchQuery && (
        <LoadingAndErrorStatus
          isLoading={isLoadingPopular}
          errorMessage={popularError}
          sectionTitle="Popular Movies"
          requestKey="popular"
        >
          <div className="px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="mb-10 capitalize text-2xl font-semibold text-white">
              Popular Movies
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
