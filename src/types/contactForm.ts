import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "contact.form.validation.nameRequired" }),
  mobile: z
    .string()
    .min(1, { message: "contact.form.validation.mobileRequired" })
    .regex(/^\d{10}$/, { message: "contact.form.validation.mobileInvalid" }),
  email: z
    .string()
    .email({ message: "contact.form.validation.emailInvalid" })
    .optional() // This makes it 'string | undefined'
    .or(z.literal("")), // This allows it to be '' (empty string) as well, so 'string | undefined | ""'
  category: z
    .string()
    .min(1, { message: "contact.form.validation.categoryRequired" }),
  message: z
    .string()
    .min(1, { message: "contact.form.validation.messageRequired" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
