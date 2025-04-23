"use server";

import { createClient } from "@/app/utils/supabase/server";

export const getRecruiteRequests = async () => {
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
    .from("hiring")
    .select(
      "id, amount, application_status, avatar, hiring_ad, office_location, work_mode, organization_url, twitter_recruiter, position, organization, name, tags"
    )
    .eq("admin_id", userId);
  console.log("Data:", data, status);
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

export const addCategory = async (category: string[], id: string) => {
  const supabase = await createClient();
  const userSession = await supabase.auth.getUser();
  const userId = await userSession.data.user?.id;

  if (!userId) {
    return {
      error: "User not found",
      status: 401,
    };
  }
  const categoryToJson = JSON.stringify(category);
  const { data, error, status } = await supabase
    .from("hiring")
    .update({ application_status: true, tags: categoryToJson })
    .eq("id", id)
    .eq("admin_id", userId)
    .select(
      "id, amount, application_status, avatar, hiring_ad, office_location, work_mode, organization_url, twitter_recruiter, position, organization, name, tags"
    );
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
