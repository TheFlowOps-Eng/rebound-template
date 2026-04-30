import { homeContent } from "@/content/home";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { LagreeIntro } from "@/components/sections/home/LagreeIntro";
import { ClassesStrip } from "@/components/sections/home/ClassesStrip";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { PlanForm } from "@/components/sections/home/PlanForm";
import { WordmarkBand } from "@/components/sections/home/WordmarkBand";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero {...homeContent.hero} />
      <LagreeIntro {...homeContent.lagree} />
      <ClassesStrip {...homeContent.classes} />
      <Testimonials {...homeContent.testimonials} />
      <PlanForm {...homeContent.plan} />
      <WordmarkBand {...homeContent.wordmark} />
    </>
  );
}
