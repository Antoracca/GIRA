import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/shared/ChatWidget";
import CookieBanner from "@/components/shared/CookieBanner";
import PageLoader from "@/components/shared/PageLoader";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gira-cf.com"),
  title: "GIRA — Cabinet d'exécution des projets structurants en Afrique",
  description:
    "GIRA accompagne gouvernements, institutions et investisseurs dans la conception, structuration et exécution de projets à fort impact en Afrique.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "GIRA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${inter.variable} ${playfair.variable} antialiased`}>
        <PageLoader />
        {children}
        <ChatWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
