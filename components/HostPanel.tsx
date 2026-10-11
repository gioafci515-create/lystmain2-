"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

function useCount(to: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, ms]);
  return v;
}

export default function HostPanel({ t }: { t: Dict["host"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const yes = useCount(112, seen);
  const no = useCount(9, seen);
  const wait = useCount(23, seen);

  return (
    <section className="sec host">
      <div className="wrap host-grid">
        <div className="host-copy">
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.text}</p>
        </div>

        <div className="panel" ref={ref}>
          <div className="panel-bar">
            <span className="dots"><i /><i /><i /></span>
            <b>{t.panelTitle}</b>
            <button type="button" tabIndex={-1}>{t.export}</button>
          </div>
          <div className="panel-stats">
            <div className="stat">
              <strong>{yes}</strong>
              <span>{t.confirmed}</span>
              <em style={{ ["--w" as string]: seen ? "78%" : "0%" }} />
            </div>
            <div className="stat">
              <strong>{wait}</strong>
              <span>{t.pending}</span>
              <em style={{ ["--w" as string]: seen ? "34%" : "0%" }} />
            </div>
            <div className="stat">
              <strong>{no}</strong>
              <span>{t.declined}</span>
              <em style={{ ["--w" as string]: seen ? "12%" : "0%" }} />
            </div>
          </div>
          <p className="panel-sub">{t.recent}</p>
          <ul className="panel-list">
            {t.guests.map((g) => (
              <li key={g.name}>
                <span className="av" aria-hidden="true">{g.name.slice(0, 1)}</span>
                <span className="who">
                  <b>{g.name}</b>
                  <small>{g.note}</small>
                </span>
                <span className={`pill pill-${g.status}`}>
                  {t.statusLabel[g.status as keyof typeof t.statusLabel]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
