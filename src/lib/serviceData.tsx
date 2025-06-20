import React from "react";
import {
  BuildingOfficeIcon,
  CubeIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

// 1. Define the props interface for your SVG icons
export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number; // Assuming 'size' is a number prop
}

// Define the interface for a single service
export interface Service {
  id: string; // Unique identifier
  slug: string; // Used for URL path (e.g., /services/architecture)
  // 2. Change icon type to accept a React.ElementType that expects SvgIconProps
  icon: React.ElementType<React.SVGProps<SVGSVGElement>>;
  titleKey: string; // i18n key for the service title
  shortDescriptionKey: string; // i18n key for brief overview description
  longDescriptionKey: string; // i18n key for detailed description on service page
  benefitsKeys: string[]; // Array of i18n keys for benefits
  processStepsKeys: string[]; // Array of i18n keys for process steps
  ctaKey: string; // i18n key for the specific Call To Action button
  detailImageUrl: string; // Placeholder for a detail page image
}

export const services: Service[] = [
  {
    id: "s01",
    slug: "architecture",
    icon: BuildingOfficeIcon, // Pass the component reference, not an instance
    titleKey: "services.architecture.title",
    shortDescriptionKey: "services.architecture.shortDescription",
    longDescriptionKey: "services.architecture.longDescription",
    benefitsKeys: [
      "services.architecture.benefits.b1",
      "services.architecture.benefits.b2",
      "services.architecture.benefits.b3",
      "services.architecture.benefits.b4",
    ],
    processStepsKeys: [
      "services.architecture.process.p1",
      "services.architecture.process.p2",
      "services.architecture.process.p3",
      "services.architecture.process.p4",
    ],
    ctaKey: "services.architecture.cta",
    detailImageUrl: "/images/services/architecture.jpg", // Placeholder
  },
  {
    id: "s02",
    slug: "structure",
    icon: CubeIcon, // Pass the component reference
    titleKey: "services.structure.title",
    shortDescriptionKey: "services.structure.shortDescription",
    longDescriptionKey: "services.structure.longDescription",
    benefitsKeys: [
      "services.structure.benefits.b1",
      "services.structure.benefits.b2",
      "services.structure.benefits.b3",
    ],
    processStepsKeys: [
      "services.structure.process.p1",
      "services.structure.process.p2",
      "services.structure.process.p3",
    ],
    ctaKey: "services.structure.cta",
    detailImageUrl: "/images/services/structure.jpg", // Placeholder
  },
  {
    id: "s03",
    slug: "interior-design", // Use kebab-case for slugs
    icon: SparklesIcon, // Pass the component reference
    titleKey: "services.interiorDesign.title",
    shortDescriptionKey: "services.interiorDesign.shortDescription",
    longDescriptionKey: "services.interiorDesign.longDescription",
    benefitsKeys: [
      "services.interiorDesign.benefits.b1",
      "services.interiorDesign.benefits.b2",
      "services.interiorDesign.benefits.b3",
      "services.interiorDesign.benefits.b4",
    ],
    processStepsKeys: [
      "services.interiorDesign.process.p1",
      "services.interiorDesign.process.p2",
      "services.interiorDesign.process.p3",
      "services.interiorDesign.process.p4",
    ],
    ctaKey: "services.interiorDesign.cta",
    detailImageUrl: "/images/services/interiordesign.jpg", // Placeholder
  },
  {
    id: "s04",
    slug: "construction",
    icon: WrenchScrewdriverIcon, // Pass the component reference
    titleKey: "services.construction.title",
    shortDescriptionKey: "services.construction.shortDescription",
    longDescriptionKey: "services.construction.longDescription",
    benefitsKeys: [
      "services.construction.benefits.b1",
      "services.construction.benefits.b2",
      "services.construction.benefits.b3",
      "services.construction.benefits.b4",
      "services.construction.benefits.b5",
    ],
    processStepsKeys: [
      "services.construction.process.p1",
      "services.construction.process.p2",
      "services.construction.process.p3",
      "services.construction.process.p4",
      "services.construction.process.p5",
    ],
    ctaKey: "services.construction.cta",
    detailImageUrl: "/images/services/construction.jpg", // Placeholder
  },
  {
    id: "s05",
    slug: "supervision",
    icon: EyeIcon, // Pass the component reference
    titleKey: "services.supervision.title",
    shortDescriptionKey: "services.supervision.shortDescription",
    longDescriptionKey: "services.supervision.longDescription",
    benefitsKeys: [
      "services.supervision.benefits.b1",
      "services.supervision.benefits.b2",
      "services.supervision.benefits.b3",
    ],
    processStepsKeys: [
      "services.supervision.process.p1",
      "services.supervision.process.p2",
      "services.supervision.process.p3",
    ],
    ctaKey: "services.supervision.cta",
    detailImageUrl: "/images/services/supervision.jpg", // Placeholder
  },
];

// Function to get a service by its slug for dynamic pages
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

// Function to get all slugs for static path generation
export function getAllServiceSlugs() {
  return services.map((service) => ({ slug: service.slug }));
}
