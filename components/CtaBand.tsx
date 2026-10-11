import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";

export default function CtaBand({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <section className="cta">
      <div className="wrap cta-in">
        <h2 className="cta-title">{d.ctaBand.title}</h2>
        <div className="cta-side">
          <p>{d.ctaBand.text}</p>
          <div className="cta-actions">
            <Link href={`/${lang}/contact`} className="btn btn-paper">{d.ctaBand.button}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
