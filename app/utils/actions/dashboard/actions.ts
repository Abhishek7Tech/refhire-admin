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
  const [adminStats] = await Promise.all([
    await supabase
      .from("admins")
      .select("id, name,resume_count, referral_earnings,referral_count")
      .eq("user_id", userId),
  ]);

  if (adminStats.error) {
    return {
      error: adminStats.error.message,
      status: adminStats.status,
    };
  }

  if (adminStats.data.length === 0) {
    return {
      error: "No data found.",
      status: 404,
    };
  }
  const data = adminStats.data[0];
  return {
    data,
    status: adminStats.status,
  };
};
