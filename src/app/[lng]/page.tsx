"use client";

import React from "react";
import ServicesOverviewSection from "@/components/Homepage/ServicesOverview";
import FeaturedProjectsSection from "@/components/Homepage/FeaturedProjectsSection";
import SecondaryCTASection from "@/components/Homepage/SecondaryCTASection";
import TestimonialsSnippetSection from "@/components/Homepage/TestimonialsSnippetSection";
import WhyChooseUsSection from "@/components/Homepage/WhyChooseUsSection";
import HeroSection from "@/components/Homepage/HeroSection";

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <ServicesOverviewSection />
      <FeaturedProjectsSection />
      <WhyChooseUsSection />
      <TestimonialsSnippetSection />
      <SecondaryCTASection />
    </main>
  );
};

export default HomePage;
