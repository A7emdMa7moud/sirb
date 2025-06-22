"use client";

import React from "react";
import "../styles/loading.css";

function Loading({ title }) {
  return (
    <div className="flex gap-4 animate-pulse items-center">
      <p className="text-white capitalize tracking-wider">{title} is loading</p>

      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
      </div>
    </div>
  );
}

export default Loading;
