import { pricingContent } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { FreeClassCTA } from "@/components/sections/pricing/FreeClassCTA";
import { BenefitsMarquee } from "@/components/sections/pricing/BenefitsMarquee";
import { MonthlyMemberships } from "@/components/sections/pricing/MonthlyMemberships";
import { SpecialtyPrograms } from "@/components/sections/pricing/SpecialtyPrograms";
import { PackageMatcher } from "@/components/sections/pricing/PackageMatcher";
import { WordmarkBand } from "@/components/sections/home/WordmarkBand";

export const metadata = buildMetadata({
  title: "Pricing",
  path: "/pricing",
  image: pricingContent.header.image,
});

export default function PricingPage() {
  return (
    <>
      <PageHeader {...pricingContent.header} ohwKey="pricing-page-title" />
      <FreeClassCTA {...pricingContent.freeClass} />
      <BenefitsMarquee items={pricingContent.marquee} />
      <MonthlyMemberships {...pricingContent.memberships} />
      <SpecialtyPrograms {...pricingContent.specialty} />
      <PackageMatcher {...pricingContent.matcher} />
      <WordmarkBand {...pricingContent.wordmark} />
    </>
  );
}
