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
    <div className="grid grid-cols-2 grid-flow-row gap-3">
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.h1 className="text-slate-700 text-2xl font-mukta font-medium min-w-3xs text-start">
              🟢 Active Users: {stats?.totalUsers || 0}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.h1 className="text-slate-700 text-2xl font-mukta font-medium min-w-3xs text-start">
              ©️ Active Candidates: {stats?.totalCandidates || 0}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.h1 className="text-slate-700 text-2xl font-mukta font-medium min-w-3xs text-start">
              ®️ Active Recruiters: {stats?.totalRecruiters || 0}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
      <div className="bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl w-fit">
        <div className="overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.h1 className="text-slate-700 text-2xl font-mukta font-medium min-w-3xs text-start">
              ✅ Successful Hires: {stats?.hires || 0}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default PlatformStats;
