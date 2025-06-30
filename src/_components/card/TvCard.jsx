"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function TvCard({ show, index }) {
  const [showShareFeedback, setShowShareFeedback] = useState(false);

  const imageUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : "/images/no-movie.png";

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `https://sirb-two.vercel.app/tv/${show.id}`;
    const title = `${show.name} | منصة سيرب`;
    const text = `شاهد مسلسل ${
      show.name
    } على منصة سيرب - ${show.overview?.slice(0, 100)}...`;
    const imageUrl = show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : "https://sirb-two.vercel.app/images/no-movie.png";

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShowShareFeedback(true);
        setTimeout(() => setShowShareFeedback(false), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      try {
        await navigator.clipboard.writeText(url);
        setShowShareFeedback(true);
        setTimeout(() => setShowShareFeedback(false), 2000);
      } catch (clipboardError) {
        console.error("Error copying to clipboard:", clipboardError);
      }
    }
  };

  return (
    <div
      className="flex !flex-col flex-shrink-0 items-center relative group"
      dir="rtl"
      lang="ar"
    >
      <Link
        href={`/tv/${show.id}`}
        className="flex flex-col items-center relative"
        aria-label={`${show.name || show.original_name} - مسلسل`}
      >
        <div className="relative">
          <Image
            src={imageUrl}
            alt={`ملصق مسلسل ${show.name || show.original_name}`}
            width={150}
            height={225}
            className="min-w-[180px] min-h-[270px] rounded-lg object-cover z-20 opacity-100"
            loading="lazy"
          />

          {/* Share Feedback */}
          {showShareFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 left-2 px-3 py-1 bg-green-500 text-white text-xs rounded-lg whitespace-nowrap z-50"
            >
              تم نسخ الرابط!
            </motion.div>
          )}
        </div>
      </Link>

      <div className="mt-2 w-full flex flex-col max-w-[180px]">
        <span className="text-white text-base font-semibold leading-tight block truncate w-full">
          {show.name || show.original_name}
        </span>
        <div className="flex justify-between items-center gap-4 mt-1">
          <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>

            {show.vote_average ? show.vote_average.toFixed(1) : "غير متوفر"}
          </span>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={`مشاركة مسلسل ${show.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TvCard;
