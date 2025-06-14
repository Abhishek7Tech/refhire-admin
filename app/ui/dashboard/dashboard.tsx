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
    <section className="mt-12 mb-4 md:mt-8 p-1 md:pl-[72px] lg:pl-[80px] xs:p-4 w-full flex flex-col lg:mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-4  auto-rows-auto w-full md:w-fit gap-4">
        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
          <h1 className="text-slate-700 flex space-x-1.5 font-mukta text-base xs:text-xl lg:text-2xl font-medium">
            👋 Welcome, {adminData?.name.split(" ")[0] || "Admin"}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
          <h1 className="text-slate-700 flex space-x-1.5 font-mukta text-base xs:text-xl lg:text-2xl font-medium">
            💰 Earnings: ${adminData?.referral_earnings || 0}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
          <h1 className="text-slate-700 flex space-x-1.5 font-mukta text-base xs:text-xl lg:text-2xl font-medium">
            📑Resume Added: {adminData?.resume_count || 0}
          </h1>
        </div>

        <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
          <h1 className="text-slate-700 flex space-x-1.5 font-mukta text-base xs:text-xl lg:text-2xl font-medium">
            ✅ Successfull Referrals: {adminData?.referral_count || 0}
          </h1>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-x-4 space-y-4 xl:space-y-3 my-6 w-full xl:w-fit mx-auto">
        <RequestTable />
        <PlatformStats />
      </div>
      <div className="w-full">
        <ActivityTable />
      </div>
    </section>
  );
}

export default Dashboard;
