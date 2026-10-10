"use client";

import { useEffect, useRef, useState } from "react";

const W = 390;
const H = 844;

/** Phone-sized live iframe, scaled to fit its container and loaded only once visible. */
export default function LiveFrame({
  url,
  title,
  interactive = false,
}: {
  url: string;
  title: string;
  interactive?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [h, setH] = useState(H);
  const [armed, setArmed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const sc = el.clientWidth / W;
      setScale(sc);
      setH(Math.ceil(el.clientHeight / sc));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={box} className={`live ${loaded ? "is-loaded" : ""}`}>
      <div className="live-skel" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {armed && (
        <iframe
          src={url}
          title={title}
          loading="lazy"
          width={W}
          height={h}
          onLoad={() => setLoaded(true)}
          style={{
            height: h,
            transform: `scale(${scale})`,
            pointerEvents: interactive ? "auto" : "none",
          }}
          tabIndex={interactive ? 0 : -1}
        />
      )}
    </div>
  );
}
