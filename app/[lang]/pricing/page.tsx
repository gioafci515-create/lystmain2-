import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDict(lang).nav.pricing, description: getDict(lang).pricing.intro };
}

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const p = d.pricing;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-title">{p.title}</h1>
          <p className="lead">{p.intro}</p>
        </div>
      </section>

      <section className="pricing">
        <div className="wrap tiers">
          {p.tiers.map((t, i) => (
            <article key={t.name} className={`tier ${i === 1 ? "tier-hot" : ""}`}>
              {i === 1 && <span className="tier-flag">{p.popular}</span>}
              <h2 className="tier-name">{t.name}</h2>
              <p className="tier-for">{t.for}</p>
              <p className="tier-price">{p.onRequest}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link href={`/${lang}/contact`} className={`btn ${i === 1 ? "btn-paper" : "btn-ink"}`}>
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="sec compare">
        <div className="wrap">
          <h2 className="h3">{p.compareTitle}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col"><span className="sr">{p.compareTitle}</span></th>
                  {p.compareCols.map((c) => (
                    <th scope="col" key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.compareRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i}>
                        {v === true ? <span className="yes" aria-label="✓">✓</span> : v === false ? <span className="no" aria-label="—">—</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec faq-sec">
        <div className="wrap faq-grid">
          <h2 className="h2">{p.faqTitle}</h2>
          <Faq items={p.faq} />
        </div>
      </section>

      <CtaBand lang={lang} d={d} />
    </>
  );
}
