"use server";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { console } from "inspector";

const VerifySchema = z.object({
  otp: z
    .string()
    .min(6, { message: "OTP should be atleast 6 characters" })
    .max(6, "OTP should be maximum 6 characters."),
  email: z.string().email(),
});

export const getVerifyData = async (previousState: any, formData: FormData) => {
  const verifyData = Object.fromEntries(formData);
  const supabase = await createClient();
  const validateOtp = VerifySchema.safeParse(verifyData);

  if (!validateOtp.success) {
    const formErrors = validateOtp.error.flatten().fieldErrors;
    console.log("FORM ERRORS", formErrors.email);
    if (formErrors?.email) {
      return {
        errors: {
          otp: "Something went wrong.",
        },
      };
    }
    return {
      errors: {
        otp: formErrors?.otp,
      },
    };
  }

  const otp = verifyData.otp as string;
  const email = verifyData.email as string;

  const { data, error } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: "email",
  });

  if (error) {
    return {
      errors: {
        otp: error.message,
      },
    };
  }

  revalidatePath("/");
  redirect("/home");

  return {
    message: "OTP verified successfully.",
  };
};

export const resendOtp = async (email: string) => {
  const supabase = await createClient();
  if (!email) {
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    return {
      errors: {
        otp: error.message,
      },
    };
  }
};