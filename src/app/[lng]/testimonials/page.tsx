"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, ChatCenteredText, MapPinLine } from "@phosphor-icons/react";
import { ClientPageProps } from "@/types";
import { testimonials } from "@/lib/testimonials";
import { getProjectBySlug } from "@/lib/projectsData";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFallUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const TestimonialsPage = ({ params: { lng } }: ClientPageProps) => {
  const { t } = useTranslation(lng);

  return (
    <div className="bg-gray-100 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-10 md:py-14 lg:py-16">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-5 leading-tight">
            {t("testimonialsPage.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("testimonialsPage.description")}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => {
              const relatedProject = testimonial.projectSlug
                ? getProjectBySlug(testimonial.projectSlug)
                : null;

              return (
                <motion.div
                  key={testimonial.id}
                  variants={itemFallUp}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    {testimonial.clientImage ? (
                      <Image
                        src={testimonial.clientImage}
                        alt={testimonial.clientName}
                        width={64}
                        height={64}
                        className="rounded-full object-cover mr-4 ring-2 ring-indigo-500"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        <ChatCenteredText
                          size={32}
                          className="text-indigo-600"
                          weight="fill"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {testimonial.clientName}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPinLine size={16} className="mr-1 text-gray-500" />{" "}
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {testimonial.rating && (
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          weight={i < testimonial.rating! ? "fill" : "regular"}
                          className={
                            i < testimonial.rating!
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-gray-700 text-base italic mb-4 flex-grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {relatedProject && (
                    <Link
                      href={`/${lng}/projects/${relatedProject.slug}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 mt-auto pt-4 border-t border-gray-100"
                    >
                      {t("testimonialsPage.viewRelatedProject")}
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
                  )}
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-3 text-center py-10 text-gray-600 text-lg"
            >
              {t("testimonialsPage.noTestimonials")}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
