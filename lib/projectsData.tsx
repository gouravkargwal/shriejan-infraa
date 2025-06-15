import { Service } from "./serviceData";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  type?:
    | "before"
    | "after"
    | "in-progress"
    | "rendering"
    | "blueprint"
    | "final";
}

export interface TeamContribution {
  nameKey: string;
  roleKey: string;
  contributionKey: string;
}

export interface Project {
  id: string;
  slug: string;
  titleKey: string;
  locationKey: string;
  clientTypeKey: string;
  shortDescriptionKey: string;
  categories: Service["slug"][];
  challengeKey: string;
  solutionKey: string;
  servicesProvidedKeys: string[];
  images: ProjectImage[];
  teamContributions: TeamContribution[];
  resultsImpactKey: string;
  ctaKey: string;
}

// Helper to convert kebab-case string to camelCase string
export function kebabToCamelCase(kebabString: string): string {
  return kebabString.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Dummy Projects Data (remain unchanged)
export const projects: Project[] = [
  {
    id: "p1",
    slug: "modern-family-bungalow",
    titleKey: "projects.p1.title",
    locationKey: "projects.p1.location",
    clientTypeKey: "projects.clientTypes.residential",
    shortDescriptionKey: "projects.p1.shortDescription",
    categories: ["architecture", "construction", "interior-design"],
    challengeKey: "projects.p1.challenge",
    solutionKey: "projects.p1.solution",
    servicesProvidedKeys: [
      "services.architecture.title",
      "services.construction.title",
      "services.interiorDesign.title",
    ],
    images: [
      {
        src: "/images/projects/p1/thumb.jpg",
        alt: "Modern Bungalow Exterior",
        type: "final",
      },
      {
        src: "/images/projects/p1/img1.jpg",
        alt: "Living Room Interior",
        type: "final",
      },
      {
        src: "/images/projects/p1/img2.jpg",
        alt: "Kitchen View",
        type: "final",
      },
      {
        src: "/images/projects/p1/img3.jpg",
        alt: "Architectural Rendering",
        type: "rendering",
      },
      {
        src: "/images/projects/p1/img4.jpg",
        alt: "Construction in Progress",
        type: "in-progress",
      },
    ],
    teamContributions: [
      {
        nameKey: "aboutUs.team.akshay.name",
        roleKey: "aboutUs.team.akshay.role",
        contributionKey: "projects.p1.team.akshay",
      },
      {
        nameKey: "aboutUs.team.ankit.name",
        roleKey: "aboutUs.team.ankit.role",
        contributionKey: "projects.p1.team.ankit",
      },
    ],
    resultsImpactKey: "projects.p1.resultsImpact",
    ctaKey: "projects.p1.cta",
  },
  {
    id: "p2",
    slug: "commercial-office-complex",
    titleKey: "projects.p2.title",
    locationKey: "projects.p2.location",
    clientTypeKey: "projects.clientTypes.commercial",
    shortDescriptionKey: "projects.p2.shortDescription",
    categories: ["structure", "construction", "supervision"],
    challengeKey: "projects.p2.challenge",
    solutionKey: "projects.p2.solution",
    servicesProvidedKeys: [
      "services.structure.title",
      "services.construction.title",
      "services.supervision.title",
    ],
    images: [
      {
        src: "/images/projects/p2/thumb.jpg",
        alt: "Office Complex Exterior",
        type: "final",
      },
      {
        src: "/images/projects/p2/img1.jpg",
        alt: "Office Interior Lobby",
        type: "final",
      },
      {
        src: "/images/projects/p2/img2.jpg",
        alt: "Structural Framing",
        type: "in-progress",
      },
    ],
    teamContributions: [
      {
        nameKey: "aboutUs.team.akshay.name",
        roleKey: "aboutUs.team.akshay.role",
        contributionKey: "projects.p2.team.akshay",
      },
      {
        nameKey: "aboutUs.team.vijay.name",
        roleKey: "aboutUs.team.vijay.role",
        contributionKey: "projects.p2.team.vijay",
      },
    ],
    resultsImpactKey: "projects.p2.resultsImpact",
    ctaKey: "projects.p2.cta",
  },
  {
    id: "p3",
    slug: "boutique-hotel-interior",
    titleKey: "projects.p3.title",
    locationKey: "projects.p3.location",
    clientTypeKey: "projects.clientTypes.commercial",
    shortDescriptionKey: "projects.p3.shortDescription",
    categories: ["interior-design", "architecture"],
    challengeKey: "projects.p3.challenge",
    solutionKey: "projects.p3.solution",
    servicesProvidedKeys: [
      "services.interiorDesign.title",
      "services.architecture.title",
    ],
    images: [
      {
        src: "/images/projects/p3/thumb.jpg",
        alt: "Hotel Lobby Interior",
        type: "final",
      },
      {
        src: "/images/projects/p3/img1.jpg",
        alt: "Hotel Room Detail",
        type: "final",
      },
      {
        src: "/images/projects/p3/img2.jpg",
        alt: "Concept Sketch",
        type: "blueprint",
      },
    ],
    teamContributions: [
      {
        nameKey: "aboutUs.team.ankit.name",
        roleKey: "aboutUs.team.ankit.role",
        contributionKey: "projects.p3.team.ankit",
      },
    ],
    resultsImpactKey: "projects.p3.resultsImpact",
    ctaKey: "projects.p3.cta",
  },
  {
    id: "p4",
    slug: "industrial-warehouse-development",
    titleKey: "projects.p4.title",
    locationKey: "projects.p4.location",
    clientTypeKey: "projects.clientTypes.industrial",
    shortDescriptionKey: "projects.p4.shortDescription",
    categories: ["structure", "construction"],
    challengeKey: "projects.p4.challenge",
    solutionKey: "projects.p4.solution",
    servicesProvidedKeys: [
      "services.structure.title",
      "services.construction.title",
    ],
    images: [
      {
        src: "/images/projects/p4/thumb.jpg",
        alt: "Warehouse Exterior",
        type: "final",
      },
      {
        src: "/images/projects/p4/img1.jpg",
        alt: "Warehouse Interior",
        type: "final",
      },
      {
        src: "/images/projects/p4/img2.jpg",
        alt: "Steel Frame Erection",
        type: "in-progress",
      },
    ],
    teamContributions: [
      {
        nameKey: "aboutUs.team.akshay.name",
        roleKey: "aboutUs.team.akshay.role",
        contributionKey: "projects.p4.team.akshay",
      },
      {
        nameKey: "aboutUs.team.vijay.name",
        roleKey: "aboutUs.team.vijay.role",
        contributionKey: "projects.p4.team.vijay",
      },
    ],
    resultsImpactKey: "projects.p4.resultsImpact",
    ctaKey: "projects.p4.cta",
  },
  {
    id: "p5",
    slug: "residential-apartments",
    titleKey: "projects.p5.title",
    locationKey: "projects.p5.location",
    clientTypeKey: "projects.clientTypes.residential",
    shortDescriptionKey: "projects.p5.shortDescription",
    categories: ["architecture", "structure", "supervision"],
    challengeKey: "projects.p5.challenge",
    solutionKey: "projects.p5.solution",
    servicesProvidedKeys: [
      "services.architecture.title",
      "services.structure.title",
      "services.supervision.title",
    ],
    images: [
      {
        src: "/images/projects/p5/thumb.jpg",
        alt: "Residential Apartment Complex",
        type: "final",
      },
      {
        src: "/images/projects/p5/img1.jpg",
        alt: "Apartment Rendering",
        type: "rendering",
      },
    ],
    teamContributions: [
      {
        nameKey: "aboutUs.team.akshay.name",
        roleKey: "aboutUs.team.akshay.role",
        contributionKey: "projects.p5.team.akshay",
      },
      {
        nameKey: "aboutUs.team.ankit.name",
        roleKey: "aboutUs.team.ankit.role",
        contributionKey: "projects.p5.team.ankit",
      },
      {
        nameKey: "aboutUs.team.vijay.name",
        roleKey: "aboutUs.team.vijay.role",
        contributionKey: "projects.p5.team.vijay",
      },
    ],
    resultsImpactKey: "projects.p5.resultsImpact",
    ctaKey: "projects.p5.cta",
  },
];

// Helper functions for accessing project data (getProjectBySlug remains unchanged)
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

// Function to get unique service categories from all projects
export function getProjectCategories(
  t: (key: string) => string
): { value: string; label: string }[] {
  const allCategories = new Set<string>();
  projects.forEach((project) => {
    project.categories.forEach((category) => allCategories.add(category));
  });

  const categoriesArray = Array.from(allCategories).map((slug) => ({
    value: slug,
    // Use the kebabToCamelCase helper here to match translation keys
    label: t(`services.${kebabToCamelCase(slug)}.title`) || slug,
  }));

  // Ensure 'All' is present and at the beginning
  const allOption = { value: "all", label: t("projects.filters.all") };
  if (!categoriesArray.some((cat) => cat.value === "all")) {
    categoriesArray.unshift(allOption);
  } else {
    const existingAllIndex = categoriesArray.findIndex(
      (cat) => cat.value === "all"
    );
    if (existingAllIndex > 0) {
      const [allItem] = categoriesArray.splice(existingAllIndex, 1);
      categoriesArray.unshift(allItem);
    }
  }

  return categoriesArray;
}
