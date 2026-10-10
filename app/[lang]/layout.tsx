import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope, Noto_Serif_Georgian, Noto_Sans_Georgian } from "next/font/google";
import "../globals.css";
import { getDict, hasLocale, htmlLang, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--f-display-latin",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--f-body-latin",
  display: "swap",
});
const notoSerifGe = Noto_Serif_Georgian({
  subsets: ["georgian"],
  variable: "--f-display-ge",
  display: "swap",
});
const notoSansGe = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--f-body-ge",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return {
    title: { default: d.meta.title, template: "%s — Lyst." },
    description: d.meta.description,
    alternates: { languages: { ka: "/ge", en: "/en", ru: "/ru" } },
    openGraph: { title: d.meta.title, description: d.meta.description, type: "website" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html
      lang={htmlLang[lang]}
      className={`${cormorant.variable} ${manrope.variable} ${notoSerifGe.variable} ${notoSansGe.variable}`}
    >
      <body>
        <Header lang={lang} nav={d.nav} />
        <main id="main">{children}</main>
        <Footer lang={lang} d={d} />
        <MobileCta lang={lang} label={d.nav.cta} />
      </body>
    </html>
  );
}
