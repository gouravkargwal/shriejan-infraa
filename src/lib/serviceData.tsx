// lib/servicesData.ts
import React from "react";

// Define the interface for a single service
export interface Service {
  id: string; // Unique identifier
  slug: string; // Used for URL path (e.g., /services/architecture)
  icon: React.ReactNode; // SVG icon component
  titleKey: string; // i18n key for the service title
  shortDescriptionKey: string; // i18n key for brief overview description
  longDescriptionKey: string; // i18n key for detailed description on service page
  benefitsKeys: string[]; // Array of i18n keys for benefits
  processStepsKeys: string[]; // Array of i18n keys for process steps
  ctaKey: string; // i18n key for the specific Call To Action button
  detailImageUrl: string; // Placeholder for a detail page image
}

// Placeholder SVG Icons (Replace with proper icons like Heroicons or Font Awesome)
const ArchitectureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-blue-600 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21V12m0 0v-2.25m0 2.25h18m0 0V21m0 0v-9.75m0 0V9A2.25 2.25 0 0 0 18 6.75h-4.5m0 0a2.25 2.25 0 0 0-2.25-2.25h-2.25A2.25 2.25 0 0 0 6.75 6.75m0 0v14.25m0-4.5H3.75m10.125 0H18"
    />
  </svg>
);

const StructureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-blue-600 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 12h-15m0 0h15m-15 0L6 21m-2.5-9L6 3m15 9h-15M6 21h12.75c.414 0 .75-.336.75-.75V11.25a2.25 2.25 0 0 0-2.25-2.25H9M6 21V9.75"
    />
  </svg>
);

const InteriorDesignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-blue-600 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 21v-4.757c0-.11.023-.215.065-.31L12 15.625l3.685 1.308c.042.095.065.201.065.31V21m-8.25-10.375l1.375.625M5.25 15.375l2.25-.875c.041-.018.083-.035.125-.052M12 4.5l5.25 2.625V4.5m0 0A2.25 2.25 0 0 0 17.25 2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v2.375m-4.5 0V4.5m0 0A2.25 2.25 0 0 0 7.5 2.25h-1.5A2.25 2.25 0 0 0 3.75 4.5v2.375m0 0h-.125M3.75 15.375l2.25-.875C6.041 14.482 6.083 14.465 6.125 14.448M12 3v.375m0 0v2.25m0 0l-5.25 2.625M12 4.5l5.25 2.625V4.5m0 0A2.25 2.25 0 0 0 17.25 2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v2.375m-4.5 0V4.5m0 0A2.25 2.25 0 0 0 7.5 2.25h-1.5A2.25 2.25 0 0 0 3.75 4.5v2.375m0 0h-.125"
    />
  </svg>
);

const ConstructionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-blue-600 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.079 0-2.15.12-3.174.341M12 6.042V3.75m0 2.292c0 .114-.028.28-.522.107-1.579-.513-3.193-1.16-4.742-1.895M12 6.042a8.967 8.967 0 0 1 6-2.292c1.079 0 2.15.12 3.174.341M12 6.042V3.75m0 2.292c0 .114.028.28.522.107 1.579-.513 3.193-1.16 4.742-1.895M18.75 16.5c.9-.9 1.254-2.25.86-3.414L15.375 9H9.75v4.5H12a2.25 2.25 0 0 1 2.25 2.25V21m-1.5-4.5h.008v.008H12v-.008Zm.375 0a.375.375 0 1 1 0 .75.375.375 0 0 1 0-.75ZM20.25 10.5H18m-6 2.25a.375.375 0 1 1 0 .75.375.375 0 0 1 0-.75ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const SupervisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-blue-600 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

export const services: Service[] = [
  {
    id: "s01",
    slug: "architecture",
    icon: <ArchitectureIcon />,
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
    icon: <StructureIcon />,
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
    icon: <InteriorDesignIcon />,
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
    icon: <ConstructionIcon />,
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
    icon: <SupervisionIcon />,
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
