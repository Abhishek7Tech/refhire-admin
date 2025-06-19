"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const signOut = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userId = await session.data.user?.id;

  if (!userId) {
    return {
      status: 404,
      message: "User Id not found",
    };
  }

  const { error } = await supabase.auth.signOut();
  (await cookies()).delete("user_email");
  if (error) {
    throw new Error("Something went wrong.");
  }

  revalidatePath("/");
  redirect("/");
};
