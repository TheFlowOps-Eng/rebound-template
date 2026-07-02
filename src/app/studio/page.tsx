import { studioContent } from "@/content/studio";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { StudioIntro } from "@/components/sections/studio/StudioIntro";
import { StudioGallery } from "@/components/sections/studio/StudioGallery";
import { StudioFeatures } from "@/components/sections/studio/StudioFeatures";
import { StudioVisit } from "@/components/sections/studio/StudioVisit";
import { WordmarkBand } from "@/components/sections/home/WordmarkBand";

export const metadata = buildMetadata({
  title: "Studio",
  path: "/studio",
  image: studioContent.header.image,
});

export default function StudioPage() {
  return (
    <>
      <PageHeader
        {...studioContent.header}
        ohwKey="studio-page-title"
        bgKey="studio-header-bg"
        sectionId="page-header"
        sectionLabel="Page Header"
      />
      <StudioIntro {...studioContent.intro} />
      <StudioGallery images={studioContent.gallery} />
      <StudioFeatures {...studioContent.features} />
      <StudioVisit {...studioContent.visit} />
      <WordmarkBand {...studioContent.wordmark} />
    </>
  );
}
