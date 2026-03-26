import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { BRAND_ASSETS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Lúmmia | Donde las ideas se encuentran",
  description:
    "Homepage premium para Lúmmia, tienda colectiva en Cuernavaca para descubrir marcas locales y solicitar espacio.",
  icons: {
    icon: BRAND_ASSETS.icon,
    shortcut: BRAND_ASSETS.icon,
    apple: BRAND_ASSETS.icon,
  },
  openGraph: {
    title: "Lúmmia | Donde las ideas se encuentran",
    description:
      "Homepage premium para Lúmmia, tienda colectiva en Cuernavaca para descubrir marcas locales y solicitar espacio.",
    images: [
      {
        url: BRAND_ASSETS.logo,
        alt: "Logo de Lúmmia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lúmmia | Donde las ideas se encuentran",
    description:
      "Homepage premium para Lúmmia, tienda colectiva en Cuernavaca para descubrir marcas locales y solicitar espacio.",
    images: [BRAND_ASSETS.logo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
