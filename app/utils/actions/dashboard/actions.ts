"use server";
import { createClient } from "../../supabase/server";

export const getAdminStats = async () => {
  const supabase = await createClient();
  const userSesssion = await supabase.auth.getUser();
  const userId = await userSesssion.data.user?.id;
  if (!userId) {
    return {
      error: "User not found.",
      status: 401,
    };
  }
  const adminStats = await supabase
    .from("admins")
    .select("id, name,resume_count, referral_earnings,referral_count")
    .eq("user_id", userId);

  if (adminStats.error) {
    return {
      error: adminStats.error.message,
      status: adminStats.status,
    };
  }

  if (adminStats.data) {
    return {
      data: adminStats.data[0],
      status: adminStats.status,
    };
  }
  return {
    error: "No data found.",
    status: 404,
  };
};

export const getRecruiteRequests = async () => {
  const supabase = await createClient();
  const userSession = await supabase.auth.getUser();
  const userId = await userSession.data.user?.id;
  if (!userId) {
    return {
      error: "User not found.",
      status: 401,
    };
  }
  const { data, error, status } = await supabase
    .from("hiring")
    .select("id, name, position, application_status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      error: error.message,
      status: status,
    };
  }

  if (status === 200 && data) {
    return {
      status,
      data,
    };
  }

  return {
    status: 500,
    error: "Something went wrong.",
  };
};
