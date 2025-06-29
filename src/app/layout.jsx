import { Cairo } from "next/font/google";
import "../styles/main.css";
import Navbar from "@/_components/Navbar";

const dmSans = Cairo({ subsets: ["latin"] });
export const metadata = {
  title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
  description:
    "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
  keywords:
    "سيرب, Sirb, منصة سيرب, sirb movies, sirb tv, sirb افلام, sirb مسلسلات, أفلام, مسلسلات, مشاهدة, تقييم, ترشيحات, بحث, مفضلة, سينما, تلفزيون, منصة, عربي, trending, movies, tv shows, reviews, recommendations, genres, action, drama, comedy, netflix, شاهد, اكشن, دراما, كوميدي, جديد, trending movies, trending tv shows, سيرب افلام, سيرب مسلسلات, سيرب TV, سيرب MOVIES, سيرب سينما, سيرب منصة, سيرب اونلاين, سيرب مشاهدة, سيرب تقييم, سيرب ترشيحات, سيرب بحث, سيرب مفضلة, سيرب trending, سيرب reviews, سيرب recommendations, سيرب genres, سيرب action, سيرب drama, سيرب comedy, سيرب netflix, سيرب شاهد, سيرب اكشن, سيرب دراما, سيرب كوميدي, سيرب جديد, سيرب trending movies, سيرب trending tv shows",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    url: "https://sirb-two.vercel.app",
    siteName: "Sirb Movies & TV Shows Platform | منصة سيرب للأفلام والمسلسلات",
    images: [
      {
        url: "https://ogcdn.net/a06a2c2c-918b-4636-9ac3-c3aa4997d51f/v15/%D8%B3%D9%8A%D8%B1%D8%A8%20%7C%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85%20%D9%88%D8%A7%D9%84%D9%85%D8%B3%D9%84%D8%B3%D9%84%D8%A7%D8%AA/rgba(206%2C%20206%2C%20251%2C%201)/%D8%A7%D9%81%D9%84%D8%A7%D9%85%20%D9%88%D9%85%D8%B3%D9%84%D8%B3%D9%84%D8%A7%D8%AA%20%D9%85%D8%AC%D8%A7%D9%86%D8%A7%20%D8%B9%D9%84%D9%8A%20%D8%B3%D9%8A%D8%B1%D8%A8/rgba(3%2C%200%2C%2020%2C%201)/rgba(3%2C%200%2C%2020%2C%201)/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F7b71d9f4-8f84-47df-a23b-3475c3574d4e.png%3Ftoken%3D-vHPyEKY8KSgaqf2lnQTuD5t4lKclju1XNnUlf3xuKk%26height%3D48%26width%3D48%26expires%3D33287192505/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F4d2fce18-0d92-43d7-b35d-c2f65b21150c.png%3Ftoken%3DxtsoRSVi5Y420tfWNzhy0ylp8Qct7NVbvDSodo92SHM%26height%3D564%26width%3D943%26expires%3D33287192730/rgba(15%2C%2013%2C%2035%2C%201)/rgba(83%2C%2070%2C%20206%2C%201)/og.png",
        width: 1200,
        height: 630,
        alt: "سيرب | منصة الأفلام والمسلسلات",
      },
      {
        url: "/images/hero.png",
        width: 800,
        height: 600,
        alt: "منصة سيرب للأفلام والمسلسلات",
      },
      {
        url: "/images/hero-bg.png",
        width: 800,
        height: 600,
        alt: "اكتشف أفضل الأفلام والمسلسلات",
      },
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "شعار سيرب",
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
    images: [
      "https://ogcdn.net/a06a2c2c-918b-4636-9ac3-c3aa4997d51f/v15/%D8%B3%D9%8A%D8%B1%D8%A8%20%7C%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%A3%D9%81%D9%84%D8%A7%D9%85%20%D9%88%D8%A7%D9%84%D9%85%D8%B3%D9%84%D8%B3%D9%84%D8%A7%D8%AA/rgba(206%2C%20206%2C%20251%2C%201)/%D8%A7%D9%81%D9%84%D8%A7%D9%85%20%D9%88%D9%85%D8%B3%D9%84%D8%B3%D9%84%D8%A7%D8%AA%20%D9%85%D8%AC%D8%A7%D9%86%D8%A7%20%D8%B9%D9%84%D9%8A%20%D8%B3%D9%8A%D8%B1%D8%A8/rgba(3%2C%200%2C%2020%2C%201)/rgba(3%2C%200%2C%2020%2C%201)/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F7b71d9f4-8f84-47df-a23b-3475c3574d4e.png%3Ftoken%3D-vHPyEKY8KSgaqf2lnQTuD5t4lKclju1XNnUlf3xuKk%26height%3D48%26width%3D48%26expires%3D33287192505/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fimages%2F4d2fce18-0d92-43d7-b35d-c2f65b21150c.png%3Ftoken%3DxtsoRSVi5Y420tfWNzhy0ylp8Qct7NVbvDSodo92SHM%26height%3D564%26width%3D943%26expires%3D33287192730/rgba(15%2C%2013%2C%2035%2C%201)/rgba(83%2C%2070%2C%20206%2C%201)/og.png",
      "/images/hero.png",
      "/images/hero-bg.png",
      "/images/logo.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://sirb-two.vercel.app/"),
  // metadataBase: new URL("https://7ke4q6yj7j4l25rhbjv6ssypiy.srv.us/"),
  alternates: {
    canonical: "https://sirb-two.vercel.app/",
    languages: {
      ar: "https://sirb-two.vercel.app/",
    },
  },
};

export const viewport = {
  themeColor: "#030014",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href="https://sirb-two.vercel.app/" />
        <link
          rel="alternate"
          href="https://sirb-two.vercel.app/"
          hrefLang="ar"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "سيرب - منصة الأفلام والمسلسلات",
              alternateName: "Sirb Movies & TV Shows Platform",
              url: "https://sirb-two.vercel.app/",
              description:
                "منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية",
              inLanguage: "ar",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://sirb-two.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={dmSans.className}>
        <Navbar />
        <main className="pt-0">{children}</main>
      </body>
    </html>
  );
}
