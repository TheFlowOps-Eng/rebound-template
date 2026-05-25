import { instructorsContent } from "@/content/instructors";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { InstructorGrid } from "@/components/sections/instructors/InstructorGrid";

export const metadata = buildMetadata({
  title: "Instructors",
  path: "/instructors",
  image: instructorsContent.header.image,
});

export default function InstructorsPage() {
  return (
    <>
      <PageHeader {...instructorsContent.header} ohwKey="instructors-page-title" bgKey="instructors-header-bg" />
      <InstructorGrid team={instructorsContent.team} />
    </>
  );
}
