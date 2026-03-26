"use client";

import { useState } from "react";
import { ModalLeadForm } from "@/components/ui/ModalLeadForm";
import { BenefitStory } from "@/components/sections/BenefitStory";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { Navbar } from "@/components/sections/Navbar";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { StickyStorySection } from "@/components/sections/StickyStorySection";
import { ValueCards } from "@/components/sections/ValueCards";

export function HomePage() {
  const [activeModal, setActiveModal] = useState<"space" | "updates" | null>(null);
  const openSpace = () => setActiveModal("space");
  const openUpdates = () => setActiveModal("updates");

  return (
    <>
      <Navbar onOpenSpace={openSpace} />
      <main className="relative" style={{ overflowX: "clip" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12rem] top-[26rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(205,168,116,0.024),transparent_72%)] blur-3xl" />
          <div className="absolute right-[-16rem] top-[70rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(130,144,106,0.02),transparent_70%)] blur-3xl" />
          <div className="absolute inset-x-0 top-[118rem] h-[28rem] bg-[radial-gradient(circle_at_50%_50%,rgba(245,232,214,0.12),transparent_74%)]" />
        </div>

        <Hero onOpenSpace={openSpace} />
        <StickyStorySection />
        <ValueCards />
        <BrandShowcase />
        <CommunitySection onOpenUpdates={openUpdates} />
        <BenefitStory onOpenSpace={openSpace} />
        <OpeningSection onOpenSpace={openSpace} onOpenUpdates={openUpdates} />
        <InstagramSection />
        <LocationSection />
        <FinalCTA onOpenSpace={openSpace} onOpenUpdates={openUpdates} />
      </main>
      <Footer />
      <ModalLeadForm open={activeModal !== null} type={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
