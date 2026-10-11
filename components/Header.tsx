"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { locales, localeLabel, type Locale, type Dict } from "@/lib/i18n";

const links = [
  { href: "", key: "home" },
  { href: "/catalog", key: "catalog" },
  { href: "/experience", key: "experience" },
  { href: "/pricing", key: "pricing" },
  { href: "/contact", key: "contact" },
] as const;

export default function Header({ lang, nav }: { lang: Locale; nav: Dict["nav"] }) {
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(ge|en|ru)/, "") || "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "" ? rest === "" : rest.startsWith(href));

  // Already on the homepage: the link does not navigate, so scroll to the top instead.
  const onLogo = () => {
    setOpen(false);
    if (rest === "") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switcher = (
    <div className="lang" role="group" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          className={l === lang ? "is-on" : ""}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => setOpen(false)}
        >
          {localeLabel[l]}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className={`hdr ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <div className="hdr-in">
          <Link href={`/${lang}`} className="hdr-logo" onClick={onLogo} aria-label="Lyst — home">
            <Logo />
          </Link>
          <nav className="hdr-nav" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.key}
                href={`/${lang}${l.href}`}
                className={isActive(l.href) ? "is-on" : ""}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                <span>{nav[l.key]}</span>
              </Link>
            ))}
          </nav>
          <div className="hdr-right">
            <div className="hdr-lang">{switcher}</div>
            <Link href={`/${lang}/contact`} className="btn btn-ink btn-sm hdr-cta">
              {nav.cta}
            </Link>
            <button
              className="burger"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? nav.close : nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="menu-nav" aria-label="Mobile">
          {links.map((l, i) => (
            <Link
              key={l.key}
              href={`/${lang}${l.href}`}
              onClick={() => setOpen(false)}
              style={{ ["--i" as string]: i }}
              className={isActive(l.href) ? "is-on" : ""}
              tabIndex={open ? 0 : -1}
            >
              {nav[l.key]}
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          {switcher}
          <Link
            href={`/${lang}/contact`}
            className="btn btn-paper"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
