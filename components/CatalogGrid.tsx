"use client";

import Link from "next/link";
import { useState } from "react";
import Phone from "./Phone";
import LiveFrame from "./LiveFrame";
import { invites, type InviteCategory } from "@/lib/site";
import type { Dict, Locale } from "@/lib/i18n";

type Filter = "all" | InviteCategory;

export default function CatalogGrid({ lang, d }: { lang: Locale; d: Dict }) {
  const [filter, setFilter] = useState<Filter>("all");
  const list = invites.filter((i) => filter === "all" || i.category === filter);
  const keys: Filter[] = ["all", "wedding", "brand", "party"];

  return (
    <>
      <div className="filters" role="tablist" aria-label={d.catalog.title}>
        {keys.map((k) => {
          const n = k === "all" ? invites.length : invites.filter((i) => i.category === k).length;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              className={filter === k ? "is-on" : ""}
              onClick={() => setFilter(k)}
            >
              {d.catalog.filters[k]}
              <sup>{n}</sup>
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <p className="empty">{d.catalog.empty}</p>
      ) : (
        <div className="cat-grid">
          {list.map((inv, idx) => {
            const c = d.catalog.invites[inv.slug as keyof typeof d.catalog.invites];
            return (
              <article key={inv.slug} className={`cat-card tone-${idx % 4}`}>
                <Link href={`/${lang}/catalog/${inv.slug}`} className="cat-stage" aria-label={c.name}>
                  <Phone className="cat-phone">
                    <LiveFrame url={inv.url} title={c.name} />
                  </Phone>
                  <span className="cat-badge"><i />{d.common.live}</span>
                </Link>
                <div className="cat-body">
                  <p className="cat-type">{c.type} · {c.place}</p>
                  <h2 className="cat-name">{c.name}</h2>
                  <p className="cat-desc">{c.desc}</p>
                  <ul className="tags">
                    {inv.features.slice(0, 4).map((f) => (
                      <li key={f}>{d.detail.featureNames[f]}</li>
                    ))}
                  </ul>
                  <div className="cat-actions">
                    <Link href={`/${lang}/catalog/${inv.slug}`} className="btn btn-ink btn-sm">
                      {d.common.viewLive}
                    </Link>
                    <span className="cat-date">{inv.date}</span>
                  </div>
                </div>
              </article>
            );
          })}

          <article className="cat-card cat-next">
            <div className="cat-next-in">
              <span className="cat-plus" aria-hidden="true">+</span>
              <h2 className="cat-name">{d.nav.cta}</h2>
              <p className="cat-desc">{d.ctaBand.text}</p>
              <Link href={`/${lang}/contact`} className="btn btn-paper btn-sm">{d.ctaBand.button}</Link>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
