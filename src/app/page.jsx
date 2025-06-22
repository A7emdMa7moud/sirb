"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SearchSection from "../_components/SearchSection";
import FeaturedMovie from "../_components/FeaturedMovie";
import MovieSection from "../_components/movies/MovieSection";
import TVSection from "../_components/tv/TVSection";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen relative bg-primary" dir="rtl">
      {/* Hero/Intro Section */}
      {/* بتاع التجربه */}
      <section className="w-full bg-primary pt-28 pb-12 px-4 md:px-0 flex flex-col items-center text-white text-right">
        <Image
          src="/images/logo.png"
          alt="شعار منصة سيرب للأفلام والمسلسلات"
          width={120}
          height={120}
          className="mb-6 drop-shadow-lg"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center w-full">
          سيرب - منصتك الشاملة لمتابعة الأفلام والمسلسلات
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center w-full">
          اكتشف، شاهد، وقيّم أفضل الأعمال السينمائية والتلفزيونية
        </h2>
        <div className="max-w-2xl text-lg leading-8 mb-6 text-gray-200 text-center mx-auto">
          <p>
            مرحبًا بك في <strong>سيرب</strong>، وجهتك الأولى لعالم الترفيه
            العربي والعالمي! نقدم لك منصة متكاملة تتيح لك استكشاف أحدث وأشهر
            الأفلام والمسلسلات من مختلف التصنيفات والأنواع. في سيرب، ستجد مكتبة
            ضخمة من الأعمال السينمائية والتلفزيونية، مع تقييمات دقيقة وترشيحات
            مخصصة تناسب ذوقك.
          </p>
          <p className="mt-4">
            يمكنك البحث بسهولة عن أي فيلم أو مسلسل، تصفح التصنيفات المتنوعة، أو
            اكتشاف الأعمال الرائجة حاليًا. أضف أعمالك المفضلة إلى قوائمك الخاصة،
            وشارك رأيك مع مجتمع سيرب. استمتع بتجربة مستخدم سلسة تدعم الوضع
            الليلي، وتوفر لك كل ما تحتاجه لمتابعة جديد السينما والتلفزيون.
          </p>
          <p className="mt-4">
            سيرب يدعم اللغة العربية بالكامل ويوفر تجربة تصفح متوافقة مع جميع
            الأجهزة. انضم إلينا اليوم وابدأ رحلتك في عالم الترفيه بلا حدود!
          </p>
        </div>
        <nav className="flex flex-wrap gap-3 justify-center mb-4">
          <Link href="/movies" className="btn-secondary">
            الأفلام
          </Link>
          <Link href="/tv" className="btn-secondary">
            المسلسلات
          </Link>
          <Link href="/genres" className="btn-secondary">
            التصنيفات
          </Link>
          <Link href="/search" className="btn-secondary">
            بحث متقدم
          </Link>
          <Link href="/movies?page=1" className="btn-secondary">
            أحدث الإصدارات
          </Link>
          <Link href="/tv?page=1" className="btn-secondary">
            العروض الجديدة
          </Link>
        </nav>
        <h3 className="text-xl font-bold mb-2 mt-6 text-center w-full">
          مميزات منصة سيرب
        </h3>
        <ul className="list-disc pr-6 max-w-2xl mx-auto text-gray-300 text-base text-right">
          <li>مكتبة ضخمة من الأفلام والمسلسلات العربية والعالمية</li>
          <li>بحث متقدم وترشيحات مخصصة حسب اهتماماتك</li>
          <li>تقييمات ومراجعات من مجتمع سيرب</li>
          <li>إمكانية إنشاء قوائم مفضلة خاصة بك</li>
          <li>دعم كامل للغة العربية وتجربة تصفح من اليمين لليسار</li>
          <li>واجهة سهلة الاستخدام ومتوافقة مع جميع الأجهزة</li>
        </ul>
      </section>
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
