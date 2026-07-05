import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import SessionWrapper from "./components/SessionWrapper";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "get me a chai",
  description: "fund your project",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black  overflow-x-clip">
        <SessionWrapper>
          <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
          <Navbar />
          <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white   ">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
