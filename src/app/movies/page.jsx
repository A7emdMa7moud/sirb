"use client";

import MovieSection from "../../_components/movies/MovieSection";
import Head from "next/head";

export default function MoviesPage() {
  return (
    <>
      <Head>
        <title>أفلام | سيرب - تصفح أحدث وأفضل الأفلام</title>
        <meta
          name="description"
          content="اكتشف أحدث وأفضل الأفلام على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من الأفلام العربية والعالمية."
        />
        <link rel="canonical" href="https://sirb-two.vercel.app/movies" />
      </Head>
      <main className="min-h-screen pt-20 relative bg-primary">
        <section>
          <MovieSection
            sectionTitle="Trending Movies"
            requestKey="fetchTrending"
          />
          <MovieSection
            sectionTitle="Top Rated Movies"
            requestKey="fetchTopRated"
          />
          <MovieSection
            sectionTitle="Upcoming Movies"
            requestKey="fetchUpcoming"
          />
          <MovieSection
            sectionTitle="Now Playing"
            requestKey="fetchNowPlaying"
          />
          <MovieSection
            sectionTitle="Action Movies"
            requestKey="fetchActionMovies"
          />
          <MovieSection
            sectionTitle="Comedy Movies"
            requestKey="fetchComedyMovies"
          />
          <MovieSection
            sectionTitle="Drama Movies"
            requestKey="fetchDramaMovies"
          />
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
      </main>
    </>
  );
}
