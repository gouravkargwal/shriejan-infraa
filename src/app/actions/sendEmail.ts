"use server";

import { ContactFormData } from "@/types/contactForm";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_SMTP_HOST,
  port: parseInt(process.env.GMAIL_SMTP_PORT || "587"), // Ensure port is parsed as a number
  secure: process.env.GMAIL_SMTP_SECURE === "true", // Converts "true"/"false" string to boolean
  auth: {
    user: process.env.GMAIL_SMTP_USER,
    pass: process.env.GMAIL_SMTP_APP_PASSWORD,
  },
});

export async function sendContactEmail(formData: ContactFormData) {
  // Basic validation (though Zod handles this on the client, server-side validation is good practice)
  if (
    !formData.name ||
    !formData.mobile ||
    !formData.category ||
    !formData.message
  ) {
    return { success: false, message: "Missing required form fields." };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_FROM_EMAIL,
      to: "gouravkargwalstore@gmail.com",
      subject: `New Inquiry from ${formData.name} - ${formData.category}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Mobile:</strong> <a href="tel:${formData.mobile}">${
        formData.mobile
      }</a></p>
          <p><strong>Email:</strong> ${
            formData.email
              ? `<a href="mailto:${formData.email}">${formData.email}</a>`
              : "Not provided"
          }</p>
          <p><strong>Category:</strong> ${formData.category}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f9f9f9; border-left: 4px solid #007bff; padding: 10px; margin-left: 0;">${
            formData.message
          }</p>
          <p style="color: #777; font-size: 0.9em;">This email was sent from your website's contact form.</p>
        </div>
      `,
      text: `
        New Contact Form Submission:
        Name: ${formData.name}
        Mobile: ${formData.mobile}
        Email: ${formData.email || "Not provided"}
        Category: ${formData.category}
        Message:
        ${formData.message}
      `, // Plain text fallback
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email sending error:", error);
    // Provide a more specific error message if possible, though generally avoid exposing internal errors
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
