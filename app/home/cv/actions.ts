"use server";

import { createClient } from "@/app/utils/supabase/server";

export const getCVData = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userId = await session.data.user?.id;

  if (!userId) {
    return {
      error: "User not found",
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("resume")
    .select(
      "id, name, profession,years_of_experience, country, location, preference, relocation, salary, experience, avatar"
    )
    .eq("admin_id", userId);

  if (error) {
    return {
      error: error.message,
      status: status,
    };
  }

  return {
    data,
    status,
  };
};
