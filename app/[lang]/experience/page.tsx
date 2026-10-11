import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDict(lang).nav.experience, description: getDict(lang).experience.intro };
}

export default async function ExperiencePage({ params }: PageProps<"/[lang]/experience">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const x = d.experience;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-title">{x.title}</h1>
          <p className="lead">{x.intro}</p>
        </div>
      </section>

      <section className="sec steps-sec">
        <div className="wrap">
          <header className="sec-head">
            <h2 className="h2">{x.processTitle}</h2>
            <p className="lead">{x.processText}</p>
          </header>
          <ol className="steps">
            {x.steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>



      <section className="vision">
        <div className="wrap">
          <h2 className="vision-title">{x.visionTitle}</h2>
          <p className="vision-text">{x.vision}</p>
        </div>
      </section>

      <CtaBand lang={lang} d={d} />
    </>
  );
}
