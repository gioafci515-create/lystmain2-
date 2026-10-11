"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Phone from "./Phone";
import LiveFrame from "./LiveFrame";
import { invites, type InviteCategory } from "@/lib/site";
import type { Dict, Locale } from "@/lib/i18n";

type Filter = "all" | InviteCategory;
type View = "grid" | "reel";

export default function CatalogGrid({ lang, d }: { lang: Locale; d: Dict }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const [trying, setTrying] = useState<string | null>(null);
  const list = invites.filter((i) => filter === "all" || i.category === filter);
  const keys: Filter[] = ["all", "wedding", "brand", "party"];

  // Reel mode snaps the page to one invite per screen.
  useEffect(() => {
    document.documentElement.classList.toggle("snap", view === "reel");
    return () => document.documentElement.classList.remove("snap");
  }, [view]);

  const controls = (
    <div className="cat-bar">
      <div className="filters" role="tablist" aria-label={d.catalog.title}>
        {keys.map((k) => {
          const n = k === "all" ? invites.length : invites.filter((i) => i.category === k).length;
          return (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              className={filter === k ? "is-on" : ""}
              onClick={() => {
                setFilter(k);
                setTrying(null);
              }}
            >
              {d.catalog.filters[k]}
              <sup>{n}</sup>
            </button>
          );
        })}
      </div>
      <div className="views" role="group" aria-label="View">
        {(["grid", "reel"] as View[]).map((v) => (
          <button key={v} className={view === v ? "is-on" : ""} aria-pressed={view === v} onClick={() => setView(v)}>
            <i className={`vi vi-${v}`} aria-hidden="true" />
            {d.catalog.views[v]}
          </button>
        ))}
      </div>
    </div>
  );

  if (list.length === 0) {
    return (
      <>
        {controls}
        <p className="empty">{d.catalog.empty}</p>
      </>
    );
  }

  return (
    <>
      {controls}

      {view === "grid" ? (
        <div className="wgrid">
          {list.map((inv, idx) => {
            const c = d.catalog.invites[inv.slug as keyof typeof d.catalog.invites];
            return (
              <Link
                key={inv.slug}
                href={`/${lang}/catalog/${inv.slug}`}
                className={`wtile ${idx === 0 ? "wtile-big" : ""} tone-${idx % 4}`}
              >
                <div className="wtile-stage">
                  <Phone className="wtile-phone">
                    <LiveFrame url={inv.url} title={c.name} />
                  </Phone>
                </div>
                <div className="wtile-cap">
                  <div>
                    <h2>{c.name}</h2>
                    <p>
                      {c.type} · {c.place}
                    </p>
                  </div>
                  <span className="wtile-go" aria-hidden="true">↗</span>
                </div>
                <span className="wtile-live"><i />{d.common.live}</span>
              </Link>
            );
          })}
          <Link href={`/${lang}/contact`} className="wtile wtile-cta">
            <span className="wtile-plus" aria-hidden="true">+</span>
            <h2>{d.nav.cta}</h2>
            <p>{d.ctaBand.text}</p>
            <span className="wtile-go" aria-hidden="true">↗</span>
          </Link>
        </div>
      ) : (
        <div className="reel">
          {list.map((inv, idx) => {
            const c = d.catalog.invites[inv.slug as keyof typeof d.catalog.invites];
            const live = trying === inv.slug;
            return (
              <article key={inv.slug} className="slide">
                <div className="slide-phone">
                  <Phone>
                    <LiveFrame url={inv.url} title={c.name} interactive={live} />
                  </Phone>
                  <button
                    className={`slide-try ${live ? "is-on" : ""}`}
                    onClick={() => setTrying(live ? null : inv.slug)}
                  >
                    {live ? d.common.stop : d.common.try}
                  </button>
                </div>
                <div className="slide-info">
                  <span className="slide-n">
                    {String(idx + 1).padStart(2, "0")}/{String(list.length).padStart(2, "0")}
                  </span>
                  <p className="cat-type">{c.type} · {c.place}</p>
                  <h2 className="slide-name">{c.name}</h2>
                  <p className="slide-desc">{c.desc}</p>
                  <ul className="tags">
                    {inv.features.map((f) => (
                      <li key={f}>{d.detail.featureNames[f]}</li>
                    ))}
                  </ul>
                  <div className="slide-actions">
                    <Link href={`/${lang}/catalog/${inv.slug}`} className="btn btn-paper btn-sm">
                      {d.common.details}
                    </Link>
                    <Link href={`/${lang}/contact`} className="btn btn-ghost btn-sm">
                      {d.common.order}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
