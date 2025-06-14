"use client";
import Error from "@/app/home/error";
import { getPlatformStats } from "@/app/utils/actions/dashboard/actions";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function PlatformStats() {
  const [stats, setStats] = useState<
    | {
        totalUsers: number;
        totalRecruiters: number;
        totalCandidates: number;
        hires: number;
      }
    | undefined
  >(undefined);
  useEffect(() => {
    (async () => {
      try {
        const res = await getPlatformStats();
        if (res?.status !== 200) {
          return;
        }
        setStats(res.data);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 mx-auto grid-flow-row gap-4 justify-items-center md:justify-items-start w-full md:w-fit h-min">
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full xl:h-fit  p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
        <AnimatePresence mode="wait">
          <motion.h1 className="text-slate-700 flex space-x-1.5 text-base xs:text-xl md:text-2xl font-mukta font-medium text-start">
            <span>🟢</span> Active Users: {stats?.totalUsers || 0}
          </motion.h1>
        </AnimatePresence>
      </div>

      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full xl:h-fit p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
        <AnimatePresence mode="wait">
          <motion.h1 className="text-slate-700 flex space-x-1.5 text-base xs:text-xl md:text-2xl font-mukta font-medium text-start">
            <span>©️</span> Active Candidates: {stats?.totalCandidates || 0}
          </motion.h1>
        </AnimatePresence>
      </div>
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full xl:h-fit p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
        <AnimatePresence mode="wait">
          <motion.h1 className="text-slate-700 flex space-x-1.5 text-base xs:text-xl md:text-2xl font-mukta font-medium text-start">
            <span>®️</span> Active Recruiters: {stats?.totalRecruiters || 0}
          </motion.h1>
        </AnimatePresence>
      </div>
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md h-full xl:h-fit p-2 md:p-4 rounded-2xl w-full md:w-fit lg:w-full">
        <AnimatePresence mode="wait">
          <motion.h1 className="text-slate-700 flex space-x-1.5 text-base xs:text-xl md:text-2xl font-mukta font-medium text-start">
            <span>✅</span> Successful Hires: {stats?.hires || 0}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PlatformStats;
