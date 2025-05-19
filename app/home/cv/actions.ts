"use server";

import { createClient } from "@/app/utils/supabase/server";
import { STATS_TABLE_ID } from "@/app/utils/statsId/stats";
import { createAdminClient } from "@/app/utils/supabase/admin";

export const getCVData = async () => {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  const userId = await session.data.user?.id;

  if (!userId) {
    return {
      error: "User not found.",
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
  const supabase = await createAdminClient();
 
  const { data, error, status } = await supabase
    .from("resume")
    .update({ is_hired: true })
    .eq("resume_id", formId)
    .select("id, is_hired");
  console.log("Data:", data, status);
  console.log("Error:", error);

  if (error) {
    return {
      error: error.message,
      status: status,
    };
  }
 if(status === 200 && data[0].is_hired) {
  await supabase.rpc("update_total_hires", {table_id: STATS_TABLE_ID })
 }
  
  return {
    data,
    status,
  };
};
