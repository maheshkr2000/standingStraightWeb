import { Navigation, Footer } from "@/components/shared";
import { HeroSectionCMS, MissionSnapshotCMS, StoriesEventsCTA, HowYouCanHelpCMS, PartnersCMS, GlobalFootprintCMS } from "@/components/cms";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSectionCMS />
        <MissionSnapshotCMS />
        <StoriesEventsCTA />
        <HowYouCanHelpCMS />
        <PartnersCMS />
        <GlobalFootprintCMS />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
