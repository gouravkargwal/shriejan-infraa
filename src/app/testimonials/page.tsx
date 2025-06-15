"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { QuotesIcon } from "@phosphor-icons/react"; // Using Phosphor Icons for the quote icon
import Image from "next/image";

interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  projectType?: string; // Optional: e.g., "Residential Renovation", "Commercial Build"
  location: string; // Emphasizing local clients, like Jaipur
  avatarUrl?: string; // Optional: URL to client's photo or avatar
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Mrs. Anjali Sharma",
    quote:
      "Shriejan Infraa transformed our old home into a modern masterpiece. Their attention to detail and professional approach were truly commendable. Highly recommend their architectural design services!",
    projectType: "Residential Renovation",
    location: "Jaipur, Rajasthan",
    avatarUrl: "/images/avatars/avatar1.jpg", // Replace with actual paths
  },
  {
    id: "t2",
    clientName: "Mr. Rajeev Gupta (Phoenix Enterprises)",
    quote:
      "We tasked Shriejan Infraa with building our new office complex. They delivered ahead of schedule and under budget, maintaining excellent quality throughout. A reliable construction partner.",
    projectType: "Commercial Construction",
    location: "Jaipur, Rajasthan",
    avatarUrl: "/images/avatars/avatar2.jpg",
  },
  {
    id: "t3",
    clientName: "Dr. Priya Singh",
    quote:
      "The interior design team brought my vision for a peaceful clinic to life. Every element feels thoughtfully placed. It's truly a calming and professional space now.",
    projectType: "Clinic Interior Design",
    location: "Sanganer, Jaipur",
    avatarUrl: "/images/avatars/avatar3.jpg",
  },
  {
    id: "t4",
    clientName: "Mr. Alok Verma",
    quote:
      "Their supervision on our factory expansion was crucial. They ensured everything was up to code and managed the various contractors seamlessly. Peace of mind is priceless.",
    projectType: "Industrial Expansion Supervision",
    location: "Sitapura, Jaipur",
  },
  {
    id: "t5",
    clientName: "Ms. Kavita Rathore",
    quote:
      "Exceptional structural design for our multi-story residential building. The team was responsive, innovative, and ensured the highest safety standards. Impressed!",
    projectType: "High-Rise Structural Design",
    location: "Vaishali Nagar, Jaipur",
    avatarUrl: "/images/avatars/avatar4.jpg",
  },
  {
    id: "t6",
    clientName: "Mr. and Mrs. Khan",
    quote:
      "Our experience with Shriejan Infraa for our bungalow construction was fantastic. They were transparent, honest, and the quality of work is outstanding. Our dream home is now a reality.",
    projectType: "Bungalow Construction",
    location: "Malviya Nagar, Jaipur",
  },
  {
    id: "t7",
    clientName: "Jaipur Heritage Hotel Management",
    quote:
      "For the restoration of our heritage property, Shriejan Infraa combined traditional techniques with modern engineering expertise, preserving its charm while ensuring its longevity. Excellent work.",
    projectType: "Heritage Building Restoration",
    location: "Old City, Jaipur",
    avatarUrl: "/images/avatars/avatar5.jpg",
  },
  {
    id: "t8",
    clientName: "Mr. Suresh Yadav",
    quote:
      "They provided a robust structural design for my warehouse. The calculations were precise, and the execution was flawless. Highly professional and reliable.",
    projectType: "Warehouse Structural Design",
    location: "Mansarovar, Jaipur",
  },
];

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for each testimonial card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const TestimonialsPage: React.FC = () => {
  const { t } = useTranslation();

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
            {t("testimonials.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("testimonials.description")}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-full"
            >
              <div>
                <QuotesIcon
                  size={40}
                  weight="fill"
                  className="text-indigo-400 mb-4 opacity-70"
                />
                <p className="text-gray-700 text-lg md:text-xl italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center mt-4">
                {testimonial.avatarUrl ? (
                  <Image
                    width={56}
                    height={56}
                    src={testimonial.avatarUrl}
                    alt={testimonial.clientName}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-indigo-200 shadow-sm"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold mr-4">
                    {testimonial.clientName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {testimonial.clientName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {testimonial.projectType && (
                      <span className="block">{testimonial.projectType}</span>
                    )}
                    <span className="block">{testimonial.location}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
