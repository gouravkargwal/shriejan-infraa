import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";
import { getProjectBySlug, projects } from "@/lib/projectsData";

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

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
};

export default ProjectDetailPage;
