"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchSection from "../_components/SearchSection";
import FeaturedMovie from "../_components/FeaturedMovie";
import MovieSection from "../_components/movies/MovieSection";
import TVSection from "../_components/tv/TVSection";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

export default function Page() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  useEffect(() => {
    fetchFeaturedMovie();
    fetchTrendingMovies();
  }, []);

  const fetchFeaturedMovie = async () => {
    try {
      setIsLoadingFeatured(true);
      // Get trending movies and pick the first one as featured
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        API_OPTIONS
      );

      if (response.data.results.length > 0) {
        const movie = response.data.results[0];
        // Get movie details including runtime
        const detailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}`,
          API_OPTIONS
        );

        // Get movie videos for trailer
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          API_OPTIONS
        );

        const trailer = videosResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setFeaturedMovie({
          ...detailsResponse.data,
          video_key: trailer?.key,
        });
      }
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    } finally {
      setIsLoadingFeatured(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        API_OPTIONS
      );

      if (response.data.results.length > 0) {
        setTrendingMovies(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  return (
    <main className="min-h-screen relative bg-primary">
      {/* Featured Movie Section */}
      {/* {!isLoadingFeatured && featuredMovie && (
        <FeaturedMovie movie={featuredMovie} trendingMovies={trendingMovies} />
      )} */}

      {/* Search Section */}
      <SearchSection />

      {/* Trending Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <MovieSection
          sectionTitle="Trending Movies"
          requestKey="fetchTrending"
        />
      </motion.div>

      {/* Top Rated Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <MovieSection
          sectionTitle="Top Rated Movies"
          requestKey="fetchTopRated"
        />
      </motion.div>

      {/* Trending TV Shows Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TVSection
          sectionTitle="Trending TV Shows"
          requestKey="fetchTrending"
        />
      </motion.div>

      {/* Action Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MovieSection
          sectionTitle="Action Movies"
          requestKey="fetchActionMovies"
        />
      </motion.div>

      {/* Comedy Movies Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <MovieSection
          sectionTitle="Comedy Movies"
          requestKey="fetchComedyMovies"
        />
      </motion.div>
    </main>
  );
}
