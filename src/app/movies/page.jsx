"use client";

import MovieSection from "../../_components/movies/MovieSection";

export default function MoviesPage() {
  return (
    <section className="min-h-screen pt-20 relative bg-primary">
      <MovieSection sectionTitle="Trending Movies" requestKey="fetchTrending" />
      <MovieSection
        sectionTitle="Top Rated Movies"
        requestKey="fetchTopRated"
      />
      <MovieSection sectionTitle="Upcoming Movies" requestKey="fetchUpcoming" />
      <MovieSection sectionTitle="Now Playing" requestKey="fetchNowPlaying" />
      <MovieSection
        sectionTitle="Action Movies"
        requestKey="fetchActionMovies"
      />
      <MovieSection
        sectionTitle="Comedy Movies"
        requestKey="fetchComedyMovies"
      />
      <MovieSection sectionTitle="Drama Movies" requestKey="fetchDramaMovies" />
      <MovieSection
        sectionTitle="Horror Movies"
        requestKey="fetchHorrorMovies"
      />
      <MovieSection
        sectionTitle="Romance Movies"
        requestKey="fetchRomanceMovies"
      />
      <MovieSection
        sectionTitle="Documentary Movies"
        requestKey="fetchDocumentaryMovies"
      />
    </section>
  );
}
