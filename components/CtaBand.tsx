import Link from "next/link";
import { site } from "@/lib/site";
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
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Instagram</a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">TikTok</a>
          </div>
        </div>
      </div>
    </section>
  );
}
