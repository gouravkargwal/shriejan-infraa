"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod"; // REMOVE this import, as it's now in the shared file

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";
import { sendContactEmail } from "@/app/actions/sendEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- IMPORT FROM SHARED FILE ---
import { contactFormSchema, ContactFormData } from "@/types/contactForm"; // Adjust path if needed
// --- END IMPORT ---

export default function ContactPage() {
  const params = useParams();
  const lng = params.lng as string;
  const { t, isReady } = useTranslation(lng);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    trigger,
  } = useForm<ContactFormData>({
    // Using the imported ContactFormData
    resolver: zodResolver(contactFormSchema), // Using the imported contactFormSchema
    defaultValues: {
      name: "",
      mobile: "",
      email: "", // Default to empty string for optional email
      category: "",
      message: "",
    },
    mode: "onBlur",
  });

  const CATEGORIES = [
    { value: "", labelKey: "contact.categories.default" },
    { value: "architecture", labelKey: "contact.categories.architecture" },
    { value: "structure", labelKey: "contact.categories.structure" },
    { value: "interior", labelKey: "contact.categories.interior" },
    { value: "construction", labelKey: "contact.categories.construction" },
    { value: "supervision", labelKey: "contact.categories.supervision" },
    { value: "other", labelKey: "contact.categories.other" },
  ];

  const onSubmit = async (data: ContactFormData) => {
    console.log("Form Data Submitted:", data);

    try {
      // TypeScript should now be happy here because `data`
      // is of type `ContactFormData` which matches the schema's requirements.
      const result = await sendContactEmail(data);
      if (result.success) {
        toast.success(t("contact.form.submissionSuccess"));
        reset();
      } else {
        toast.error(t("contact.form.submissionError"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(t("contact.form.submissionError"));
    }
  };

  const handleWhatsAppContact = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      toast.error(t("contact.form.validation.fillRequiredFields"));
      return;
    }

    const mobileNumber = "917023074548";
    const currentFormData = getValues();

    const emailPart =
      currentFormData.email && currentFormData.email !== ""
        ? `Email: ${currentFormData.email}\n`
        : "";

    const prefilledMessage = encodeURIComponent(
      `Hello Shriejan Infraa, I'm interested in your services. \n` +
        `Name: ${currentFormData.name}\n` +
        `Mobile: ${currentFormData.mobile}\n` +
        `Category: ${t(
          currentFormData.category
            ? `contact.categories.${currentFormData.category}`
            : "contact.categories.default"
        )}\n` +
        emailPart +
        (currentFormData.message
          ? `\nMessage: ${currentFormData.message}`
          : "") +
        `\n\nLooking forward to hearing from you.`
    );
    const whatsappUrl = `https://wa.me/${mobileNumber}?text=${prefilledMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const errorVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.15 } },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  if (!isReady) {
    return null;
  }

  return (
    <div className="bg-gray-50 font-inter min-h-screen pt-[var(--header-height)] pb-16">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12 lg:mb-16 mt-6 md:mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-white p-6 md:p-10 rounded-xl shadow-xl border border-gray-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.form.name")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder={t("contact.form.namePlaceholder")}
                  className={`block w-full px-4 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200`}
                />
                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {errors.name && (
                      <motion.p
                        key="nameError"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 text-xs text-red-600"
                      >
                        {t(errors.name.message as string)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.form.mobile")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  {...register("mobile")}
                  placeholder={t("contact.form.mobilePlaceholder")}
                  className={`block w-full px-4 py-2 border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200`}
                />
                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {errors.mobile && (
                      <motion.p
                        key="mobileError"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 text-xs text-red-600"
                      >
                        {t(errors.mobile.message as string)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.form.email")}{" "}
                  <span className="text-gray-500">
                    ({t("contact.form.emailOptional")})
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder={t("contact.form.emailPlaceholder")}
                  className={`block w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200`}
                />
                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {errors.email && (
                      <motion.p
                        key="emailError"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 text-xs text-red-600"
                      >
                        {t(errors.email.message as string)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.form.category")}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register("category")}
                  className={`block w-full px-4 py-2 border ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base bg-white transition duration-200`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {t(cat.labelKey)}
                    </option>
                  ))}
                </select>
                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {errors.category && (
                      <motion.p
                        key="categoryError"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 text-xs text-red-600"
                      >
                        {t(errors.category.message as string)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message / Other Information */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("contact.form.message")}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className={`block w-full px-4 py-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base transition duration-200`}
                ></textarea>
                <div className="min-h-[20px]">
                  <AnimatePresence mode="wait">
                    {errors.message && (
                      <motion.p
                        key="messageError"
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mt-1 text-xs text-red-600"
                      >
                        {t(errors.message.message as string)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="flex-1 flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 font-semibold transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.6-3.837-1.6-5.893 0-6.505 5.29-11.795 11.795-11.795s11.795 5.29 11.795 11.795-5.29 11.795-11.795 11.795c-1.998 0-3.995-.5-5.694-1.463l-6.067 1.637zm18.334-5.385c-.956.417-2.316.945-3.696.883-1.442-.062-2.678-.865-3.929-2.036-1.28-1.206-2.617-3.056-2.617-5.111 0-1.282.493-2.387 1.34-3.235.79-.79 1.838-1.204 3.197-1.204 1.36 0 2.228.414 2.813 1.134.585.72 1.096 1.854.896 3.014-.153 1.03-.666 2.05-1.554 3.033-.915 1.026-1.897 1.574-2.887 1.666-.99.092-1.928-.276-2.698-.925-.78-.65-1.18-1.434-1.18-2.264 0-1.03.818-1.782 1.849-1.782.52 0 .964.184 1.328.548.364.364.63.856.814 1.39.184.535.257 1.12.257 1.705 0 .808-.245 1.577-.735 2.228-.49.651.976.993-1.48.993-.504 0-.85-.184-1.074-.548-.224-.364-.316-.856-.316-1.39 0-.808.245-1.577.735-2.228.49-.651.976-.993 1.48-.993.504 0 .85.184 1.074-.548z" />
                  </svg>
                  {t("contact.cta.contactWhatsapp")}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 font-semibold transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("common.sending")
                    : t("contact.cta.sendEmail")}
                </button>
              </div>
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-inter">
                {t("contact.addressLabel")}
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                {t("contact.addressFull")}
              </p>

              <div className="aspect-w-16 aspect-h-9 w-full h-64 rounded-xl overflow-hidden shadow-md border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.76498434479!2d73.8782524!3d29.899871700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3917b57f41219bf5%3A0xcc30c2901197f29!2sShriejan%20Desiign%20Lab!5e0!3m2!1sen!2sin!4v1749980802764!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Google Map of Shriejan Infraa office"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-inter">
                  {t("contact.phoneLabel")}
                </h2>
                <p className="text-blue-600 text-lg font-semibold">
                  <a href="tel:+919876543210" className="hover:underline">
                    +91 98765 43210
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-inter">
                  {t("contact.emailLabel")}
                </h2>
                <p className="text-blue-600 text-lg font-semibold">
                  <a
                    href="mailto:info@shriejaninfraa.com"
                    className="hover:underline"
                  >
                    info@shriejaninfraa.com
                  </a>
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-inter">
                  {t("contact.operatingHoursLabel")}
                </h2>
                <p className="text-gray-700 text-lg">
                  {t("contact.operatingHoursDetails")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
