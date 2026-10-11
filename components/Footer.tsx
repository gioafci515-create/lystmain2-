import Link from "next/link";
import { site } from "@/lib/site";
import type { Dict, Locale } from "@/lib/i18n";

export default function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const nav = d.nav;
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-brand">
          <p>{d.footer.tagline}</p>
          <p className="ftr-studio">{d.footer.studio}</p>
        </div>
        <div>
          <h3>{d.footer.links}</h3>
          <ul>
            <li><Link href={`/${lang}`}>{nav.home}</Link></li>
            <li><Link href={`/${lang}/catalog`}>{nav.catalog}</Link></li>
            <li><Link href={`/${lang}/experience`}>{nav.experience}</Link></li>
            <li><Link href={`/${lang}/pricing`}>{nav.pricing}</Link></li>
            <li><Link href={`/${lang}/contact`}>{nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h3>{d.footer.social}</h3>
          <ul>
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></li>
            <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="mark ftr-mark" aria-hidden="true">lyst.</div>
      </div>
      <div className="wrap ftr-bottom">
        <span>{d.footer.rights}</span>
        <a href="#main" className="ftr-top">{d.footer.top} ↑</a>
      </div>
    </footer>
  );
}
