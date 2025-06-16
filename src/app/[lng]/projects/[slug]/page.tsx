"use client";
import { useEffect, useState } from "react";
import ProjectDetailClient from "@/components/Projects/ProjectDetailClient";
import { getProjectBySlug } from "@/lib/projectsData";
import { notFound, useParams } from "next/navigation";

const ProjectDetailPage = () => {
  const params = useParams();
  const { slug } = params;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchedProject = getProjectBySlug(slug as string);
      if (fetchedProject) {
        setProject(fetchedProject);
      } else {
        notFound(); // If no project is found, show a 404 page
      }
      setLoading(false);
    }
  }, [slug]); // This effect will run when the `slug` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>No project found</div>;
  }

  return <ProjectDetailClient project={project} />;
};

export default ProjectDetailPage;
