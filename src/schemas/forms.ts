import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});
export type ContactFormValues = z.infer<typeof contactSchema>;
export const admissionSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  dob: z.string().min(4, "Date of birth required"),
  qualification: z.string().min(2).max(120),
  course: z.string().min(2),
  targetExam: z.string().min(2),
  city: z.string().trim().min(2).max(80),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
});
export type AdmissionFormValues = z.infer<typeof admissionSchema>;
