import Image from "next/image";
import Link from "next/link";

const SearchCard = ({ item, onLinkClick }) => {
  if (!item || (item.media_type !== "movie" && item.media_type !== "tv")) {
    return null;
  }

  const isMovie = item.media_type === "movie";
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "غير متوفر";
  const href = isMovie ? `/movies/${item.id}` : `/tv/${item.id}`;
  const mediaType = isMovie ? "فيلم" : "مسلسل";

  return (
    <Link 
      href={href} 
      onClick={onLinkClick} 
      className="group"
      aria-label={`${title} - ${mediaType} من عام ${year}`}
    >
      <div className="bg-gray-800/50 hover:bg-gray-800/90 rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-[2/3]">
          <Image
            src={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "/images/no-movie.png"
            }
            alt={`ملصق ${title}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3 flex flex-col flex-grow" dir="rtl" lang="ar">
          <h3 className="font-bold text-white text-base leading-tight line-clamp-2 flex-grow">
            {title}
          </h3>
          <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
            <span>{year}</span>
            <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-md">
              {mediaType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard; 