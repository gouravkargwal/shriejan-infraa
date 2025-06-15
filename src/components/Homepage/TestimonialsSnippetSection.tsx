import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getTestimonialsForHomepage } from "../../lib/testimonialsData";
import Link from "next/link";
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
const TestimonialsSnippetSection: React.FC = () => {
  const { t } = useTranslation();

  // Get 3 random testimonials (or fewer if less than 3 exist)
  const testimonialSnippets = getTestimonialsForHomepage(t);

  if (testimonialSnippets.length === 0) return null; // Don't render if no testimonials

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
          {t("homepage.testimonialsSnippet.title")}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        >
          {t("homepage.testimonialsSnippet.description")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonialSnippets.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemFallUp}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
            >
              <p className="text-gray-700 text-lg italic mb-4 line-clamp-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <h3 className="text-lg font-semibold text-gray-900">
                {testimonial.clientName}
              </h3>
              <p className="text-sm text-gray-600">{testimonial.location}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeIn} className="mt-12">
          <Link
            href="/testimonials"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {t("homepage.testimonialsSnippet.viewAll")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSnippetSection;
