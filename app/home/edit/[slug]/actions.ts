"use server";
import { generateAvatar } from "@/app/utils/avatars/avatar";
import { createClient } from "@/app/utils/supabase/server";
import { boolean, number, string, z } from "zod";
import { STATS_TABLE_ID } from "@/app/utils/statsId/stats";
import { createAdminClient } from "@/app/utils/supabase/admin";
import DOMPurify from "isomorphic-dompurify";
import { ExperienceInterface, TagsInterface } from "@/app/utils/types/types";
import {
  sanitize,
  sanitizeExperience,
  sanitizeTags,
} from "@/app/utils/form-validation/validation";
import { UUID } from "crypto";
import { stat } from "fs";
import { console } from "inspector";
import { cookies } from "next/headers";
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

export const updateResumeData = async (
  previousState: any,
  formData: FormData
) => {
  const resumeData = Object.fromEntries(formData);
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

  if (typeof resumeData.experience === "string") {
    resumeData.experience = JSON.parse(resumeData.experience);
  }

  if (typeof resumeData.tags === "string") {
    resumeData.tags = JSON.parse(resumeData.tags);
  }

  const validateResumeData = ResumeSchema.safeParse(resumeData);
  if (!resumeData?.onSite && !resumeData?.hybrid && !resumeData.remote) {
    return {
      errors: {
        preference: "Select a job preference.",
      },
    };
  }

  if (!validateResumeData.success) {
    const formErrors = validateResumeData.error.flatten().fieldErrors;
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

  const name = sanitize(resumeData.name as string);
  const email = sanitize(resumeData.email as string);
  const profession = sanitize(resumeData.profession as string);
  const yoe = Number(sanitize(resumeData.yoe as string));
  const country = sanitize(resumeData.country as string);
  const location = sanitize(resumeData.location as string);
  const remote = sanitize(resumeData?.remote as string);
  const hybrid = sanitize(resumeData?.hybrid as string);
  const onsite = sanitize(resumeData?.onsite as string);
  const preference: { remote: boolean; hybrid: boolean; onsite: boolean }[] =
    [];

  preference.push({
    remote: remote ? true : false,
    hybrid: hybrid ? true : false,
    onsite: onsite ? true : false,
  });
  const anotherState = sanitize(resumeData?.anotherState as string);
  const anotherCountry = sanitize(resumeData?.anotherCountry as string);
  const relocation: { anotherState: boolean; anotherCountry: boolean }[] = [];

  relocation.push({
    anotherState: anotherState ? true : false,
    anotherCountry: anotherCountry ? true : false,
  });
  const salary = sanitize(resumeData.salary as string);

  const experience = sanitizeExperience(
    resumeData.experience as unknown as ExperienceInterface[]
  );

  const admin = sanitize(resumeData.admin as string);
  const isHired = false;
  const avatar = generateAvatar();
  const tags = sanitizeTags(resumeData.tags as unknown as string[]);
  const resumeId = (await cookies()).get("resume_id")?.value;

  const res = await supabase.rpc("resume_exsist", {
    p_resume_id: resumeId as UUID,
  });

  if (res.error) {
    return {
      errors: {
        email: "Failed to get Resume.",
      },
    };
  }

  if (res.data.length === 0) {
    return {
      errors: {
        email: "User resume not found.",
      },
    };
  }

  const { data, error, status } = await supabaseAdmin
    .from("resume")
    .update({
      name,
      email,
      profession,
      country,
      years_of_experience: yoe,
      location,
      preference: { preferences: preference },
      relocation: { relocateTo: relocation },
      salary,
      experience: experience,
      admin,
      admin_id: userId,
      is_hired: isHired,
      avatar,
      tags: { tagNames: tags },
    })
    .eq("resume_id", resumeId);
  if (error || status !== 204) {
    return {
      errors: {
        admin: "Failed to update resume.",
      },
    };
  }

  return {
    message: "Resume updated.",
  };
};

export const getResumeData = async (resumeId: UUID) => {
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

  const { data, error, status } = await supabaseAdmin
    .from("resume")
    .select(
      "admin, country, email, experience, location, name, preference, profession, relocation, salary, tags, years_of_experience, resume_id"
    )
    .eq("resume_id", resumeId)
    .eq("admin_id", userId)
    .single();

  if (error) {
    return {
      errors: {
        email: "Failed to check email.",
      },
    };
  }

  if (!data || status !== 200) {
    return {
      errors: {
        email: "User resume not found.",
      },
    };
  }
  (await cookies()).set("resume_id", data.resume_id);
  return {
    data: data,
    status: status,
  };
};
