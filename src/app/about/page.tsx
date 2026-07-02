import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { StoryLetter } from "@/components/sections/about/StoryLetter";
import { Manifesto } from "@/components/sections/about/Manifesto";
import { LagreeExplainer } from "@/components/sections/about/LagreeExplainer";
import { WaitlistCTA } from "@/components/sections/about/WaitlistCTA";

export const metadata = buildMetadata({
  title: "About",
  path: "/about",
  image: aboutContent.header.image,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        {...aboutContent.header}
        ohwKey="about-page-title"
        bgKey="about-header-bg"
        sectionId="page-header"
        sectionLabel="Page Header"
      />
      {/* Scroll target for link-editor dev fixtures (ohw-fixtures=1) */}
      <div
        id="personal-training"
        data-ohw-section="personal-training"
        data-ohw-section-label="Personal training"
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
      <StoryLetter {...aboutContent.story} />
      <Manifesto {...aboutContent.manifesto} />
      <LagreeExplainer {...aboutContent.explainer} />
      <WaitlistCTA {...aboutContent.waitlist} />
    </>
  );
}
