"use client";

import Image from "next/image";
import Link from "next/link";

function MovieCard({ movie, index }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/images/no-movie.png"; // تأكد أن الصورة موجودة في public/images/no-movie.png

  return (
    <div
      className="flex !flex-col flex-shrink-0 items-center relative"
      dir="rtl"
      lang="ar"
    >
      <Link
        href={`/movies/${movie.id}`}
        className="flex flex-col items-center"
        aria-label={`${movie.title || movie.original_title} - فيلم`}
      >
        <Image
          src={imageUrl}
          alt={`ملصق فيلم ${movie.title || movie.original_title}`}
          width={150}
          height={225}
          className="min-w-[200px] min-h-[270px] rounded-lg object-cover z-20 opacity-100"
          loading="lazy"
        />
      </Link>

      <div className="mt-2 w-full flex flex-col max-w-[200px]">
        <span className="text-white text-base font-semibold leading-tight block truncate w-full">
          {movie.title || movie.original_title}
        </span>
        <div className="flex justify-between items-center gap-4">
          <span className="flex items-center gap-1 mt-1 text-yellow-400 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>

            {movie.vote_average ? movie.vote_average.toFixed(1) : "غير متوفر"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
