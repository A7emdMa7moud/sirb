"use client";

import { useEffect, useState, useRef } from "react";
// import Loading from "../Loading"; // لم يعد مطلوباً هنا
import axios from "axios";
import tvRequests from "../../api/tvRequests";
import TvCard from "../card/TvCard";
import LoadingAndErrorStatus from "../status/LoadingAndErrorStatus"; // استيراد المكون الجديد
import { motion } from "framer-motion";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};

function TVSection({ sectionTitle, requestKey }) {
  const [tvList, setTvList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const fetchTVShows = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      // Get the request URL from tvRequests
      const requestUrl = tvRequests[requestKey];
      if (!requestUrl) {
        throw new Error(`Invalid request key: ${requestKey}`);
      }

      const response = await axios.get(requestUrl, API_OPTIONS);
      if (response.status === 200) {
        setTvList(response.data.results);
      }
    } catch (error) {
      console.error(`Error fetching ${sectionTitle} TV shows:`, error);
      setErrorMessage(
        error.message || `Failed to fetch ${sectionTitle} TV shows`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTVShows();
  }, [requestKey]); // Re-fetch when requestKey changes

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const checkScrollable = () => {
      setShowScrollButtons(element.scrollWidth > element.clientWidth);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [tvList]);

  const handleScroll = (direction) => {
    const listElement = scrollRef.current;
    if (!listElement || listElement.children.length === 0) {
      return;
    }

    const firstCard = listElement.children[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = 20; // Corresponds to Tailwind's `gap-5`

    const scrollAmount = (cardWidth + gap) * 4;

    listElement.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <LoadingAndErrorStatus
      isLoading={isLoading}
      errorMessage={errorMessage}
      sectionTitle={sectionTitle}
      requestKey={requestKey}
    >
      <section
        className={`trending tv-section my-10 mb-20 transition-opacity duration-500 ${
          !isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="mb-10 capitalize px-4 sm:px-6 lg:px-8">
          {sectionTitle}
        </h2>
        <div className="relative">
          {showScrollButtons && (
            <>
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-0 h-full z-30 flex items-center justify-center w-20 bg-gradient-to-r from-primary to-transparent text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-0 h-full z-30 flex items-center justify-center w-20 bg-gradient-to-l from-primary to-transparent text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </>
          )}
          <motion.ul
            ref={scrollRef}
            className={`flex flex-row overflow-x-auto scroll-smooth gap-5 w-full px-4 sm:px-6 lg:px-8`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate={!isLoading ? "show" : "hidden"}
          >
            {tvList.slice(0, 20).map((show, index) => (
              <motion.li
                key={show.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <TvCard show={show} index={index} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </LoadingAndErrorStatus>
  );
}
export default TVSection;
