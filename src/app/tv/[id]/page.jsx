import Image from "next/image";
import { notFound } from "next/navigation";
import tvRequests from "@/api/tvRequests";
import Link from "next/link";
import VideoPlayer from "@/_components/video/VideoPlayer";
import WatchOptions from "@/_components/watch/WatchOptions";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function getTvShowData(id) {
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
      tvRequests.getTvShowDetails(id),
      tvRequests.getSimilarTvShows(id),
      tvRequests.getTvShowVideos(id),
      tvRequests.getTvShowExternalIds(id),
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url, options)));

    if (!responses[0].ok) {
      if (responses[0].status === 404) notFound();
      throw new Error("Failed to fetch TV show details");
    }

    const [showDetails, similarShows, videos, externalIds] = await Promise.all(
      responses.map((res) => (res.ok ? res.json() : null))
    );

    const trailer = videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    return {
      showDetails,
      similarShows: similarShows?.results || [],
      trailerKey: trailer?.key || null,
      externalIds,
    };
  } catch (error) {
    console.error("Error fetching TV show data:", error);
    notFound();
  }
}

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

export default async function TvShowDetailsPage({ params }) {
  const { id } = await params;
  const { showDetails, similarShows, trailerKey, externalIds } =
    await getTvShowData(id);

  const imdbUrl = externalIds?.imdb_id
    ? `https://www.imdb.com/title/${externalIds.imdb_id}`
    : null;
  const websiteUrl = showDetails.homepage;

  const poster = showDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${showDetails.backdrop_path}`
    : "/images/logo.png";

  return (
    <div className="min-h-screen bg-primary text-light-100 pb-20 pt-20" dir="rtl">
      {/* --- Header Section --- */}
      <div className="relative w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${showDetails.backdrop_path}`}
          alt={`خلفية مسلسل ${showDetails.name}`}
          fill={true}
          style={{ objectFit: "cover" }}
          className="opacity-10 absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent"></div>

        {/* Centered Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
          {/* Video Player takes full width */}
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <VideoPlayer videoKey={trailerKey} />
          </div>

          {/* Details below the video */}
          <div className="w-full text-center mt-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {showDetails.name}
            </h1>
            {showDetails.tagline && (
              <p className="text-xl text-light-200 mb-6 italic opacity-80">
                &quot;{showDetails.tagline}&quot;
              </p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-md text-gray-300">
              <span>{showDetails.first_air_date?.split("-")[0]}</span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {showDetails.vote_average.toFixed(1)}
              </span>
              <span>{`${showDetails.number_of_seasons} مواسم`}</span>
              <span>{`${showDetails.number_of_episodes} حلقة`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Section (Single Column) --- */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 mt-8">
        {/* Overview */}
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
          نظرة عامة
        </h2>
        <p className="mb-8 leading-relaxed text-gray-300">
          {showDetails.overview}
        </p>

        {/* Key Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-gray-800/20 rounded-lg">
          <DetailItem label="الحالة" value={showDetails.status} />
          <DetailItem
            label="تاريخ البث الأول"
            value={showDetails.first_air_date}
          />
          <DetailItem label="تاريخ البث الأخير" value={showDetails.last_air_date} />
          <DetailItem
            label="الشبكة"
            value={showDetails.networks?.[0]?.name || "غير متوفر"}
          />
        </div>

        {/* Genres */}
        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
          التصنيفات
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {showDetails.genres.map((genre) => (
            <Link
              href={`/genres?genre=${genre.id}`}
              key={genre.id}
              className="px-4 py-2 bg-gray-800/60 text-light-200 rounded-full text-sm font-semibold transition-colors hover:bg-yellow-400 hover:text-primary"
            >
              {genre.name}
            </Link>
          ))}
        </div>

        {/* Watch Options */}
        <WatchOptions title={showDetails.name} />

        {/* External Links */}
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

        {/* Similar Shows */}
        {similarShows.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
              قد يعجبك أيضاً
            </h2>
            <div className="space-y-4">
              {similarShows.slice(0, 5).map((show) => (
                <Link
                  href={`/tv/${show.id}`}
                  key={show.id}
                  className="flex gap-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <Image
                    src={
                      show.poster_path
                        ? `https://image.tmdb.org/t/p/w92${show.poster_path}`
                        : "/images/no-movie.png"
                    }
                    alt={show.name}
                    width={46}
                    height={69}
                    className="rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {show.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {show.first_air_date?.split("-")[0]}
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
  const { showDetails } = await getTvShowData(id);
  const title = showDetails?.name || "مسلسل";
  const year = showDetails?.first_air_date?.split("-")[0] || "";
  const rating = showDetails?.vote_average?.toFixed(1) || "";
  const overview = showDetails?.overview || "";
  const poster = showDetails?.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${showDetails.backdrop_path}`
    : "/images/logo.png";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: showDetails.name,
    image: poster,
    datePublished: showDetails.first_air_date,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: "10",
      ratingCount: showDetails.vote_count,
    },
    description: showDetails.overview?.substring(0, 160),
    genre: showDetails.genres?.map((g) => g.name),
    inLanguage: "en",
    url: `https://sirb-two.vercel.app/tv/${id}`,
    numberOfSeasons: showDetails.number_of_seasons,
    numberOfEpisodes: showDetails.number_of_episodes,
  };

  return {
    title: `مشاهدة مسلسل ${title} (${year}) - تقييم ${rating} | Sirb`,
    description: `شاهد مسلسل ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
      0,
      120
    )}... تابع أحدث وأفضل المسلسلات على منصة Sirb للأفلام والمسلسلات.`,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `مشاهدة مسلسل ${title} (${year}) - تقييم ${rating} | Sirb`,
      description: `شاهد مسلسل ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
        0,
        120
      )}... تابع أحدث وأفضل المسلسلات على منصة Sirb للأفلام والمسلسلات.`,
      images: [poster],
      type: "video.tv_show",
      locale: "ar_EG",
    },
    twitter: {
      card: "summary_large_image",
      title: `مشاهدة مسلسل ${title} (${year}) - تقييم ${rating} | Sirb`,
      description: `شاهد مسلسل ${title} (${year}) أونلاين مع تقييم ${rating}. ${overview.substring(
        0,
        120
      )}... تابع أحدث وأفضل المسلسلات على منصة Sirb للأفلام والمسلسلات.`,
      image: poster,
    },
    alternates: {
      canonical: `https://sirb-two.vercel.app/tv/${id}`,
    },
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  };
}
