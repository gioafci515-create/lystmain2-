export default function Marquee({ words }: { words: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w}>
          <span>{w}</span>
          <i />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
