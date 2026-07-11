import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { PERSON_PROFILE } from "@/config/person";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `Birthday Montage for ${PERSON_PROFILE.name}`,
  description: `Answer a playful prompt about ${PERSON_PROFILE.name} and add your little metaphor to the collage.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="bg-noise min-h-full flex flex-col">{children}</body>
    </html>
  );
}
