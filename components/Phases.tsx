"use client";

import { useEffect, useRef, useState } from "react";
import Phone from "./Phone";
import type { Dict } from "@/lib/i18n";

function Screen({ i, label }: { i: number; label: string }) {
  if (i === 0) {
    return (
      <div className="ps ps-a">
        <div className="ps-head"><i /><span>{label}</span></div>
        <div className="ps-map">
          <svg viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M-10 150 C60 90 110 190 170 120 S260 60 320 110" />
            <path d="M-10 190 C80 150 140 210 210 170 S290 150 320 180" />
            <path d="M60 -10 L90 230 M180 -10 L150 230 M260 -10 L280 230" />
            <path d="M-10 60 L320 100" />
          </svg>
          <b className="ps-pin" />
          <span className="ps-tag">18:30</span>
        </div>
        <div className="ps-row"><i />  <span /></div>
        <div className="ps-row"><i /> <span className="s" /></div>
        <div className="ps-btn" />
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="ps ps-b">
        <div className="ps-head"><i /><span>{label}</span></div>
        <div className="ps-cam">
          <div className="ps-lens"><i /></div>
          <div className="ps-roll">{Array.from({ length: 12 }).map((_, k) => <i key={k} className={k < 7 ? "on" : ""} />)}</div>
        </div>
        <div className="ps-poll">
          <div><span style={{ width: "72%" }} /></div>
          <div><span style={{ width: "46%" }} /></div>
          <div><span style={{ width: "28%" }} /></div>
        </div>
      </div>
    );
  }
  return (
    <div className="ps ps-c">
      <div className="ps-head"><i /><span>{label}</span></div>
      <div className="ps-grid">
        {Array.from({ length: 9 }).map((_, k) => (
          <i key={k} style={{ ["--k" as string]: k }} />
        ))}
      </div>
      <div className="ps-lock"><b /><span>09:00</span></div>
      <div className="ps-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
    </div>
  );
}

export default function Phases({ t }: { t: Dict["phases"] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec phases">
      <div className="wrap">
        <header className="sec-head">
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.text}</p>
        </header>

        <div className="phases-grid">
          <div className="phases-sticky" aria-hidden="true">
            <div className="phases-stage">
              <Phone dark={false} className="phases-phone">
                {t.items.map((it, i) => (
                  <div key={i} className={`phases-screen ${active === i ? "is-on" : ""}`}>
                    <Screen i={i} label={it.name} />
                  </div>
                ))}
              </Phone>
              <div className="phases-dots">
                {t.items.map((_, i) => <i key={i} className={active === i ? "is-on" : ""} />)}
              </div>
            </div>
          </div>

          <ol className="phases-list">
            {t.items.map((it, i) => (
              <li
                key={i}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`phase ${active === i ? "is-on" : ""}`}
              >
                <span className="phase-num">0{i + 1}</span>
                <h3 className="phase-name">{it.name}</h3>
                <p className="phase-title">{it.title}</p>
                <p className="phase-text">{it.text}</p>
                <ul className="phase-bullets">
                  {it.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="phase-mini" aria-hidden="true">
                  <Phone dark={false} className="phone-sm">
                    <Screen i={i} label={it.name} />
                  </Phone>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
