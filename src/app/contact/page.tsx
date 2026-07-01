import { contactContent } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { HelloHero } from "@/components/sections/contact/HelloHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { StudioInfo } from "@/components/sections/contact/StudioInfo";
import { FAQ } from "@/components/sections/contact/FAQ";
import { WordmarkBand } from "@/components/sections/home/WordmarkBand";

export const metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  image: contactContent.header.image,
});

export default function ContactPage() {
  return (
    <>
      <PageHeader {...contactContent.header} ohwKey="contact-page-title" bgKey="contact-header-bg" />
      <HelloHero {...contactContent.hello} />
      <section
        data-ohw-section="contact-form"
        className="contact-form-section"
        style={{ background: "var(--bone)", padding: "100px 64px 120px" }}
      >
        <style>{`
          @media (max-width: 960px) {
            .contact-form-section { padding: 72px 28px 96px !important; }
            .contact-form-grid {
              grid-template-columns: 1fr !important;
              gap: 56px !important;
            }
          }
          @media (max-width: 520px) {
            .contact-form-section { padding: 56px 20px 80px !important; }
          }
        `}</style>
        <div
          className="contact-form-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 96,
            alignItems: "start",
          }}
        >
          <ContactForm successMessage={contactContent.successMessage} />
          <StudioInfo details={contactContent.details} />
        </div>
      </section>
      <FAQ {...contactContent.faq} />
      <WordmarkBand {...contactContent.wordmark} />
    </>
  );
}
