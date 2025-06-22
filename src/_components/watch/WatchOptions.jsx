import React from "react";

const WatchOptions = ({ title }) => {
  if (!title) return null;

  const searchQueries = [
    {
      label: `Search for "${title}" on Google`,
      query: `Watch "${title}" online free`,
    },
    { label: `Find "${title}" HD Streams`, query: `Stream "${title}" HD` },
    {
      label: `Check for "${title}" on 123Movies`,
      query: `site:123movies.* "${title}"`,
    },
    {
      label: `Look for "${title}" on Fmovies`,
      query: `site:fmovies.* "${title}"`,
    },
  ];

  const createGoogleSearchUrl = (query) => {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-400 pl-4">
        Watch Options
      </h2>
      <div className="p-4 bg-gray-800/20 rounded-lg space-y-3">
        <p className="text-gray-400 text-sm">
          Disclaimer: These links perform a Google search. We are not affiliated
          with the destination sites. Please use an ad-blocker and be cautious.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {searchQueries.map((item) => (
            <a
              key={item.label}
              href={createGoogleSearchUrl(item.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700/90 rounded-md transition-colors duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="text-light-100 font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchOptions;
