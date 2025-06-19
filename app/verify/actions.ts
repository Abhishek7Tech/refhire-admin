"use server";
import { z } from "zod";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { console } from "inspector";
import { cookies } from "next/headers";

const VerifySchema = z.object({
  otp: z
    .string()
    .trim()
    .min(6, { message: "OTP should be atleast 6 characters" })
    .max(6, "OTP should be maximum 6 characters."),
});

export const getVerifyData = async (previousState: any, formData: FormData) => {
  const verifyData = Object.fromEntries(formData);
  const supabase = await createClient();
  const validateOtp = VerifySchema.safeParse(verifyData);
  const email = (await cookies()).get("user_email")?.value;

  if (!email) {
    return {
      errors: {
        otp: "Something went wrong.",
      },
    };
  }
  if (!validateOtp.success) {
    const formErrors = validateOtp.error.flatten().fieldErrors;

    return {
      errors: {
        otp: formErrors?.otp,
      },
    };
  }

  const otp = verifyData.otp as string;

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
  console.log("Error", data);
  revalidatePath("/");
  redirect("/home");

  return {
    message: "OTP verified successfully.",
  };
};

export const resendOtp = async () => {
  const supabase = await createClient();
  const email = (await cookies()).get("user_email")?.value;
  if (!email) {
    return {
      errors: {
        otp: "Something went wrong. Please try again.",
      },
    };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
  });

  if (error) {
    return {
      errors: {
        otp: error.message,
      },
    };
  }
};
