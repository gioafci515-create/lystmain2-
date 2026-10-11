import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { invites } from "@/lib/site";
import Phone from "@/components/Phone";
import LiveFrame from "@/components/LiveFrame";

export function generateStaticParams() {
  return locales.flatMap((lang) => invites.map((i) => ({ lang, slug: i.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/catalog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const c = getDict(lang).catalog.invites[slug as keyof ReturnType<typeof getDict>["catalog"]["invites"]];
  return c ? { title: c.name, description: c.desc } : {};
}

export default async function InvitePage({ params }: PageProps<"/[lang]/catalog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const inv = invites.find((i) => i.slug === slug);
  if (!inv) notFound();
  const d = getDict(lang);
  const c = d.catalog.invites[inv.slug as keyof typeof d.catalog.invites];
  const others = invites.filter((i) => i.slug !== inv.slug);

  return (
    <>
      <section className="detail">
        <div className="wrap detail-grid">
          <div className="detail-stage">
            <div className="detail-sticky">
              <Phone className="detail-phone">
                <LiveFrame url={inv.url} title={c.name} interactive />
              </Phone>
              <p className="detail-hint"><i />{d.detail.tryHint}</p>
            </div>
          </div>

          <div className="detail-copy">
            <Link href={`/${lang}/catalog`} className="back">← {d.common.back}</Link>
            <p className="cat-type">{c.type}</p>
            <h1 className="page-title detail-title">{c.name}</h1>
            <p className="lead">{c.desc}</p>

            <dl className="facts">
              <div><dt>{d.detail.place}</dt><dd>{c.place}</dd></div>
              <div><dt>{d.detail.date}</dt><dd>{inv.date}</dd></div>
              <div className="wide"><dt>{d.detail.mood}</dt><dd>{c.mood}</dd></div>
            </dl>

            <h2 className="mini-title">{d.detail.features}</h2>
            <ul className="tags tags-lg">
              {inv.features.map((f) => (
                <li key={f}>{d.detail.featureNames[f]}</li>
              ))}
            </ul>

            <p className="note">{d.detail.note}</p>

            <div className="detail-actions">
              <Link href={`/${lang}/contact`} className="btn btn-ink">{d.common.order}</Link>
              <a href={inv.url} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                {d.common.openLive} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec others">
        <div className="wrap">
          <h2 className="h3">{d.detail.other}</h2>
          <div className="others-grid">
            {others.map((o) => {
              const oc = d.catalog.invites[o.slug as keyof typeof d.catalog.invites];
              return (
                <Link key={o.slug} href={`/${lang}/catalog/${o.slug}`} className="other">
                  <span className="other-type">{oc.type}</span>
                  <span className="other-name">{oc.name}</span>
                  <span className="other-place">{oc.place} · {o.date}</span>
                  <span className="other-arrow" aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
