import { DM_Sans } from "next/font/google";
import "../styles/main.css";
import Navbar from "@/_components/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Sirb - Movies & TV Shows",
  description: "Discover the best movies and TV shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
