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
      "id, amount, application_status, avatar, hiring_ad, office_location_city, office_location_country, work_mode, organization_url, twitter_recruiter, position, organization, name, tags"
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
      error: "User not found.",
      status: 401,
    };
  }

  if (!category.length) {
    return {
      error: "Select a category.",
      status: 400,
    };
  }
  const { data, error, status } = await supabase
    .from("hiring")
    .update({
      application_status: true,
      tags: { tagNames: category },
    })
    .eq("id", id)
    .eq("admin_id", userId)
    .select("id, application_status");

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
