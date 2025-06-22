"use client";

import TVSection from "@/_components/tv/TVSection";
import Head from "next/head";

export default function TVPage() {
  return (
    <>
      <Head>
        <title>مسلسلات | سيرب - تصفح أحدث وأفضل المسلسلات</title>
        <meta
          name="description"
          content="اكتشف أحدث وأفضل المسلسلات على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من المسلسلات العربية والعالمية."
        />
        <link rel="canonical" href="https://sirb-two.vercel.app/tv" />
      </Head>
      <main className="min-h-screen pt-20 relative bg-primary">
        <section>
          <TVSection
            sectionTitle="Trending TV Shows"
            requestKey="fetchTrending"
          />
          <TVSection
            key={"fetchTopRated"}
            sectionTitle="Top Rated TV Shows"
            requestKey="fetchTopRated"
          />
          <TVSection
            sectionTitle="Airing Today"
            requestKey="fetchAiringToday"
          />
          <TVSection sectionTitle="On The Air" requestKey="fetchOnTheAir" />
          <TVSection
            sectionTitle="Action TV Shows"
            requestKey="fetchActionTV"
          />
          <TVSection
            sectionTitle="Comedy TV Shows"
            requestKey="fetchComedyTV"
          />
          <TVSection sectionTitle="Drama TV Shows" requestKey="fetchDramaTV" />
          <TVSection
            sectionTitle="Documentary TV Shows"
            requestKey="fetchDocumentaryTV"
          />
          <TVSection
            sectionTitle="Animation TV Shows"
            requestKey="fetchAnimationTV"
          />
          <TVSection sectionTitle="Crime TV Shows" requestKey="fetchCrimeTV" />
          <TVSection
            sectionTitle="Family TV Shows"
            requestKey="fetchFamilyTV"
          />
          <TVSection sectionTitle="Kids TV Shows" requestKey="fetchKidsTV" />
          <TVSection
            sectionTitle="Mystery TV Shows"
            requestKey="fetchMysteryTV"
          />
          <TVSection sectionTitle="Sci-Fi TV Shows" requestKey="fetchSciFiTV" />
          <TVSection sectionTitle="War TV Shows" requestKey="fetchWarTV" />
          <TVSection
            sectionTitle="Western TV Shows"
            requestKey="fetchWesternTV"
          />
        </section>
      </main>
    </>
  );
}
