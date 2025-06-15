import {
  DiamondIcon,
  HandshakeIcon,
  MapPinLineIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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
const WhyChooseUsSection: React.FC = () => {
  const { t } = useTranslation();

  const differentiators = [
    {
      icon: (
        <MapPinLineIcon size={48} className="text-indigo-600 mb-4 mx-auto" />
      ),
      titleKey: "homepage.whyChooseUs.d1.title",
      descriptionKey: "homepage.whyChooseUs.d1.description",
    },
    {
      icon: (
        <HandshakeIcon size={48} className="text-indigo-600 mb-4 mx-auto" />
      ),
      titleKey: "homepage.whyChooseUs.d2.title",
      descriptionKey: "homepage.whyChooseUs.d2.description",
    },
    {
      icon: <DiamondIcon size={48} className="text-indigo-600 mb-4 mx-auto" />,
      titleKey: "homepage.whyChooseUs.d3.title",
      descriptionKey: "homepage.whyChooseUs.d3.description",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="bg-white py-16 md:py-20 lg:py-24 font-inter"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.h2
          variants={fadeIn}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          {t("homepage.whyChooseUs.title")}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        >
          {t("homepage.whyChooseUs.description")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {differentiators.map((differentiator, index) => (
            <motion.div
              key={index}
              variants={itemFallUp}
              className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
            >
              {differentiator.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {t(differentiator.titleKey)}
              </h3>
              <p className="text-gray-600 text-base">
                {t(differentiator.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
export default WhyChooseUsSection;
