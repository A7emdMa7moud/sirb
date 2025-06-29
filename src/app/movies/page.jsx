import MovieSection from "../../_components/movies/MovieSection";

export const metadata = {
  title: "أفلام | سيرب - تصفح أحدث وأفضل الأفلام",
  description:
    "اكتشف أحدث وأفضل الأفلام على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من الأفلام العربية والعالمية.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "أفلام | سيرب - تصفح أحدث وأفضل الأفلام",
    description:
      "اكتشف أحدث وأفضل الأفلام على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من الأفلام العربية والعالمية.",
    url: "https://sirb-two.vercel.app/movies",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "أفلام | سيرب - تصفح أحدث وأفضل الأفلام",
    description:
      "اكتشف أحدث وأفضل الأفلام على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من الأفلام العربية والعالمية.",
  },
  alternates: {
    canonical: "https://sirb-two.vercel.app/movies",
  },
};

export default function MoviesPage() {
  return (
    <main
      className="container mx-auto min-h-screen pt-20 relative bg-primary"
      dir="rtl"
      lang="ar"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          أفلام - منصة سيرب
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          اكتشف أحدث وأفضل الأفلام العربية والعالمية مع تقييمات وترشيحات مخصصة
        </p>
      </div>
      <section>
        <MovieSection
          sectionTitle="الأفلام الرائجة"
          requestKey="fetchTrending"
        />
        <MovieSection
          sectionTitle="أعلى الأفلام تقييماً"
          requestKey="fetchTopRated"
        />
        <MovieSection
          sectionTitle="الأفلام القادمة"
          requestKey="fetchUpcoming"
        />
        <MovieSection 
          sectionTitle="الأفلام المعروضة الآن" 
          requestKey="fetchNowPlaying" 
        />
        <MovieSection
          sectionTitle="أفلام الأكشن"
          requestKey="fetchActionMovies"
        />
        <MovieSection
          sectionTitle="أفلام الكوميديا"
          requestKey="fetchComedyMovies"
        />
        <MovieSection
          sectionTitle="أفلام الدراما"
          requestKey="fetchDramaMovies"
        />
        <MovieSection
          sectionTitle="أفلام الرعب"
          requestKey="fetchHorrorMovies"
        />
        <MovieSection
          sectionTitle="أفلام الرومانسية"
          requestKey="fetchRomanceMovies"
        />
        <MovieSection
          sectionTitle="أفلام وثائقية"
          requestKey="fetchDocumentaryMovies"
        />
      </section>
    </main>
  );
}
