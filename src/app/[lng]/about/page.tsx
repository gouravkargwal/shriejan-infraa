"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import akshayHeadshot from "../../../../public/images/team/tea.jpg"; // Adjust path as needed
import ankitHeadshot from "../../../../public/images/team/tea.jpg"; // Adjust path as needed
import vijayHeadshot from "../../../../public/images/team/tea.jpg"; // Adjust path as needed
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";

export default function AboutPage() {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Adjust stagger time between child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        {/* Hero Section - Company Story/Mission */}
        <motion.section
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 md:p-12 rounded-xl shadow-lg mb-12 border border-blue-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">
            {t("aboutUs.title")}
          </h1>
          <p className="text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
            {t("aboutUs.missionStatement")}
          </p>
        </motion.section>

        {/* Team Introduction */}
        <motion.section
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {t("aboutUs.team.title")}
          </h2>
          <p className="text-center text-lg text-gray-700 mb-10 max-w-4xl mx-auto">
            {t("aboutUs.team.introMessage")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Akshay's Profile */}
            <motion.div variants={itemVariants} className="text-center">
              <Image
                src={akshayHeadshot}
                alt={t("aboutUs.team.akshay.name")}
                width={200} // Adjust size as needed
                height={200} // Adjust size as needed
                className="rounded-full mx-auto mb-4 object-cover w-48 h-48 border-4 border-blue-100 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                {t("aboutUs.team.akshay.name")}
              </h3>
              <p className="text-blue-600 text-lg font-medium mb-2">
                {t("aboutUs.team.akshay.role")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("aboutUs.team.akshay.bio")}
              </p>
            </motion.div>

            {/* Ankit's Profile */}
            <motion.div variants={itemVariants} className="text-center">
              <Image
                src={ankitHeadshot}
                alt={t("aboutUs.team.ankit.name")}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4 object-cover w-48 h-48 border-4 border-blue-100 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                {t("aboutUs.team.ankit.name")}
              </h3>
              <p className="text-blue-600 text-lg font-medium mb-2">
                {t("aboutUs.team.ankit.role")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("aboutUs.team.ankit.bio")}
              </p>
            </motion.div>

            {/* Vijay's Profile */}
            <motion.div variants={itemVariants} className="text-center">
              <Image
                src={vijayHeadshot}
                alt={t("aboutUs.team.vijay.name")}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4 object-cover w-48 h-48 border-4 border-blue-100 shadow-md"
              />
              <h3 className="text-2xl font-bold text-gray-900">
                {t("aboutUs.team.vijay.name")}
              </h3>
              <p className="text-blue-600 text-lg font-medium mb-2">
                {t("aboutUs.team.vijay.role")}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t("aboutUs.team.vijay.bio")}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Values & Philosophy */}
        <motion.section
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            {t("aboutUs.values.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 p-6 rounded-lg text-center shadow-sm border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {t("aboutUs.values.v1.title")}
              </h3>
              <p className="text-gray-700">
                {t("aboutUs.values.v1.description")}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 p-6 rounded-lg text-center shadow-sm border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {t("aboutUs.values.v2.title")}
              </h3>
              <p className="text-gray-700">
                {t("aboutUs.values.v2.description")}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 p-6 rounded-lg text-center shadow-sm border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {t("aboutUs.values.v3.title")}
              </h3>
              <p className="text-gray-700">
                {t("aboutUs.values.v3.description")}
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 p-6 rounded-lg text-center shadow-sm border border-blue-100"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {t("aboutUs.values.v4.title")}
              </h3>
              <p className="text-gray-700">
                {t("aboutUs.values.v4.description")}
              </p>
            </motion.div>
            {/* Add more values as needed following the same pattern */}
          </div>
        </motion.section>

        {/* Certifications & Licenses */}
        <motion.section
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants} // Use itemVariants as it's a single block
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            {t("aboutUs.certifications.title")}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            {t("aboutUs.certifications.description")}
          </p>
          {/* You can add logos or a list of certifications here */}
          <ul className="mt-6 text-center text-gray-700 space-y-2">
            <li className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {t("aboutUs.certifications.list.c1")}
            </li>
            <li className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {t("aboutUs.certifications.list.c2")}
            </li>
            {/* Add more certifications as needed */}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
