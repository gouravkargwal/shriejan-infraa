"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Project, ProjectImage } from "../../lib/projectsData";
import {
  CheckCircleIcon,
  ImagesIcon,
  LightbulbIcon,
  ListChecksIcon,
  TargetIcon,
  UsersIcon,
} from "@phosphor-icons/react";

interface ProjectDetailClientProps {
  project: Project; // Receive project data as a prop
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({
  project,
}) => {
  const { t } = useTranslation();

  // Framer Motion variants (these remain the same)
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const imageGalleryVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const imageItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-100 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        {/* Project Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-12 md:mb-16 border border-gray-200"
        >
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={project.images[0].src} // Main project image for hero
              alt={t(project.titleKey)}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              priority // Preload the main image
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                {t(project.titleKey)}
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-200">
                {t(project.locationKey)} - {t(project.clientTypeKey)}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Challenge & Solution */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <LightbulbIcon
                  size={28}
                  className="text-indigo-600 mr-3"
                  weight="duotone"
                />
                {t("projects.detail.challengeSolution")}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-800">
                    {t("projects.detail.challenge")}:
                  </span>{" "}
                  {t(project.challengeKey)}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    {t("projects.detail.solution")}:
                  </span>{" "}
                  {t(project.solutionKey)}
                </p>
              </div>
            </motion.section>

            {/* Services Provided */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <ListChecksIcon
                  size={28}
                  className="text-indigo-600 mr-3"
                  weight="duotone"
                />
                {t("projects.detail.servicesProvided")}
              </h2>
              <motion.ul
                variants={imageGalleryVariants}
                className="space-y-2 text-lg text-gray-700"
              >
                {" "}
                {/* Reusing imageGalleryVariants for staggered list */}
                {project.servicesProvidedKeys.map((key, index) => (
                  <motion.li
                    key={index}
                    variants={listItemVariants}
                    className="flex items-center"
                  >
                    <CheckCircleIcon
                      size={20}
                      className="text-green-500 mr-2 flex-shrink-0"
                      weight="fill"
                    />
                    {t(key)}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>

            {/* Image Gallery */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <ImagesIcon
                  size={28}
                  className="text-indigo-600 mr-3"
                  weight="duotone"
                />
                {t("projects.detail.imageGallery")}
              </h2>
              <motion.div
                variants={imageGalleryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {project.images.map((img: ProjectImage, index: number) => (
                  <motion.div
                    key={index}
                    variants={imageItemVariants}
                    className="relative w-full aspect-w-4 aspect-h-3 rounded-md overflow-hidden shadow-sm"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-2 text-white text-sm opacity-90">
                        {img.caption}
                        {img.type && (
                          <span className="ml-2 text-xs font-semibold uppercase bg-gray-800 px-1.5 py-0.5 rounded-full">
                            {t(`projects.imageTypes.${img.type}`)}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-10">
            {/* Team's Contribution */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <UsersIcon
                  size={28}
                  className="text-indigo-600 mr-3"
                  weight="duotone"
                />
                {t("projects.detail.teamContribution")}
              </h2>
              <ul className="space-y-4">
                {project.teamContributions.map((contribution, index) => (
                  <motion.li key={index} variants={listItemVariants}>
                    <p className="text-lg font-semibold text-gray-900">
                      {t(contribution.nameKey)} (
                      <span className="text-blue-600">
                        {t(contribution.roleKey)}
                      </span>
                      )
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {t(contribution.contributionKey)}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Results/Impact */}
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center">
                <TargetIcon
                  size={28}
                  className="text-indigo-600 mr-3"
                  weight="duotone"
                />
                {t("projects.detail.resultsImpact")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t(project.resultsImpactKey)}
              </p>
            </motion.section>

            {/* Direct CTA */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-center p-6 bg-blue-50 rounded-lg shadow-inner border border-blue-100"
            >
              <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-4">
                {t(project.ctaKey)}
              </h3>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1"
                >
                  {t("projects.detail.discussSimilarProject")}
                  <svg
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-bold rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-100 transition duration-300 transform hover:-translate-y-0.5"
                >
                  {t("projects.detail.viewAllServices")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailClient;
