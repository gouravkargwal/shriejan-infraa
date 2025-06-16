"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { services } from "@/lib/serviceData";
import { useTranslation } from "@/i18n/client";

const SupervisionServicePage: React.FC = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);
  const service = services.find((s) => s.slug === "supervision");

  if (!service) {
    notFound();
  }

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="bg-gray-50 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 md:mb-16 border border-gray-100"
        >
          {service.detailImageUrl && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={service.detailImageUrl}
                alt={t(service.titleKey)}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                  {t(service.titleKey)}
                </h1>
                <p className="text-lg md:text-xl font-medium text-gray-200">
                  {t(service.shortDescriptionKey)}
                </p>
              </div>
            </div>
          )}
        </motion.div>
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 border border-gray-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("common.aboutService", {
              service: t(service.titleKey),
            })}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t(service.longDescriptionKey)}
          </p>
        </motion.section>
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 border border-gray-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("common.benefits")}
          </h2>
          <motion.ul
            variants={listVariants}
            className="space-y-4 text-lg text-gray-700"
          >
            {service.benefitsKeys.map((key, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="flex items-start"
              >
                <svg
                  className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {t(key)}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white p-6 md:p-10 rounded-xl shadow-lg mb-12 border border-gray-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t("common.ourProcess")}
          </h2>
          <ol className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-8">
            {service.processStepsKeys.map((key, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="mb-10 ml-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-50 dark:bg-blue-900">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <h3 className="flex items-center mb-1 text-xl font-semibold text-gray-900">
                  {t(`common.step`)}
                  <span className="ml-1 text-blue-600">{index + 1}:</span>
                </h3>
                <p className="text-lg font-normal text-gray-700">{t(key)}</p>
              </motion.li>
            ))}
          </ol>
        </motion.section>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-12 md:mt-16 p-8 bg-blue-50 rounded-xl shadow-inner border border-blue-100"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            {t(service.ctaKey)}
          </h3>
          <Link
            href="/contact-us"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
          >
            {t("common.getQuote")}
            <svg
              className="ml-2 -mr-1 w-5 h-5"
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
        </motion.div>
      </div>
    </div>
  );
};

export default SupervisionServicePage;
