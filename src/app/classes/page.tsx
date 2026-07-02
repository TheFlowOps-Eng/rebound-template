import { classesContent } from "@/content/classes";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClassLibrary } from "@/components/sections/classes/ClassLibrary";
import { WordmarkBand } from "@/components/sections/home/WordmarkBand";

export const metadata = buildMetadata({
  title: "Classes",
  path: "/classes",
  image: classesContent.header.image,
});

export default function ClassesPage() {
  return (
    <>
      <PageHeader
        {...classesContent.header}
        ohwKey="classes-page-title"
        bgKey="classes-header-bg"
        sectionId="page-header"
        sectionLabel="Page Header"
      />
      <ClassLibrary filters={classesContent.filters} items={classesContent.items} />
      <WordmarkBand
        background="/assets/footer-bg.jpg"
        logo="/assets/footer-logo.png"
        alt="Re:Bound"
      />
    </>
  );
}
