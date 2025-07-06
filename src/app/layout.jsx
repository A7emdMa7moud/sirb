import { Cairo, DM_Sans } from "next/font/google";
import "../styles/main.css";
import Navbar from "@/_components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["latin"] });

export const metadata = {
  alternates: {
    canonical: "https://sirb-two.vercel.app/",
  },
  title: "سيرب | منصة الأفلام والمسلسلات العربية والعالمية",
  description:
    "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
  keywords: [
    "سيرب",
    "Sirb",
    "منصة سيرب",
    "sirb movies",
    "sirb tv",
    "sirb افلام",
    "sirb مسلسلات",
    "أفلام",
    "مسلسلات",
    "مشاهدة",
    "تقييم",
    "ترشيحات",
    "بحث",
    "مفضلة",
    "سينما",
    "تلفزيون",
    "منصة",
    "عربي",
    "trending",
    "movies",
    "tv shows",
    "reviews",
    "recommendations",
    "genres",
    "action",
    "drama",
    "comedy",
    "netflix",
    "شاهد",
    "اكشن",
    "دراما",
    "كوميدي",
    "جديد",
    "trending movies",
    "trending tv shows",
    "سيرب افلام",
    "سيرب مسلسلات",
    "سيرب TV",
    "سيرب MOVIES",
    "سيرب سينما",
    "سيرب منصة",
    "سيرب اونلاين",
    "سيرب مشاهدة",
    "سيرب تقييم",
    "سيرب ترشيحات",
    "سيرب بحث",
    "سيرب مفضلة",
    "سيرب trending",
    "سيرب reviews",
    "سيرب recommendations",
    "سيرب genres",
    "سيرب action",
    "سيرب drama",
    "سيرب comedy",
    "سيرب netflix",
    "سيرب شاهد",
    "سيرب اكشن",
    "سيرب دراما",
    "سيرب كوميدي",
    "سيرب جديد",
    "سيرب trending movies",
    "سيرب trending tv shows",
  ],
  // url: "https://res.cloudinary.com/test-image-upload-2/image/upload/v1751794854/sirb-og_hulpe0.png",

  openGraph: {
    type: "website",
    title: "سيرب | منصة الأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    url: "https://sirb-two.vercel.app/",
    images: [
      {
        url: "https://res.cloudinary.com/test-image-upload-2/image/upload/v1751332129/thumbnail_ud6vgd.jpg",
        width: 1200,
        height: 630,
        alt: "Sirb Preview",
      },
    ],
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Sirb | سيرب - أفضل منصة أفلام ومسلسلات عربية وعالمية | Sirb Movies & TV Shows | منصة سيرب للأفلام والمسلسلات",
    description:
      "Sirb (سيرب) - منصة سيرب لمتابعة أحدث وأفضل الأفلام والمسلسلات العربية والعالمية. تقييمات، ترشيحات، بحث متقدم، قوائم مفضلة، دعم الوضع الليلي، وأكثر. اكتشف كل جديد في عالم السينما والتلفزيون مع Sirb.",
    image:
      "https://res.cloudinary.com/test-image-upload-2/image/upload/v1751332129/thumbnail_ud6vgd.jpg",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://sirb-two.vercel.app/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${dmSans.className} ${cairo.className}`}>
        <Navbar />
        <main className="pt-0">{children}</main>
      </body>
    </html>
  );
}
