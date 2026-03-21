import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
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
  title: {
    default: "GIRA — Cabinet d'exécution des projets structurants en Afrique",
    template: "%s | GIRA",
  },
  description:
    "GIRA accompagne gouvernements, institutions et investisseurs dans la conception, structuration et exécution de projets à fort impact en Afrique.",
  openGraph: {
    type: "website",
    siteName: "GIRA",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  // Load messages for current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <PageLoader />
          {children}
          <ChatWidget />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
