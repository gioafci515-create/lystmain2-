import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import HeroPhone from "@/components/HeroPhone";
import Statement from "@/components/Statement";
import Phases from "@/components/Phases";
import Bento from "@/components/Bento";
import CtaBand from "@/components/CtaBand";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <>
      <section className="hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="wrap hero-body">
          <div className="hero-copy">
            <div className="mark hero-mark" aria-hidden="true">lyst.</div>
            <h1 className="hero-title">
              {d.hero.lines.map((line, i) => (
                <span className="mask" key={line}>
                  <span style={{ ["--d" as string]: `${0.1 + i * 0.14}s` }}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="hero-sub">{d.hero.sub}</p>
            <div className="hero-actions">
              <Link href={`/${lang}/contact`} className="btn btn-paper">{d.hero.primary}</Link>
              <Link href={`/${lang}/catalog`} className="btn btn-ghost">{d.hero.secondary}</Link>
            </div>
          </div>
          <div className="hero-stage">
            <HeroPhone t={d.hero.phone} />
          </div>
        </div>
      </section>

      <Statement text={d.statement.text} cta={d.statement.cta} href={`/${lang}/catalog`} />
      <Phases t={d.phases} />
      <Bento t={d.bento} />


      <CtaBand lang={lang} d={d} />
    </>
  );
}
