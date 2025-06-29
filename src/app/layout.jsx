import { DM_Sans } from "next/font/google";
import "../styles/main.css";
import Navbar from "@/_components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
  description:
    "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
  keywords:
    "سيرب, Sirb, منصة سيرب, sirb movies, sirb tv, sirb افلام, sirb مسلسلات, أفلام, مسلسلات, مشاهدة, تقييم, ترشيحات, بحث, مفضلة, سينما, تلفزيون, منصة, عربي, trending, movies, tv shows, reviews, recommendations, genres, action, drama, comedy, netflix, شاهد, اكشن, دراما, كوميدي, جديد, trending movies, trending tv shows, سيرب افلام, سيرب مسلسلات, سيرب TV, سيرب MOVIES, سيرب سينما, سيرب منصة, سيرب اونلاين, سيرب مشاهدة, سيرب تقييم, سيرب ترشيحات, سيرب بحث, سيرب مفضلة, سيرب trending, سيرب reviews, سيرب recommendations, سيرب genres, سيرب action, سيرب drama, سيرب comedy, سيرب netflix, سيرب شاهد, سيرب اكشن, سيرب دراما, سيرب كوميدي, سيرب جديد, سيرب trending movies, سيرب trending tv shows",
  openGraph: {
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    url: "https://sirb-two.vercel.app",
    // url: "https://7ke4q6yj7j4l25rhbjv6ssypiy.srv.us/",
    siteName: "Sirb Movies & TV Shows Platform | منصة سيرب للأفلام والمسلسلات",
    images: [
      {
        url: "/images/hero-bg.png",
        // width: 1200,
        // height: 630,
        alt: "Sirb Logo | شعار سيرب",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sirb_movies",
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة لمتابعة أحدث الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم.",
    image: "/images/hero-bg.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://sirb-two.vercel.app/"),
  // metadataBase: new URL("https://7ke4q6yj7j4l25rhbjv6ssypiy.srv.us/"),
  alternates: {
    canonical: "https://sirb-two.vercel.app/",
    // canonical: "https://7ke4q6yj7j4l25rhbjv6ssypiy.srv.us/",
  },
};

export const viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={dmSans.className}>
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}
