"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  getProjectCategories,
  kebabToCamelCase,
  projects,
} from "@/lib/projectsData";
import { ClientPageProps } from "@/types";

const ProjectsOverviewPage = ({ params: { lng } }: ClientPageProps) => {
  const { t } = useTranslation(lng);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = getProjectCategories(t);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") {
      return true;
    }
    return project.categories.includes(activeFilter);
  });

  const sectionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const galleryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gray-100 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        {/* Title Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-5 leading-tight">
            {t("projects.overview.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("projects.overview.description")}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                px-5 py-2 rounded-full font-semibold text-base transition-colors duration-300
                ${
                  activeFilter === filter.value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeFilter}
          variants={galleryContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={projectCardVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative w-full h-56 bg-gray-200">
                    <Image
                      src={project.images[0].src}
                      alt={t(project.titleKey)}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t(project.locationKey)}
                    </p>
                    <p className="text-gray-700 text-base line-clamp-2">
                      {t(project.shortDescriptionKey)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.categories.map((categorySlug) => (
                        <span
                          key={categorySlug}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {/* Use kebabToCamelCase here */}
                          {t(
                            `services.${kebabToCamelCase(categorySlug)}.title`
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-3 text-center py-10 text-gray-600 text-lg"
            >
              {t("projects.overview.noProjectsFound")}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsOverviewPage;
