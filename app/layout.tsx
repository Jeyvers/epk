import type { Metadata } from "next";
import {
 Lovers_Quarrel,
 Open_Sans,
 Zalando_Sans_Expanded,
} from "next/font/google";

import "./globals.css";

const openSans = Open_Sans({
 variable: "--font-open-sans",
 subsets: ["latin"],
});

const loversQuarrel = Lovers_Quarrel({
 variable: "--font-lovers-quarrel",
 subsets: ["latin"],
 weight: "400",
});

const zalando = Zalando_Sans_Expanded({
 variable: "--font-zalando",
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
   <body
    className={`${openSans.className} ${loversQuarrel.variable} ${zalando.variable} antialiased dark`}
   >
    {children}
   </body>
  </html>
 );
}
