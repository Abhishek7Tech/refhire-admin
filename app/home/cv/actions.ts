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
      "id, name, profession,years_of_experience, country, location, preference, relocation, is_hired, resume_id, salary, experience, avatar"
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

export const updateHiringStatus = async (formId: string) => {
  const supabase = await createClient();
  const userSession = await supabase.auth.getUser();
  const userId = await userSession.data.user?.id;

  if (!userId) {
    return {
      error: "User not found",
      status: 401,
    };
  }

  const { data, error, status } = await supabase
    .from("resume")
    .update({ is_hired: true })
    .eq("resume_id", formId)
    .eq("admin_id", userId)
    .select("id, is_hired");
  console.log("User Id", userId);
  console.log("Data:", data, status);
  console.log("Error:", error);

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
