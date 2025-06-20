"use server";
import { sanitize } from "@/app/utils/form-validation/validation";
import { createAdminClient } from "@/app/utils/supabase/admin";
import { createClient } from "@/app/utils/supabase/server";
import { z } from "zod";

const TestimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name should be longer than 2 characters." }),
  twitter: z
    .string()
    .trim()
    .includes("https://x.com", { message: "Include a valid Twitter/X url." })
    .url({ message: "Include a valid Twitter/X url." }),
  role: z.string().trim().min(2, {
    message: "Role should be longer than 2 characters.",
  }),
  company: z.string().trim().min(2, {
    message: "Company should be longer than 2 characters.",
  }),
  review: z.string().trim().min(10, {
    message: "Review should be longer than 10 characters.",
  }),
});

export const getTestimonialsData = async (
  previousState: any,
  formData: FormData
) => {
  const testimonialData = Object.fromEntries(formData);
  const supabaseAdmin = await createAdminClient();
  const supabase = await createClient();
  const userSession = await supabase.auth.getUser();
  const userId = await userSession.data.user?.id;

  if (!userId) {
    return {
      error: "User not found",
      status: 401,
    };
  }

  const validateTestimonialData = TestimonialSchema.safeParse(testimonialData);
  if (!validateTestimonialData.success) {
    const formErrors = validateTestimonialData.error.flatten().fieldErrors;
    return {
      errors: {
        name: formErrors?.name,
        twitter: formErrors?.twitter,
        role: formErrors?.role,
        company: formErrors?.company,
        review: formErrors?.review,
      },
    };
  }

  const name = sanitize(testimonialData.name as string);
  const twitter = sanitize(testimonialData.twitter as string);
  const role = sanitize(testimonialData.role as string);
  const company = sanitize(testimonialData.company as string);
  const review = sanitize(testimonialData.review as string);

  console.log("Testimonial Data", name, twitter, role, company, review);
  return {
    message: "Testimonial submitted.",
  };
};
