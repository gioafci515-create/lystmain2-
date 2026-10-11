"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

/** Compact three-stop timeline: one hairline, three short lines. */
export default function Phases({ t }: { t: Dict["phases"] }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`tl ${seen ? "is-in" : ""}`} ref={ref}>
      <div className="wrap">
        <h2 className="tl-title">{t.title}</h2>
        <ol className="tl-list">
          {t.items.map((it, i) => (
            <li key={it.name} className="tl-item" style={{ ["--i" as string]: i }}>
              <span className="tl-dot" aria-hidden="true" />
              <h3 className="tl-name">{it.name}</h3>
              <p className="tl-head">{it.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
