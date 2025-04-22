"use server";
import { z } from "zod";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  const email = signInData.email as string;

  const { data, status } = await supabase
    .from("admins")
    .select("email")
    .eq("email", email)
    .single();


  if (!data?.email) {
    return {
      errors: {
        email: "You are not registered as an admin.",
      },
    };
  }

 
 
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  if (error) {
    return {
      errors: {
        email: error.message,
      },
    };
  }

  revalidatePath("/");
  redirect("/verify");

  return {
    message: "Please check your email.",
  };
};
