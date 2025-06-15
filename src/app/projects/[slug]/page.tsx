import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../../../lib/projectsData";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";

// This function tells Next.js which dynamic paths to generate at build time (SSG)
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

const ProjectDetailPage = ({ params }: ProjectDetailPageProps) => {
  const project = getProjectBySlug(params.slug);

  // If project not found, render 404 page
  if (!project) {
    notFound();
  }

  // Pass the fetched project data to the client component
  return <ProjectDetailClient project={project} />;
};

export default ProjectDetailPage;
