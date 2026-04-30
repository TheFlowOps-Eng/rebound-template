import { classesContent } from "@/content/classes";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClassLibrary } from "@/components/sections/classes/ClassLibrary";

export const metadata = buildMetadata({
  title: "Classes",
  path: "/classes",
  image: classesContent.header.image,
});

export default function ClassesPage() {
  return (
    <>
      <PageHeader {...classesContent.header} />
      <ClassLibrary filters={classesContent.filters} items={classesContent.items} />
    </>
  );
}
