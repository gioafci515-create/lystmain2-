"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Big statement whose words light up as the section scrolls through the viewport. */
export default function Statement({ text, cta, href }: { text: string; cta: string; href: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setLit(Math.round(p * words.length));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [words.length]);

  return (
    <section className="statement">
      <div className="wrap">
        <p className="st-text" ref={ref}>
          {words.map((w, i) => (
            <span key={i} className={i < lit ? "on" : ""}>
              {w}{" "}
            </span>
          ))}
        </p>
        <Link href={href} className="st-link">
          {cta} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
