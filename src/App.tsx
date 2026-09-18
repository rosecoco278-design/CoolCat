import { useState } from "react";
import LiquidMetalHero from "@/components/ui/liquid-metal-hero";
import About from "@/components/About";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import StarsCanvas from "@/components/Stars";
import MyWork from "@/components/MyWork";
import WorkFolders from "@/components/WorkFolders";
import Community from "@/components/Community";
import ScrollIndicator from "@/components/ScrollIndicator";
import FollowCta from "@/components/FollowCta";
import { workCategories } from "@/data";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function App() {
  const [activeWorkTab, setActiveWorkTab] = useState(
    workCategories.find((c) => c.id !== "community")?.id ?? "strategy",
  );

  return (
    <div className="relative z-0 bg-background">
      <div className="relative mb-24 sm:mb-32">
        <LiquidMetalHero
          title="Hi, I'm Nhi"
          subtitle="I transform finance into strategy, simplify complex business problems, and leverage AI and data to drive better decisions."
          primaryCtaLabel="Get in Touch"
          secondaryCtaLabel="See My Work"
          onPrimaryCtaClick={() => scrollToId("contact")}
          onSecondaryCtaClick={() => scrollToId("work")}
        />
        <ScrollIndicator targetId="about" />
      </div>

      <div className="relative">
        <About />
        <ScrollIndicator targetId="work" light={false} />
      </div>

      <div className="mt-16 sm:mt-24">
        <MyWork onSelectCategory={setActiveWorkTab} />
      </div>

      <WorkFolders activeTab={activeWorkTab} onTabChange={setActiveWorkTab} />
      <Community />

      <Awards />
      <FollowCta />

      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}

export default App;
