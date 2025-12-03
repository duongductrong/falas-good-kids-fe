import { AmanotesLoading, SplashScreen } from "@/components/loading";
import { QueryProvider } from "@/components/query";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FALAS Good Kids",
  description: "FALAS Good Kids - Leaderboard",
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
        <SplashScreen minDisplayTime={1200} />
        <Suspense
          fallback={
            <AmanotesLoading className="w-full h-screen grid place-items-center fixed top-0 left-0 z-[9999] bg-background overflow-hidden" />
          }
        >
          <QueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </QueryProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
