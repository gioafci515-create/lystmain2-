"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

export default function ContactForm({ t }: { t: Dict["contact"]["form"] }) {
  const [name, setName] = useState("");
  const [type, setType] = useState(t.types[0]);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [t.hello];
    if (name) lines.push(`${t.lblName}: ${name}`);
    lines.push(`${t.lblType}: ${type}`);
    if (date) lines.push(`${t.lblDate}: ${date}`);
    if (guests) lines.push(`${t.lblGuests}: ${guests}`);
    if (note) lines.push(`${t.lblNote}: ${note}`);
    return lines.join("\n");
  }, [t, name, type, date, guests, note]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      return true;
    } catch {
      return false;
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    await copy();
    window.open(site.instagramDm, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="form" onSubmit={send}>
      <label className="field">
        <span>{t.name}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} autoComplete="name" />
      </label>

      <fieldset className="field">
        <legend>{t.type}</legend>
        <div className="opts">
          {t.types.map((o) => (
            <label key={o} className={type === o ? "is-on" : ""}>
              <input type="radio" name="type" checked={type === o} onChange={() => setType(o)} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field-row">
        <label className="field">
          <span>{t.date}</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="field">
          <span>{t.guests}</span>
          <input
            inputMode="numeric"
            value={guests}
            onChange={(e) => setGuests(e.target.value.replace(/[^\d+-]/g, ""))}
            placeholder={t.guestsPh}
          />
        </label>
      </div>

      <label className="field">
        <span>{t.note}</span>
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.notePh} />
      </label>

      <div className="preview">
        <span>{t.preview}</span>
        <pre>{message}</pre>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-ink">{t.send}</button>
        <button type="button" className="btn btn-line" onClick={copy}>
          {copied ? `✓ ${t.copied}` : t.copy}
        </button>
      </div>
      <p className="form-hint">{t.hint}</p>
    </form>
  );
}
