import type { Dict } from "@/lib/i18n";

/** One quiet line of feature pills instead of a grid of cards. */
export default function Features({ t }: { t: Dict["bento"] }) {
  return (
    <section className="feat">
      <div className="wrap">
        <p className="feat-title">{t.title}</p>
        <ul className="feat-list">
          {t.items.map((it) => (
            <li key={it.id}>{it.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
