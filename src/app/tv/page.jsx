"use client";

import TVSection from "@/_components/tv/TVSection";

export default function TVPage() {
  return (
    <section className="min-h-screen pt-20 relative bg-primary">
      <TVSection sectionTitle="Trending TV Shows" requestKey="fetchTrending" />

      <TVSection
        key={"fetchTopRated"}
        sectionTitle="Top Rated TV Shows"
        requestKey="fetchTopRated"
      />
      <TVSection sectionTitle="Airing Today" requestKey="fetchAiringToday" />
      <TVSection sectionTitle="On The Air" requestKey="fetchOnTheAir" />
      <TVSection sectionTitle="Action TV Shows" requestKey="fetchActionTV" />
      <TVSection sectionTitle="Comedy TV Shows" requestKey="fetchComedyTV" />
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
      <TVSection sectionTitle="Family TV Shows" requestKey="fetchFamilyTV" />
      <TVSection sectionTitle="Kids TV Shows" requestKey="fetchKidsTV" />
      <TVSection sectionTitle="Mystery TV Shows" requestKey="fetchMysteryTV" />
      <TVSection sectionTitle="Sci-Fi TV Shows" requestKey="fetchSciFiTV" />
      <TVSection sectionTitle="War TV Shows" requestKey="fetchWarTV" />
      <TVSection sectionTitle="Western TV Shows" requestKey="fetchWesternTV" />
    </section>
  );
}
