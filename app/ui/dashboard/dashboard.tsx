"use client";
import Error from "@/app/home/error";
import Loading from "@/app/loading";
import { getAdminStats } from "@/app/utils/actions/dashboard/actions";
import { AdminInterface } from "@/app/utils/types/types";

import { useEffect, useState } from "react";
import RequestTable from "../request-table.tsx/request";
import ActivityTable from "../activity-table.tsx/activity";
import PlatformStats from "../platform-stats/stats";

function Dashboard() {
  const [error, setError] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<undefined | AdminInterface>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setError(null);
    (async () => {
      try {
        const res = await getAdminStats();
        if (res.status !== 200) {
          setError("Something went wrong.");
          setLoading(false);
          return;
        }
        if (res.error) {
          setError(res.error);
          setLoading(false);
          return;
        }
        setAdminData(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Something went wrong.");
        return;
      }
    })();
  }, []);

  if (error) {
    return <Error error={{ message: error }} reset={"/home/dashboard"} />;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="mt-8 mx-auto">
      <div className="flex space-x-8 justify-center">
        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            👋 Welcome, {adminData?.name.split(" ")[0] || "Admin"}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            💰 Earnings: ${adminData?.referral_earnings || 0}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            📑Resume Added: {adminData?.resume_count || 0}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
          <h1 className="text-slate-700 font-mukta text-2xl font-medium">
            ✅ Successfull Referrals: {adminData?.referral_count || 0}
          </h1>
        </div>
      </div>

      <div className="flex space-x-8 my-6">
        <RequestTable />
        <PlatformStats />
      </div>
      <div className="my-6">
        <ActivityTable />
      </div>
    </section>
  );
}

export default Dashboard;
