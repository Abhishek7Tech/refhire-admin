"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";

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
  console.log("ERROR", error);
  if (error) {
    return {
      status: 500,
      message: "Something went wrong.",
    };
  }

  revalidatePath("/");
  redirect("/");
};
