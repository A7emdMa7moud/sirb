import TVSection from "@/_components/tv/TVSection";

export const metadata = {
  title: "مسلسلات | سيرب - تصفح أحدث وأفضل المسلسلات",
  description:
    "اكتشف أحدث وأفضل المسلسلات على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من المسلسلات العربية والعالمية.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "مسلسلات | سيرب - تصفح أحدث وأفضل المسلسلات",
    description:
      "اكتشف أحدث وأفضل المسلسلات على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من المسلسلات العربية والعالمية.",
    url: "https://sirb-two.vercel.app/tv",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "مسلسلات | سيرب - تصفح أحدث وأفضل المسلسلات",
    description:
      "اكتشف أحدث وأفضل المسلسلات على منصة سيرب. تصفح التصنيفات، شاهد التقييمات، واستمتع بمكتبة ضخمة من المسلسلات العربية والعالمية.",
  },
  alternates: {
    canonical: "https://sirb-two.vercel.app/tv",
  },
};

export default function TVPage() {
  return (
    <main
      className="container mx-auto min-h-screen pt-20 relative bg-primary"
      dir="rtl"
      lang="ar"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          مسلسلات - منصة سيرب
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          اكتشف أحدث وأفضل المسلسلات العربية والعالمية مع تقييمات وترشيحات مخصصة
        </p>
      </div>
      <section>
        <TVSection
          sectionTitle="المسلسلات الرائجة"
          requestKey="fetchTrending"
        />
        <TVSection
          key={"fetchTopRated"}
          sectionTitle="أعلى المسلسلات تقييماً"
          requestKey="fetchTopRated"
        />
        <TVSection
          sectionTitle="المسلسلات المعروضة اليوم"
          requestKey="fetchAiringToday"
        />
        <TVSection
          sectionTitle="المسلسلات على الهواء"
          requestKey="fetchOnTheAir"
        />
        <TVSection sectionTitle="مسلسلات الأكشن" requestKey="fetchActionTV" />
        <TVSection
          sectionTitle="مسلسلات الكوميديا"
          requestKey="fetchComedyTV"
        />
        <TVSection sectionTitle="مسلسلات الدراما" requestKey="fetchDramaTV" />
        <TVSection
          sectionTitle="مسلسلات وثائقية"
          requestKey="fetchDocumentaryTV"
        />
        <TVSection
          sectionTitle="مسلسلات الرسوم المتحركة"
          requestKey="fetchAnimationTV"
        />
        <TVSection sectionTitle="مسلسلات الجريمة" requestKey="fetchCrimeTV" />
        <TVSection sectionTitle="مسلسلات العائلة" requestKey="fetchFamilyTV" />
        <TVSection sectionTitle="مسلسلات الأطفال" requestKey="fetchKidsTV" />
        <TVSection sectionTitle="مسلسلات الغموض" requestKey="fetchMysteryTV" />
        <TVSection
          sectionTitle="مسلسلات الخيال العلمي"
          requestKey="fetchSciFiTV"
        />
        <TVSection sectionTitle="مسلسلات الحرب" requestKey="fetchWarTV" />
        <TVSection
          sectionTitle="مسلسلات الويسترن"
          requestKey="fetchWesternTV"
        />
      </section>
    </main>
  );
}
