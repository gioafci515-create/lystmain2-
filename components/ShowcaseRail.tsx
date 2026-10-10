"use client";

import Link from "next/link";
import { useRef } from "react";
import Phone from "./Phone";
import LiveFrame from "./LiveFrame";
import { invites } from "@/lib/site";
import type { Dict, Locale } from "@/lib/i18n";

export default function ShowcaseRail({ lang, d }: { lang: Locale; d: Dict }) {
  const rail = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 360), behavior: "smooth" });
  };

  return (
    <section className="sec sec-dark showcase">
      <div className="wrap">
        <header className="sec-head sec-head-row">
          <div>
            <h2 className="h2">{d.showcase.title}</h2>
            <p className="lead">{d.showcase.text}</p>
          </div>
          <div className="rail-ctrl">
            <button onClick={() => go(-1)} aria-label={d.common.prev}>←</button>
            <button onClick={() => go(1)} aria-label={d.common.next}>→</button>
          </div>
        </header>
      </div>

      <div className="rail" ref={rail} tabIndex={0} aria-label={d.showcase.title}>
        {invites.map((inv) => {
          const c = d.catalog.invites[inv.slug as keyof typeof d.catalog.invites];
          return (
            <article key={inv.slug} className="rail-item">
              <Link href={`/${lang}/catalog/${inv.slug}`} className="rail-link" aria-label={c.name}>
                <Phone className="rail-phone">
                  <LiveFrame url={inv.url} title={c.name} />
                </Phone>
              </Link>
              <div className="rail-cap">
                <h3>{c.name}</h3>
                <p>{c.type} · {c.place}</p>
              </div>
            </article>
          );
        })}
        <div className="rail-end" aria-hidden="true" />
      </div>

      <div className="wrap showcase-foot">
        <span className="swipe-hint">{d.common.swipe} →</span>
        <Link href={`/${lang}/catalog`} className="btn btn-paper">{d.showcase.cta}</Link>
      </div>
    </section>
  );
}
