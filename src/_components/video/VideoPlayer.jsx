"use client";

export default function VideoPlayer({ videoKey }) {
  if (!videoKey) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center rounded-lg shadow-lg">
        <p className="text-white">Trailer not available.</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
}
