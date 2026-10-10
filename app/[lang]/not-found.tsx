import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="page-title">404</h1>
        <p className="lead">
          <Link href="/ge" className="btn btn-ink">Lyst.</Link>
        </p>
      </div>
    </section>
  );
}
