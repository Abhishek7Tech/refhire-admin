"use server";
import { error } from "console";
import { number, z } from "zod";

const ResumeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name should be longer than 2 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  profession: z
    .string()
    .trim()
    .min(2, { message: "Profession should be longer than 2 characters." }),
  country: z
    .string()
    .trim()
    .min(2, { message: "Country should be longer than 2 characters." }),
  location: z
    .string()
    .trim()
    .min(2, { message: "Location should be longer than 2 characters." }),
  preference: z.string().array().nonempty({ message: "Select a checkbox." }),
  relocation: z.string().array().nonempty({ message: "Select a checkbox." }),
  salary: z
    .string()
    .trim()
    .includes("$", { message: "Salary should be in U.S.D. Please include $." })
    .min(3, { message: "Slary should be greater than $100." }),

  experience: z.array(
    z.object({
      id: z.number().min(1, { message: "Invlaid id." }),
      role: z
        .string()
        .min(2, { message: "Role should be longer than 2 characters" }),
      from: z.string().trim().min(5, { message: "Invalid date format." }),
      to: z.string().trim().min(5, { message: "Invalid date format." }),
      work: z.array(
        z.object({
          id: number().min(1, { message: "Id should be greater than 0." }),
          work: z.string().min(5, {
            message: "Please describe your experience in more detail.",
          }),
        })
      ),
    })
  ),
});

export const getResumeData = async (previousState: any, formData: FormData) => {
  const resumeData = Object.fromEntries(formData);
  const validateResumeData = ResumeSchema.safeParse(resumeData);
  console.log("RESUME", resumeData);
  if (typeof resumeData.experience === "string") {
    resumeData.experience = JSON.parse(resumeData.experience);
  }
  if (!validateResumeData.success) {
    const formErrors = validateResumeData.error.flatten().fieldErrors;
    return {
      errors: {
        name: formErrors?.name,
        email: formErrors?.email,
        profession: formErrors?.profession,
        country: formErrors?.country,
        location: formErrors?.location,
        preference: formErrors?.profession,
        relocation: formErrors?.relocation,
        salary: formErrors?.salary,
        experience: formErrors?.experience,
      },
    };
  }

  console.log("RESUME DATA", resumeData);
  return {
    message: "Resume submitted.",
  };
};
