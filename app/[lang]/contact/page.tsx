import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, hasLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDict(lang).nav.contact, description: getDict(lang).contact.intro };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const c = d.contact;

  return (
    <section className="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h1 className="page-title">{c.title}</h1>
          <p className="lead">{c.intro}</p>

          <div className="socials">
            <p>{c.social}</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
              <b>@lystinvites</b>
            </a>
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer">
              <span>TikTok</span>
              <b>@lystinvites</b>
            </a>
          </div>
          <p className="studio">{c.studio}</p>
        </div>
        <ContactForm t={c.form} />
      </div>
    </section>
  );
}
