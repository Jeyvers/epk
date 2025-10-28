import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import "./globals.css";

const openSans = Open_Sans({
 variable: "--font-open-sans",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Jeyi - Artist (Singer, Songwriter & Rapper)",
 description:
  "Hello! I'm glad you found me :) I'm Jeyi, a rapper, singer, and songwriter",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={`${openSans.className} antialiased dark`}>{children}</body>
  </html>
 );
}
