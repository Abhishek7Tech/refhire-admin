"use server";

import Email from "@/app/utils/email/email";
import { createClient } from "@/app/utils/supabase/server";
import Plunk from "@plunk/node";
import { render } from "jsx-email";
const PLUNK_AUTH = process.env.PLUNK_SECRET_KEY;
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
  const userEmail = await userSession.data.user?.email;

  if (!userId || !userEmail) {
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

  if (!id) {
    return {
      error: "User not found.",
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
    .select("id, application_status, name, position, email");

  if (error) {
    return {
      error: error.message,
      status: status,
    };
  }

  if (!PLUNK_AUTH) {
    return {
      error: "Failed to deliver the message. Try again.",
      status: 500,
    };
  }
  console.log("Status", status);
  if (status === 200) {
    const plunk = new Plunk(PLUNK_AUTH);
    const body = await render(
      Email({ name: data[0].name as string, position: data[0].position })
    );

    try {
      const res = await plunk.emails.send({
        to: data[0].email,
        subject: `Your Request Has Been Reviewed.`,
        body,
      });

      if (res.success && data.length) {
        return {
          data: [
            { id: data[0].id, application_status: data[0].application_status },
          ],
          status,
        };
      }
    } catch (error) {
      return {
        error: "Failed to send message. Try again.",
      };
    }
  }

  return {
    data: [{ id: data[0].id, application_status: data[0].application_status }],
    status,
  };
};
