import GenresPageContent from "./GenresPageContent";
import Loading from "@/_components/Loading";

export const metadata = {
  title: "التصنيفات | سيرب - استكشف أفلام ومسلسلات حسب النوع",
  description: "تصفح التصنيفات على منصة سيرب واكتشف أفلام ومسلسلات متنوعة تناسب جميع الأذواق. تقييمات وترشيحات لأفضل الأعمال العربية والعالمية.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "التصنيفات | سيرب - استكشف أفلام ومسلسلات حسب النوع",
    description: "تصفح التصنيفات على منصة سيرب واكتشف أفلام ومسلسلات متنوعة تناسب جميع الأذواق. تقييمات وترشيحات لأفضل الأعمال العربية والعالمية.",
    url: "https://sirb-two.vercel.app/genres",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "التصنيفات | سيرب - استكشف أفلام ومسلسلات حسب النوع",
    description: "تصفح التصنيفات على منصة سيرب واكتشف أفلام ومسلسلات متنوعة تناسب جميع الأذواق. تقييمات وترشيحات لأفضل الأعمال العربية والعالمية.",
  },
  alternates: {
    canonical: "https://sirb-two.vercel.app/genres",
  },
};

export default function GenresPage() {
  return (
    <main>
      <GenresPageContent />
    </main>
  );
}
