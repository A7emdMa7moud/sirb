"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Info, Volume2, VolumeX, Pause } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";

const FeaturedMovie = ({ movie }) => {
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!movie) return null;

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/images/hero-bg.png";

  const videoUrl = movie.video_key
    ? `https://www.youtube.com/watch?v=${movie.video_key}`
    : null;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {videoUrl && isInView ? (
          <div className="relative w-full h-full">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={isPlaying}
              muted={isMuted}
              loop={true}
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              config={{
                youtube: {
                  playerVars: {
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    iv_load_policy: 3,
                    fs: 0,
                    disablekb: 1,
                    autohide: 1,
                    color: "white",
                    playsinline: 1,
                  },
                },
              }}
              onReady={() => setIsVideoLoaded(true)}
              onError={(error) => {
                console.error("Video error:", error);
                setIsVideoLoaded(false);
              }}
            />

            {/* Video Controls Overlay - Centered Right */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex flex-col gap-4 z-20">
              {/* Sound Control Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all duration-300 border-2 border-white/30 shadow-lg"
                title={isMuted ? "تشغيل الصوت" : "إيقاف الصوت"}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </motion.button>

              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all duration-300 border-2 border-white/30 shadow-lg"
                title={isPlaying ? "إيقاف" : "تشغيل"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </motion.button>
            </div>

            {/* Custom Video Overlay to hide YouTube elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Hide YouTube logo */}
              <div className="absolute bottom-4 left-4 w-20 h-8 bg-black/50 backdrop-blur-sm rounded"></div>

              {/* Hide YouTube controls */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            {/* Movie Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex items-center gap-4 mb-6 text-light-200">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-400"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {movie.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span>•</span>
              <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
              <span>•</span>
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </div>

            {/* Movie Description */}
            <p className="text-lg text-light-200 mb-8 line-clamp-3">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 bg-light-100 text-primary font-semibold rounded-lg hover:bg-white transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Now
              </motion.button>

              <Link href={`/movies/${movie.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-3 bg-light-100/10 border border-light-100/20 text-light-100 font-semibold rounded-lg hover:bg-light-100/20 transition-colors"
                >
                  <Info className="w-5 h-5" />
                  More Info
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
