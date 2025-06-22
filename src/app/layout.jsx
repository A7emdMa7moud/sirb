import { DM_Sans } from "next/font/google";
import "../styles/main.css";
import Navbar from "@/_components/Navbar";
import Head from "next/head";

const dmSans = DM_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
  description:
    "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
  keywords:
    "سيرب, Sirb, منصة سيرب, sirb movies, sirb tv, sirb افلام, sirb مسلسلات, أفلام, مسلسلات, مشاهدة, تقييم, ترشيحات, بحث, مفضلة, سينما, تلفزيون, منصة, عربي, trending, movies, tv shows, reviews, recommendations, genres, action, drama, comedy, netflix, شاهد, اكشن, دراما, كوميدي, جديد, trending movies, trending tv shows, سيرب افلام, سيرب مسلسلات, سيرب TV, سيرب MOVIES, سيرب سينما, سيرب منصة, سيرب اونلاين, سيرب مشاهدة, سيرب تقييم, سيرب ترشيحات, سيرب بحث, سيرب مفضلة, سيرب trending, سيرب reviews, سيرب recommendations, سيرب genres, سيرب action, سيرب drama, سيرب comedy, سيرب netflix, سيرب شاهد, سيرب اكشن, سيرب دراما, سيرب كوميدي, سيرب جديد, سيرب trending movies, سيرب trending tv shows",
  openGraph: {
    title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    url: "https://sirb-two.vercel.app/",
    siteName: "Sirb Movies & TV Shows Platform | منصة سيرب للأفلام والمسلسلات",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Sirb Logo | شعار سيرب",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sirb_movies",
    title:
      "Sirb | سيرب - أفضل منصة أفلام ومسلسلات عربية وعالمية | Sirb Movies & TV Shows | منصة سيرب للأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    image: "/images/logo.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://sirb-two.vercel.app"),
  alternates: {
    canonical: "https://sirb-two.vercel.app/",
  },
};

export const viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#030014" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="author" content="Sirb Team" />
        <meta name="copyright" content="Sirb Movies & TV Shows Platform" />
        <meta
          name="application-name"
          content="Sirb | سيرب - منصة الأفلام والمسلسلات"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
