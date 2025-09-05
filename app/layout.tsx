import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import ApolloWrapper from "@/graphql/ApolloProvider";

import '@fontsource/inter/400.css'; // Regular
import '@fontsource/inter/500.css'; // Medium
import '@fontsource/inter/600.css'; // Semibold
import '@fontsource/inter/700.css'; // Bold

export const metadata: Metadata = {
  title: "Muze App",
  description: "Social Media Application",
  icons: [
    {
      rel: 'icon',
      url: '/muze.avif',
      type: 'image/avif',
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F6F6]">
      <body className="antialiased min-h-screen bg-[#F6F6F6]">
        <ApolloWrapper> 
          <div className="min-h-screen bg-[#F6F6F6]">
            <Header />
            <Navigation />
            <main className="bg-[#F6F6F6]">
              {children}
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}