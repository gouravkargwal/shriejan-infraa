import { useTranslation } from "@/i18n/client";
import { projects } from "../../lib/projectsData";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemFallUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const FeaturedProjectsSection: React.FC = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng);

  // Curated selection of 3 key projects
  // Ensure these slugs exist in lib/projectsData.ts
  const featuredProjectSlugs = [
    "modern-family-bungalow",
    "commercial-office-complex",
    "boutique-hotel-interior",
  ];
  const featuredProjects = projects.filter((p) =>
    featuredProjectSlugs.includes(p.slug)
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="bg-gray-100 py-16 md:py-20 lg:py-24 font-inter"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          {t("homepage.featuredProjects.title")}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        >
          {t("homepage.featuredProjects.description")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemFallUp}
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
                    src={project.images[0].src} // Use the first image as thumbnail
                    alt={t(project.titleKey)}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 text-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {t(project.locationKey)}
                  </p>
                  <p className="text-gray-700 text-base line-clamp-2">
                    {t(project.shortDescriptionKey)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeIn} className="mt-12">
          <Link
            href="/projects"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {t("homepage.featuredProjects.viewAllProjects")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProjectsSection;
