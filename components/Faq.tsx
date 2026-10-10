export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>
            <span>{it.q}</span>
            <i aria-hidden="true" />
          </summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
