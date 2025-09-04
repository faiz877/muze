import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muze App",
  description: "Social Media Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F6F6]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#F6F6F6]`}
      >
        <div className="min-h-screen bg-[#F6F6F6]">
          <Header />
          <Navigation />
          <main className="bg-[#F6F6F6]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
