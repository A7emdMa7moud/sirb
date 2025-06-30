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
      setErrorMessage(error.message || `فشل في جلب مسلسلات ${sectionTitle}`);
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
        className={`trending tv-section flex flex-col gap-4 my-10 mb-20 transition-opacity duration-500 ${
          !isLoading ? "opacity-100" : "opacity-0"
        }`}
        dir="rtl"
        lang="ar"
      >
        <h2>{sectionTitle}</h2>
        <div className="relative">
          <motion.ul
            ref={scrollRef}
            className={`flex flex-row overflow-x-auto scroll-smooth gap-4 w-full px-4 sm:px-6 lg:px-0`}
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

        {/* Scroll Navigation Buttons - Bottom Center */}
        {showScrollButtons && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handleScroll("right")}
              className="flex items-center gap-2 px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="التمرير لليمين"
            >
              {/* <span>تمرير يمين</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => handleScroll("left")}
              className="flex items-center gap-2 px-4 py-2 bg-light-100/10 border border-light-100/20 text-light-100 rounded-lg hover:bg-light-100/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="التمرير لليسار"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              {/* <span>تمرير يسار</span> */}
            </button>
          </div>
        )}
      </section>
    </LoadingAndErrorStatus>
  );
}
export default TVSection;
