import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductIntro } from "@/components/sections/ProductIntro";
import { DoubleHeadSection } from "@/components/sections/DoubleHeadSection";
import { BodyAreas } from "@/components/sections/BodyAreas";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Travel } from "@/components/sections/Travel";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WhySwitch } from "@/components/sections/WhySwitch";
import { OfferSection } from "@/components/sections/OfferSection";
import { Reviews } from "@/components/sections/Reviews";
import { UGC } from "@/components/sections/UGC";
import { DeliveryInfo } from "@/components/sections/DeliveryInfo";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ViewContentTracker } from "@/components/providers/ViewContentTracker";

export default function Home() {
  return (
    <>
      <ViewContentTracker />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <ProductIntro />
      <DoubleHeadSection />
      <BodyAreas />
      <Lifestyle />
      <Travel />
      <FeatureGrid />
      <WhySwitch />
      <OfferSection />
      <Reviews />
      <UGC />
      <DeliveryInfo />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
