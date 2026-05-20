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
      <PageHeader {...aboutContent.header} ohwKey="about-page-title" />
      <StoryLetter {...aboutContent.story} />
      <Manifesto {...aboutContent.manifesto} />
      <LagreeExplainer {...aboutContent.explainer} />
      <WaitlistCTA {...aboutContent.waitlist} />
    </>
  );
}
