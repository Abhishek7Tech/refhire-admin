"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Mikasa from "@/public/mikasa.png";
import Image from "next/image";
import { cn } from "@/app/utils/utils";
import {
  IconBooks,
  IconBriefcase,
  IconCoin,
  IconDeviceLaptop,
  IconDevices2,
  IconDevicesPc,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import SubmitButton from "../buttons/cv";
import { CV, ExperienceInterface } from "@/app/utils/types/types";
const CV_AVATAR = process.env.NEXT_PUBLIC_RESUME_AVATAR_URL;

export const ResumeCard = ({ idx, data }: { idx: number; data: CV }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [preference, setPreference] = useState<
    { remote: boolean; hybrid: boolean; onsite: boolean }[] | []
  >([]);

  const [relocation, setRelocation] = useState<
    { acrossStates: boolean; acrossCountries: boolean }[] | []
  >([]);

  const [experience, setExperience] = useState<ExperienceInterface[]>([]);
  // }
  useEffect(() => {
    const parsePreference = JSON.parse(data.preference);
    const parseRelocation = JSON.parse(data.relocation);
    const parseExperience = JSON.parse(data.experience);
    setPreference(parsePreference);
    setRelocation(parseRelocation);
    setExperience(parseExperience);
  }, [data]);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const setActiveHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActive(true);
    console.log("clicked", active);
  };

  const hideExperienceHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActive(false);
    console.log("clicked", active);
  };
  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inset-0 backdrop-blur-lg w-auto z-40 fixed"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <motion.div
            className="grid bg-white/25 border border-white/30 shadow-lg rounded-2xl max-w-4xl max-h-[70vh] overflow-y-scroll place-items-start place-self-center self-center top-20 absolute z-[100] opacity-100 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scroll-smooth"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
          >
            <div className="flex justify-between w-full px-3 pt-4">
              <h3 className="text-slate-700 font-mukta text-2xl w-full underline underline-offset-2 font-medium">
                Experience
              </h3>

              <motion.button
                animate={{
                  scaleY: 1.1,
                  height: 30,
                  width: 30,
                }}
                transition={{
                  duration: 0.1,
                }}
                onClick={(e) => hideExperienceHandler(e)}
                className="cursor-pointer"
              >
                {" "}
                <CloseIcon />
              </motion.button>
            </div>
            {experience &&
              experience.map((ex, idx) => (
                <div
                  key={ex.role}
                  className="grid grid-cols-5 row-auto gap-4 py-2 px-3 w-full"
                >
                  <div className="col-span-5 col-end-5">
                    <h4 className="capitalize text-lg font-semibold text-slate-700 font-mukta">
                      {ex.role}
                    </h4>
                    <ol className="list-disc px-4 w-fit text-base text-slate-700 font-mukta">
                      {ex.work.map((work) => (
                        <li key={work.id}>{work.work}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="col-start-5 col-end-6 place-items-end w-full">
                    <h4 className="font-medium text-base text-slate-700 font-mukta">
                      {ex.from}-{ex.to}
                    </h4>
                    <span className="font-medium text-sm text-slate-700">
                      {ex.city}, {ex.country}{" "}
                    </span>
                  </div>
                </div>
              ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div>
        <div
          key={1}
          className="relative group p-2 h-full w-full z-0"
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
            <div className="flex gap-3 items-center  cursor-pointer">
              <Image
                src={`${CV_AVATAR}/${data.avatar}`}
                alt="user avatar"
                height={36}
                width={36}
              ></Image>
              <div className="flex flex-col gap-1">
                <h3 className="text-slate-700 leading-2.5 font-medium font-mukta text-lg px-0.5">
                  {data.name}
                </h3>
                <div className="flex items-center gap-1">
                  <IconDeviceLaptop className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                  <span className="text-slate-700 text-sm font-semibold">
                    {data.profession}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <IconBooks className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                  Experience:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-base">
                  {data.years_of_experience.toString()} years
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconMapPin className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                  Location:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-base">
                  {data.location}, {data.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconDevices2 className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                  Job Preference:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-base">
                  {preference[0]?.remote &&
                    `${preference[0]?.hybrid ? "Remote," : "Remote"}`}{" "}
                  {preference[0]?.hybrid &&
                    `${preference[0]?.onsite ? "Hybrid," : "Hybrid"}`}{" "}
                  {preference[0]?.onsite && "Onsite"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconSend className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                  Relocation:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-base">
                  {!relocation[0]?.acrossStates &&
                    !relocation[0]?.acrossCountries && <b>Remote Only</b>}
                  {relocation[0]?.acrossStates && relocation[0]?.acrossCountries
                    ? <span>Across</span> +
                      `${(<b>States</b>)}` +
                      "&" +
                      `${(<b>Countries</b>)}`
                    : ""}
                  {relocation[0]?.acrossStates &&
                    <span>Across</span> + `${(<b>States</b>)}`}

                  {relocation[0]?.acrossCountries &&
                    <span>Across</span> + `${(<b>Countries</b>)}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconCoin className="h-5 w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                  Expected Salary:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-base">
                  ${data.salary}
                </span>
              </div>
              <SubmitButton
                setActiveHandler={(e) => setActiveHandler(e)}
                disabled={false}
                pending={false}
              />
            </div>
          </Card>
        </div>
      </div>
    </>
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

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
