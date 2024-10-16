import { SessionProvider } from "@/context/SessionContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Notebook",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <div className="main">{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
