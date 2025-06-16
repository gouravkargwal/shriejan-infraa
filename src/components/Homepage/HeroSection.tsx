"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection: React.FC = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative w-full min-h-screen h-[calc(100vh-var(--header-height))] flex items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/timelapse.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-[0.6]"
          aria-label="Background video showcasing construction timelapse"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt="Shriejan Infraa - Building Visions"
            layout="fill"
            objectFit="cover"
            priority
            className="filter brightness-[0.6]"
          />
        </video>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          {t("homepage.hero.headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-100 drop-shadow-md"
        >
          {t("homepage.hero.subheadline")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {t("homepage.hero.cta")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
