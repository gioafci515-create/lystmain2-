import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import CatalogGrid from "@/components/CatalogGrid";

export async function generateMetadata({ params }: PageProps<"/[lang]/catalog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDict(lang).catalog.title, description: getDict(lang).catalog.intro };
}

export default async function CatalogPage({ params }: PageProps<"/[lang]/catalog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <section className="page-hero page-hero-dark">
        <div className="wrap">
          <h1 className="page-title">{d.catalog.title}</h1>
          <p className="lead">{d.catalog.intro}</p>
        </div>
      </section>
      <section className="catalog catalog-dark">
        <div className="wrap">
          <CatalogGrid lang={lang} d={d} />
        </div>
      </section>
    </>
  );
}
