import Image from "next/image";
import { notFound } from "next/navigation";
import movieRequests from "@/api/movieRequests";
import Link from "next/link";
import VideoPlayer from "@/_components/video/VideoPlayer";
import WatchOptions from "@/_components/watch/WatchOptions";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getMovieData(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    next: { revalidate: 3600 },
  };

  try {
    const urls = [
      movieRequests.getMovieDetails(id),
      movieRequests.getSimilarMovies(id),
      movieRequests.getMovieVideos(id),
      movieRequests.getMovieExternalIds(id),
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url, options)));

    if (!responses[0].ok) {
      if (responses[0].status === 404) notFound();
      throw new Error("Failed to fetch movie details");
    }

    const [movieDetails, similarMovies, videos, externalIds] =
      await Promise.all(responses.map((res) => (res.ok ? res.json() : null)));

    const trailer = videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    return {
      movieDetails,
      similarMovies: similarMovies?.results || [],
      trailerKey: trailer?.key || null,
      externalIds,
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    notFound();
  }
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

const formatCurrency = (amount) => {
  if (amount === 0 || !amount) return "N/A";
  return `$${amount.toLocaleString()}`;
};

const formatRuntime = (runtime) => {
  if (!runtime || runtime === 0) return "N/A";
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;

  const { movieDetails, similarMovies, trailerKey, externalIds } =
    await getMovieData(id);

  const imdbUrl = externalIds?.imdb_id
    ? `https://www.imdb.com/title/${externalIds.imdb_id}`
    : null;
  const websiteUrl = movieDetails.homepage;

  const poster = movieDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`
    : "/images/logo.png";

  return (
    <div className="min-h-screen bg-primary text-light-100 pb-20 pt-20" dir="rtl">
      <div className="relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt={`خلفية فيلم ${movieDetails.title}`}
          fill={true}
          style={{ objectFit: "cover" }}
          className="opacity-10 absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <VideoPlayer videoKey={trailerKey} />
          </div>

          <div className="w-full text-center mt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {movieDetails.title}
            </h1>
            {movieDetails.tagline && (
              <p className="text-xl text-light-200 mb-6 italic opacity-80">
                &quot;{movieDetails.tagline}&quot;
              </p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-md text-gray-300">
              <span>{movieDetails.release_date?.split("-")[0]}</span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {movieDetails.vote_average.toFixed(1)}
              </span>
              <span>{formatRuntime(movieDetails.runtime)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 mt-8">
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
          نظرة عامة
        </h2>
        <p className="mb-8 leading-relaxed text-gray-300">
          {movieDetails.overview}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-gray-800/20 rounded-lg">
          <DetailItem label="الحالة" value={movieDetails.status} />
          <DetailItem
            label="تاريخ الإصدار"
            value={movieDetails.release_date}
          />
          <DetailItem
            label="الميزانية"
            value={formatCurrency(movieDetails.budget)}
          />
          <DetailItem
            label="الإيرادات"
            value={formatCurrency(movieDetails.revenue)}
          />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
          التصنيفات
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {movieDetails.genres.map((genre) => (
            <Link
              href={`/genres?genre=${genre.id}`}
              key={genre.id}
              className="px-4 py-2 bg-gray-800/60 text-light-200 rounded-full text-sm font-semibold transition-colors hover:bg-yellow-400 hover:text-primary"
            >
              {genre.name}
            </Link>
          ))}
        </div>

        <WatchOptions title={movieDetails.title} />

        <div className="flex flex-wrap gap-4 mt-8">
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              الموقع الرسمي
            </a>
          )}
          {imdbUrl && (
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              صفحة IMDb
            </a>
          )}
        </div>

        {similarMovies.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
              قد يعجبك أيضاً
            </h2>
            <div className="space-y-4">
              {similarMovies.slice(0, 5).map((movie) => (
                <Link
                  href={`/movies/${movie.id}`}
                  key={movie.id}
                  className="flex gap-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/images/no-movie.png"
                    }
                    alt={movie.title}
                    width={46}
                    height={69}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {movie.release_date?.split("-")[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { movieDetails } = await getMovieData(id);
  const title = movieDetails?.title || "فيلم";
  const year = movieDetails?.release_date?.split("-")[0] || "";
  const rating = movieDetails?.vote_average?.toFixed(1) || "";
  const overview = movieDetails?.overview || "";
  const poster = movieDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movieDetails.backdrop_path}`
    : "/images/logo.png";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movieDetails.title,
    image: poster,
    datePublished: movieDetails.release_date,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: "10",
      ratingCount: movieDetails.vote_count,
    },
    description: movieDetails.overview?.substring(0, 160),
    genre: movieDetails.genres?.map((g) => g.name),
    inLanguage: "en",
    url: `https://sirb-two.vercel.app/movies/${id}`,
    director: movieDetails.credits?.crew?.find(c => c.job === "Director")?.name,
    duration: movieDetails.runtime ? `PT${movieDetails.runtime}M` : undefined,
  };

  return {
    title: `مشاهدة فيلم ${title} (${year}) - تقييم ${rating} | Sirb`,
    description: `شاهد فيلم ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
      0,
      120
    )}... تابع أحدث وأفضل الأفلام على منصة Sirb للأفلام والمسلسلات.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `مشاهدة فيلم ${title} (${year}) - تقييم ${rating} | Sirb`,
      description: `شاهد فيلم ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
        0,
        120
      )}... تابع أحدث وأفضل الأفلام على منصة Sirb للأفلام والمسلسلات.`,
      images: [poster],
      type: "video.movie",
      locale: "ar_EG",
    },
    twitter: {
      card: "summary_large_image",
      title: `مشاهدة فيلم ${title} (${year}) - تقييم ${rating} | Sirb`,
      description: `شاهد فيلم ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
        0,
        120
      )}... تابع أحدث وأفضل الأفلام على منصة Sirb للأفلام والمسلسلات.`,
      image: poster,
    },
    alternates: {
      canonical: `https://sirb-two.vercel.app/movies/${id}`,
    },
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  };
}
