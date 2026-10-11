"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MobileCta({ lang, label }: { lang: string; label: string }) {
  const pathname = usePathname() ?? "";
  const [show, setShow] = useState(false);
  const hidden = pathname.endsWith("/contact") || pathname.includes("/catalog");

  useEffect(() => {
    const on = () => setShow(window.scrollY > 520);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  if (hidden) return null;
  return (
    <Link href={`/${lang}/contact`} className={`mcta ${show ? "is-on" : ""}`} tabIndex={show ? 0 : -1}>
      <span className="mcta-dot" />
      {label}
    </Link>
  );
}
