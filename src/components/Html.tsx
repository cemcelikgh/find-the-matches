'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useSelector } from "react-redux";
import { selectTheme } from "@/lib/features/themeSlice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function Html({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const theme = useSelector(selectTheme);

  return (
    <html lang="en" className={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

export default Html;
