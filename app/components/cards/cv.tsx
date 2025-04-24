"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Mikasa from "@/public/mikasa.png";
import Image from "next/image";
import { cn } from "@/app/utils/utils";
import {
  IconBooks,
  IconBriefcase,
  IconCoin,
  IconDevices2,
  IconDevicesPc,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import SubmitButton from "../buttons/cv";
export const ResumeCard = ({ idx }: { idx: number }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div>
      <div
        key={1}
        className="relative group  block p-2 h-full w-full"
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === idx && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-white/[0.3] block  rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <Card>
          <div className="flex gap-4 items-center cursor-pointer">
            <Image
              src={Mikasa}
              alt="user avatar"
              height={36}
              width={36}
            ></Image>
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-700 leading-2.5 font-medium font-mukta text-lg">
                Abhishek Lingwal
              </h3>
              <span className="text-slate-700 text-sm font-semibold">
                🧑‍💻 Web developer
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <IconBooks className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Experience:
              </h4>
              <span className="font-medium text-slate-700 font-mukta text-base">
                3 years
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconMapPin className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Location:
              </h4>
              <span className="font-medium text-slate-700 font-mukta text-base">
                Pauri, Uttarakhand, India
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconDevices2 className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Job Preference:
              </h4>
              <span className="font-medium text-slate-700 font-mukta text-base">
                Remote, Hybrid
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconSend className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Relocation:
              </h4>
              <span className="font-medium text-slate-700 font-mukta text-base">
                Across <b>States</b> & <b>Countries</b>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconCoin className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Expected Salary:
              </h4>
              <span className="font-medium text-slate-700 font-mukta text-base">
                $50,000
              </span>
            </div>
            <SubmitButton disabled={false} pending={false} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-white/35 border border-white/30 shadow-lg backdrop-blur-md  group-hover:border-green-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
