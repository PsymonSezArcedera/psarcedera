import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Psymon Sez Arcedera — Full-Stack Developer",
  description:
    "Full-stack developer building AI-powered products and enterprise systems. CS student at UP Los Baños and DOST-SEI Merit Scholar.",
  metadataBase: new URL("https://psymonsezarcedera.vercel.app"),
  openGraph: {
    title: "Psymon Sez Arcedera — Full-Stack Developer",
    description:
      "Full-stack developer building AI-powered products and enterprise systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  );
}
