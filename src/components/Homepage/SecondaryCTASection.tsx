import { useTranslation } from "react-i18next";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const SecondaryCTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="bg-indigo-700 text-white py-16 md:py-20 text-center font-inter"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
        >
          {t("homepage.secondaryCta.headline")}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-lg md:text-xl mb-10 opacity-90"
        >
          {t("homepage.secondaryCta.subheadline")}
        </motion.p>
        <motion.div variants={fadeIn}>
          <Link
            href="/contact"
            className="inline-block bg-white text-indigo-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-xl shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {t("homepage.secondaryCta.cta")}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default SecondaryCTASection;
