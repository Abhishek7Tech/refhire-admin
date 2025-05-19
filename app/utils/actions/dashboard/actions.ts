"use server";
import { createClient } from "../../supabase/server";
import { createAdminClient } from "../../supabase/admin";
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
    .order("created_at", { ascending: false })
    .limit(5);

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

export const getUsersActivity = async () => {
  const supabase = await createAdminClient();

  const { data, status, error } = await supabase
    .from("messages")
    .select("created_at, sender, receiver, receiver_email, id")
    .order("created_at", { ascending: false })
    .limit(5);
  console.log("Data", data, error, status);
  if (error) {
    return {
      status: status,
      error: error.message,
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



export async function getPlatformStats() {
  const supabase = await createClient();

  const session = await supabase.auth.getUser();
  const userId = await session.data.user?.id;

  if (!userId) {
    return {
      error: "Invaild user id.",
      status: 404,
    };
  }

  const [totalrecruiters, totalCandidates, totalHires] = await Promise.all([
    supabase.from("recruiters").select("*", { count: "exact", head: true }),
    supabase.from("resume").select("*", { count: "exact", head: true }),
    supabase
      .from("resume")
      .select("*", { count: "exact", head: true })
      .eq("is_hired", true),
  ]);

  if (totalrecruiters.error || totalCandidates.error || totalHires.error) {
    return {
      status: 404,
      error: "Failed to fetch info.",
    };
  }

  if (
    totalrecruiters.count !== null &&
    totalCandidates.count !== null &&
    totalHires.count !== null
  ) {
    const totalUsers = totalrecruiters.count + totalCandidates.count;
    const hires = totalHires.count;

    return {
      status: 200,
      data: {
        totalUsers,
        totalRecruiters: totalrecruiters.count,
        totalCandidates: totalCandidates.count,
        hires,
      },
    };
  }
}