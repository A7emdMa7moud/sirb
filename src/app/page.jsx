import HomePageContent from "./HomePageContent";

export const metadata = {
  title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
  description:
    "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    url: "https://sirb-two.vercel.app",
    type: "website",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة لمتابعة أحدث الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم.",
  },
  alternates: {
    canonical: "https://sirb-two.vercel.app/",
  },
};

export default function Page() {
  return <HomePageContent />;
}
