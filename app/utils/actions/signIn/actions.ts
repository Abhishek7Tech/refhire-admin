"use server";
import { z } from "zod";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sanitize } from "../../form-validation/validation";

const SignInSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
});

export const getSignInData = async (previousState: any, formData: FormData) => {
  const signInData = Object.fromEntries(formData);
  const supabase = await createClient();
  const validateSignInData = SignInSchema.safeParse(signInData);

  if (!validateSignInData.success) {
    const formErrors = validateSignInData.error.flatten().fieldErrors;
    return {
      errors: {
        email: formErrors?.email,
      },
    };
  }

  const email = sanitize(signInData.email as string);

  const { data, status, error } = await supabase.
    rpc("validate_admin", { p_email: email });

    if(status !== 200 || error) {
      return {
        errors: {
          email: "Failed to validate admin.",
        }
      } 
    } 

  if (!data) {
    return {
      errors: {
        email: "You are not registered as an admin.",
      },
    };
  }

 
 
  const validateOtp = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (validateOtp.error) {
    return {
      errors: {
        email: validateOtp.error.message,
      },
    };
  }

  revalidatePath("/");
  redirect("/verify");

  return {
    message: "Please check your email.",
  };
};
