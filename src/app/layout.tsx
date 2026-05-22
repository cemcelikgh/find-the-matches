import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";

export const metadata: Metadata = {
  title: "Find the Matches",
  description: "Patika Intermediate Frontend Web Development Path Certification Task",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}

export default RootLayout;
