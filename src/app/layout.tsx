import type { Metadata } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEGOMAP 3D | Official Voxelizer Engine",
  description: "Transform your images into stunning 3D Lego masterpieces with our advanced voxelization engine.",
  openGraph: {
    title: "LEGOMAP 3D",
    description: "Official Voxelizer Engine - Transform images to 3D Lego blocks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "LEGOMAP 3D Thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-fredoka">{children}</body>
    </html>
  );
}
