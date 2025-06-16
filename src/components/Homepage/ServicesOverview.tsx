import { services } from "../../lib/serviceData";
import { motion, Variants } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const itemFallUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const ServicesOverviewSection: React.FC = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);

  // Select first 4 services or less if fewer exist
  const displayedServices = services.slice(0, 4);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="bg-gray-50 py-16 md:py-20 lg:py-24 font-inter"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          {t("homepage.servicesOverview.title")}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        >
          {t("homepage.servicesOverview.description")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemFallUp}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <service.icon
                className="text-indigo-600 mb-4 mx-auto"
                size={48}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t(service.titleKey)}
              </h3>
              <p className="text-gray-600 text-base mb-4 line-clamp-3">
                {t(service.shortDescriptionKey)}
              </p>
              <Link
                href={`/${lng}/services/${service.slug}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 inline-flex items-center"
              >
                {t("common.learnMore")}
                <svg
                  className="ml-1 w-4 h-4"
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
          ))}
        </motion.div>
        <motion.div variants={fadeIn} className="mt-12">
          <Link
            href={`/${lng}/services`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {t("homepage.servicesOverview.viewAllServices")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesOverviewSection;
