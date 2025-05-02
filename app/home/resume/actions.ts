"use server";
import { generateAvatar } from "@/app/utils/avatars/avatar";
import { createClient } from "@/app/utils/supabase/server";
import { error } from "console";
import { pre } from "motion/react-client";
import { boolean, number, string, z } from "zod";

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
  yoe: z.coerce.number().refine((val) => val > 2, {
    message: "Experience should be greater than 2.",
  }),
  country: z
    .string()
    .trim()
    .min(2, { message: "Country should be longer than 2 characters." }),
  location: z
    .string()
    .trim()
    .min(2, { message: "Location should be longer than 2 characters." }),
  remote: z.string().trim().optional(),
  hybrid: z.string().trim().optional(),
  onsite: z.string().trim().optional(),
  preference: z.undefined(),
  anotherState: z.string().trim().optional(),
  anotherCountry: z.string().trim().optional(),
  relocation: z.undefined(),
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
        .trim()
        .min(2, { message: "Role should be longer than 2 characters" }),
      from: z.string().trim().min(5, { message: "Invalid date format." }),
      to: z.string().trim().min(5, { message: "Invalid date format." }),
      city: z.string().trim().optional(),
      country: z.string().trim().optional(),
      remoteLoacation: z.string().trim().optional(),
      work: z.array(
        z.object({
          id: number().min(1, { message: "Id should be greater than 0." }),
          work: z.string().trim().min(5, {
            message: "Please describe your experience in more detail.",
          }),
        })
      ),
    })
  ),
  admin: z.string().trim().min(5, { message: "Please add your name." }),
  tags: z
    .array(z.string().trim())
    .min(1, { message: "Please select a category." }),
});

export const getResumeData = async (previousState: any, formData: FormData) => {
  const resumeData = Object.fromEntries(formData);
  const supabase = await createClient();
  const userSession = await supabase.auth.getUser();
  const userId = await userSession.data.user?.id;

  if (typeof resumeData.experience === "string") {
    console.log("Inside", typeof resumeData.experience === "string");
    resumeData.experience = JSON.parse(resumeData.experience);
  }

  if (typeof resumeData.tags === "string") {
    resumeData.tags = JSON.parse(resumeData.tags);
    console.log("Tags", resumeData.tags);
  }

  const validateResumeData = ResumeSchema.safeParse(resumeData);
  console.log("Validating");
  if (!resumeData?.onSite && !resumeData?.hybrid && !resumeData.remote) {
    return {
      errors: {
        preference: "Select a job preference.",
      },
    };
  }
  console.log("Validating-2");

  if (!validateResumeData.success) {
    const formErrors = validateResumeData.error.flatten().fieldErrors;
    console.log("Errors", formErrors);
    return {
      errors: {
        name: formErrors?.name,
        email: formErrors?.email,
        profession: formErrors?.profession,
        yoe: formErrors?.yoe,
        country: formErrors?.country,
        location: formErrors?.location,
        preference: formErrors?.profession,
        relocation: formErrors?.relocation,
        salary: formErrors?.salary,
        experience: formErrors?.experience,
        admin: formErrors?.admin,
        tags: formErrors?.tags,
      },
    };
  }
  console.log("Validation Success");

  const name = resumeData.name;
  const email = resumeData.email;
  const profession = resumeData.profession;
  const yoe = resumeData.yoe;
  const country = resumeData.country;
  const location = resumeData.location;
  const remote = resumeData?.remote;
  const hybrid = resumeData?.hybrid;
  const onsite = resumeData?.onsite;
  const preference: { remote: boolean; hybrid: boolean; onsite: boolean }[] =
    [];

  preference.push({
    remote: remote ? true : false,
    hybrid: hybrid ? true : false,
    onsite: onsite ? true : false,
  });
  const anotherState = resumeData?.anotherState;
  const anotherCountry = resumeData?.anotherCountry;
  const relocation: { anotherState: boolean; anotherCountry: boolean }[] = [];

  relocation.push({
    anotherState: anotherState ? true : false,
    anotherCountry: anotherCountry ? true : false,
  });
  const salary = resumeData.salary;
  const experience = resumeData.experience;
  const admin = resumeData.admin;
  const isHired = false;
  const avatar = generateAvatar();
  const tagsToJson = JSON.stringify(resumeData.tags);
  console.log("EXperience", experience);
  const { data, error, status } = await supabase.from("resume").insert({
    name,
    email,
    profession,
    country,
    years_of_experience: yoe,
    location,
    preference: { preferences: JSON.stringify(preference).trim() },
    relocation: { relocateTo: JSON.stringify(relocation).trim() },
    salary,
    experience: JSON.stringify(experience).trim(),
    admin,
    admin_id: userId,
    is_hired: isHired,
    avatar,
    tags: { tagNames: tagsToJson },
  });
  console.log("Error", error, "data", data, "status", status);
  if (error) {
    return {
      errors: {
        admin: "Failed to submit resume.",
      },
    };
  }

  if (status === 201) {
    return {
      message: "Resume submitted successfully.",
    };
  }

  return {
    message: "Resume submitted.",
  };
};
