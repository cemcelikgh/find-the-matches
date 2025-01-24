import type { Metadata } from "next";
import "./globals.css";
import App from "@/components/App";

export const metadata: Metadata = {
  title: "Find the Matches",
  icons: {
    icon: 'cherries-fruit.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <App>
      {children}
    </App>
  );
}
