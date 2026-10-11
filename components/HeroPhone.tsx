"use client";

import { useEffect, useState } from "react";
import Phone from "./Phone";
import type { Dict } from "@/lib/i18n";

type Answer = "none" | "yes" | "no";

export default function HeroPhone({ t }: { t: Dict["hero"]["phone"] }) {
  const [answer, setAnswer] = useState<Answer>("none");
  const [touched, setTouched] = useState(false);
  const confirmed = answer === "yes" ? 48 : 47;

  // Until the visitor taps something, the phone demos itself: confirm, pause, reset, repeat.
  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setAnswer((a) => (a === "none" ? "yes" : "none")),
      answer === "none" ? 2600 : 4800,
    );
    return () => window.clearTimeout(id);
  }, [answer, touched]);

  const reply = (a: Answer) => {
    setTouched(true);
    setAnswer(a);
  };

  return (
    <div className="hp">
      <div className="hp-rings" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <Phone className="hp-phone">
        <div className="inv">
          <div className="inv-top">
            <span className="inv-mono">N<em>&amp;</em>G</span>
            <span className="inv-live"><i />Lyst</span>
          </div>
          <h3 className="inv-title">{t.event}</h3>
          <p className="inv-hosts">{t.hosts}</p>

          <dl className="inv-meta">
            <div><dt aria-hidden="true">◷</dt><dd>{t.when}</dd></div>
            <div><dt aria-hidden="true">⌖</dt><dd>{t.where}</dd></div>
            <div><dt aria-hidden="true">◈</dt><dd>{t.dress}</dd></div>
          </dl>

          <div className="inv-map" aria-hidden="true">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none">
              <path d="M0 60 C60 20 90 80 150 45 S250 20 300 50" />
              <path d="M0 80 C70 55 120 90 180 70 S260 60 300 82" />
              <path d="M40 0 L70 90 M150 0 L120 90 M240 0 L260 90" />
            </svg>
            <b />
          </div>

          <div className="inv-count" aria-live="polite">
            <span>
              <strong>{confirmed}</strong> {t.of} 60 {t.count}
            </span>
            <span className="inv-bar"><i style={{ width: `${(confirmed / 60) * 100}%` }} /></span>
          </div>

          {answer === "none" ? (
            <div className="inv-actions">
              <button className="inv-yes" onClick={() => reply("yes")}>{t.yes}</button>
              <button className="inv-no" onClick={() => reply("no")}>{t.no}</button>
            </div>
          ) : (
            <div className={`inv-done ${answer === "yes" ? "is-yes" : ""}`}>
              <span className="inv-check" aria-hidden="true">{answer === "yes" ? "✓" : "–"}</span>
              <p>{answer === "yes" ? t.yesDone : t.noDone}</p>
              <button onClick={() => reply("none")}>{t.change}</button>
            </div>
          )}
        </div>
      </Phone>

      <div className={`hp-chip hp-chip-voice ${answer === "yes" ? "is-on" : ""}`} aria-hidden="true">
        <span className="wave"><i /><i /><i /><i /><i /><i /><i /></span>
        <b>0:24</b>
      </div>
      <div className={`hp-chip hp-chip-photo ${answer === "yes" ? "is-on" : ""}`} aria-hidden="true">
        <span className="photo" />
        <b>+12</b>
      </div>
    </div>
  );
}
