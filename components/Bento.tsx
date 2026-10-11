import type { Dict } from "@/lib/i18n";

function Art({ id }: { id: string }) {
  switch (id) {
    case "link":
      return (
        <div className="art art-link" aria-hidden="true">
          <div className="url"><i />lyst.ge/<b>nino-giorgi</b></div>
          <div className="chips"><span>SMS</span><span>WhatsApp</span><span>Email</span><span>Instagram</span></div>
          <div className="answers"><b>✓</b><b>✓</b><b>✓</b><b className="m">+1</b><b>✓</b><b className="n">–</b></div>
        </div>
      );
    case "camera":
      return (
        <div className="art art-camera" aria-hidden="true">
          <i /><i /><i />
        </div>
      );
    case "voice":
      return (
        <div className="art art-voice" aria-hidden="true">
          <div className="wave">{Array.from({ length: 22 }).map((_, k) => <i key={k} style={{ ["--k" as string]: k }} />)}</div>
          <span>0:24</span>
        </div>
      );
    case "capsule":
      return (
        <div className="art art-capsule" aria-hidden="true">
          <div className="lock"><i /></div>
          <span>01.10.2027</span>
        </div>
      );
    case "polls":
      return (
        <div className="art art-polls" aria-hidden="true">
          <div><span style={{ width: "78%" }} /></div>
          <div><span style={{ width: "52%" }} /></div>
          <div><span style={{ width: "24%" }} /></div>
        </div>
      );
    default:
      return (
        <div className="art art-domain" aria-hidden="true">
          <span>lyst.ge/<b>yourevent</b></span>
        </div>
      );
  }
}

export default function Bento({ t }: { t: Dict["bento"] }) {
  return (
    <section className="sec bento">
      <div className="wrap">
        <header className="sec-head">
          <h2 className="h2">{t.title}</h2>
        </header>
        <div className="bento-grid">
          {t.items.slice(0, 4).map((it) => (
            <article key={it.id} className={`tile tile-${it.id}`}>
              <Art id={it.id} />
              <div className="tile-copy">
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
