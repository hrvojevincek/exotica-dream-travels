import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/layout/header";
import SearchTrip from "@/components/layout/search-trip";
import QueryProvider from "@/lib/context/query-provider";
import FilterTrip from "@/components/layout/filter-trip";

import { Toaster } from "@/components/ui/sonner";
import { SearchProvider } from "@/lib/context/search-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dream Travels",
  description: "Dream Travels - Your Dream Destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SearchProvider>
            <main className="p-10">
              <Header />
              <SearchTrip />
              <FilterTrip />
              {children}
            </main>
            <Toaster />
          </SearchProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
