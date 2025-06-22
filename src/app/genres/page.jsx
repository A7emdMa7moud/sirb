"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import axios from "axios";
import { motion } from "framer-motion";
import movieRequests from "@/api/movieRequests";
import tvRequests from "@/api/tvRequests";
// import MovieCard from "@/components/card/MovieCard";
import MovieCard from "@/_components/card/MovieCard";
import TvCard from "@/_components/card/TvCard";
import Loading from "@/_components/Loading";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

function GenresPageContent() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenresResponse, tvGenresResponse] = await Promise.all([
          axios.get(movieRequests.fetchMovieGenres, API_OPTIONS),
          axios.get(tvRequests.fetchTvGenres, API_OPTIONS),
        ]);

        const movieGenres = movieGenresResponse.data.genres;
        const tvGenres = tvGenresResponse.data.genres;
        
        const allGenresMap = new Map();

        movieGenres.forEach(genre => {
            if (!allGenresMap.has(genre.id)) {
                allGenresMap.set(genre.id, { ...genre, isMovie: true, isTv: false });
            } else {
                allGenresMap.get(genre.id).isMovie = true;
            }
        });

        tvGenres.forEach(genre => {
            if (!allGenresMap.has(genre.id)) {
                allGenresMap.set(genre.id, { ...genre, isMovie: false, isTv: true });
            } else {
                allGenresMap.get(genre.id).isTv = true;
            }
        });
        
        const uniqueGenres = Array.from(allGenresMap.values()).sort((a, b) => a.name.localeCompare(b.name));
        setGenres(uniqueGenres);

        // Check for genre ID from URL after fetching all genres
        const genreIdFromUrl = searchParams.get('genre');
        if (genreIdFromUrl) {
          const genreToSelect = uniqueGenres.find(g => g.id === parseInt(genreIdFromUrl));
          if (genreToSelect) {
            setSelectedGenre(genreToSelect);
          }
        }

      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [searchParams]);

  useEffect(() => {
    if (selectedGenre) {
      fetchContentByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  const fetchContentByGenre = async (genre) => {
    setIsLoading(true);
    setMovies([]);
    setTvShows([]);
    try {
      const moviePromise = genre.isMovie
        ? axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`, API_OPTIONS)
        : Promise.resolve({ data: { results: [] } });

      const tvPromise = genre.isTv
        ? axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}`, API_OPTIONS)
        : Promise.resolve({ data: { results: [] } });

      const [moviesResponse, tvShowsResponse] = await Promise.all([
        moviePromise,
        tvPromise,
      ]);
      
      setMovies(moviesResponse.data.results);
      setTvShows(tvShowsResponse.data.results);
    } catch (error) {
      console.error(`Error fetching content for genre ${genre.id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="min-h-screen bg-primary text-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gradient">
          Browse by Genre
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {genres.map((genre) => (
            <motion.button
              key={`${genre.id}-${genre.name}`}
              onClick={() => handleGenreClick(genre)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedGenre?.id === genre.id
                  ? "text-gradient bg-gray-900 scale-110 shadow-lg ring-1 ring-purple-500"
                  : "bg-gray-800/60 hover:bg-gray-700/80"
              }`}
              whileHover={{ y: -2 }}
            >
              {genre.name}
            </motion.button>
          ))}
        </div>

        {selectedGenre && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-4">
                Results for: <span className="text-yellow-400">{selectedGenre.name}</span>
              </h2>

              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {movies.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-xl font-semibold mb-4">Movies</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {movies.map((movie) => (
                          <MovieCard key={movie.id} movie={movie} />
                        ))}
                      </div>
                    </div>
                  )}

                  {tvShows.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">TV Shows</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {tvShows.map((tvShow) => (
                          <TvCard key={tvShow.id} show={tvShow} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {movies.length === 0 && tvShows.length === 0 && (
                     <p className="text-light-200 text-center mt-8">No movies or TV shows found for this genre.</p>
                  )}
                </>
              )}
            </div>
        )}
      </div>
    </div>
  );
}

// We need to wrap the component that uses useSearchParams in a Suspense boundary.
export default function GenresPage() {
    return (
        <Suspense fallback={<Loading />}>
            <GenresPageContent />
        </Suspense>
    )
}
