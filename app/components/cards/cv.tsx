"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/app/utils/utils";
import {
  IconAlarmSnooze,
  IconBooks,
  IconCoin,
  IconDeviceLaptop,
  IconDevices2,
  IconMapPin,
  IconPencil,
  IconSend,
} from "@tabler/icons-react";
import SubmitButton from "../buttons/cv";
import {
  CV,
  ExperienceInterface,
  Preference,
  Relocation,
} from "@/app/utils/types/types";
import { updateHiringStatus } from "@/app/home/cv/actions";
import UpdateStatus from "../buttons/hiringStatus";
import { useRouter } from "next/navigation";
const CV_AVATAR = process.env.NEXT_PUBLIC_RESUME_AVATAR_URL;

export const ResumeCard = ({ idx, data }: { idx: number; data: CV }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const [hiringStatus, setHiringStatus] = useState<boolean>(data.is_hired);
  const [preference, setPreference] = useState<Preference[] | []>([]);

  const [relocation, setRelocation] = useState<Relocation[] | []>([]);
  const [experience, setExperience] = useState<ExperienceInterface[]>([]);
  const [editPending, setEditPending] = useState<boolean>(false);
  const [hiringStatusPending, setHiringStatusPending] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // }
  useEffect(() => {
    setPreference(data.preference.preferences);
    setRelocation(data.relocation.relocateTo);
    setExperience(data.experience);
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

  const hiringStatusHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setHiringStatusPending(true);
    setError(null);
    try {
      const res = await updateHiringStatus(data.resume_id);
      if (res.error) {
        setError(res.error);
      }

      if (res.data?.length) {
        setHiringStatus(res.data[0].is_hired);
      }
    } catch (error) {
      setError("Something went wrong.");
    }
    setHiringStatusPending(false);
  };

  const setActiveHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActive(true);
  };

  const hideExperienceHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setActive(false);
  };

  const editResumeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEditPending(true);
    const resumeId = e.currentTarget.id;
    router.push(`/home/edit/${resumeId}`);
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
            className="grid bg-white/25 border border-white/30 shadow-lg rounded-2xl w-11/12 sm:w-4/5 lg:max-w-4xl max-h-[90vh] xs:max-h-[80vh] sm:max-h-[70vh] overflow-y-scroll place-items-start place-self-center self-center top-20 absolute z-[100] opacity-100 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scroll-smooth"
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
            <div className="flex justify-between w-full px-3 py-4">
              <h3 className="text-slate-700 font-mukta  text-lg xs:text-xl md:text-2xl w-full underline underline-offset-2 font-medium">
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
                  <div className="col-span-full lg:col-span-5 lg:col-end-5">
                    <h4 className="capitalize xs:text-base sm:text-lg font-semibold text-slate-700 font-mukta leading-1.5">
                      {ex.role}
                    </h4>
                    <div className="lg:hidden">
                      <span className="text-sm sm:text-base font-medium text-slate-700 font-mukta">
                        {ex.from}-{ex.to},
                      </span>
                      <span className="text-sm sm:text[15px] font-medium text-slate-700 font-mukta">
                        {ex.remote
                          ? ` ${ex.remote}`
                          : ` ${ex.city} ${ex.city && ","} ${ex.country}`}{" "}
                      </span>
                    </div>
                    <ol className="list-disc px-4 w-fit text-[15px] sm:text-base text-slate-700 font-mukta mt-1.5">
                      {ex.work.map((work) => (
                        <li key={work.id}>{work.work}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="hidden lg:block col-start-5 col-end-6 place-items-end w-full">
                    <h4 className="font-medium text-base text-slate-700 font-mukta">
                      {ex.from}-{ex.to}
                    </h4>
                    <h5 className="font-medium text-sm text-slate-700 text-right font-mukta">
                      {ex.remote ? `${ex.remote}` : `${ex.city}, ${ex.country}`}{" "}
                    </h5>
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
          <Card id={idx.toString()}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center cursor-pointer">
                <Image
                  src={`${CV_AVATAR}/${data.avatar}`}
                  alt="user avatar"
                  height={36}
                  width={36}
                  className="w-8 h-8 xs:w-9 xs:h-9"
                ></Image>
                <div className="flex flex-col gap-1">
                  <h3 className="text-slate-700 leading-2 xs:leading-2.5 font-medium font-mukta text-base xs:text-lg px-0.5">
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
              <motion.button
                initial={{
                  scaleY: 1,
                }}
                whileHover={{
                  scaleY: 1.1,
                }}
                disabled={editPending}
                id={data.resume_id}
                onClick={(e) => editResumeHandler(e)}
                type="button"
                className="cursor-pointer"
              >
                <IconPencil className="h-5 w-5 shrink-0 text-slate-700" />
              </motion.button>
            </div>

            <div className="mt-4 flex flex-col gap-2 xs:gap-3">
              <div className="flex items-center gap-2">
                <IconBooks className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Experience:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {data.years_of_experience.toString()} years
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconMapPin className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Location:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {data.location}, {data.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconDevices2 className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Job Preference:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {preference[0]?.remote &&
                    `${preference[0]?.hybrid ? "Remote," : "Remote"}`}{" "}
                  {preference[0]?.hybrid &&
                    `${preference[0]?.onsite ? "Hybrid," : "Hybrid"}`}{" "}
                  {preference[0]?.onsite && "Onsite"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconSend className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Relocation:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {!relocation[0]?.anotherState &&
                    !relocation[0]?.anotherCountry && <b>Remote Only</b>}
                  {relocation[0]?.anotherState &&
                  relocation[0]?.anotherCountry ? (
                    <>
                      <p className="break-words">
                        <span>Across </span>
                        <b>States </b> & <b> Countries</b>
                      </p>{" "}
                    </>
                  ) : (
                    ""
                  )}
                  {relocation[0]?.anotherState &&
                    !relocation[0]?.anotherCountry && (
                      <>
                        <span>Across</span> <b>States</b>
                      </>
                    )}

                  {relocation[0]?.anotherCountry &&
                    !relocation[0]?.anotherState && (
                      <>
                        <span>Across</span> <b>Countries</b>
                      </>
                    )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconCoin className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />{" "}
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Expected Salary:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {data.salary}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <IconAlarmSnooze className="hidden xs:inline xs:h-5 xs:w-5 shrink-0 text-slate-700" />
                <h4 className="text-slate-700 font-mukta text-[15px] xs:text-base  xs:leading-2.5 font-semibold">
                  Status:
                </h4>
                <span className="font-medium text-slate-700 font-mukta text-[15px] xs:text-base">
                  {hiringStatus ? "🟢" : "🔴"}
                </span>
              </div>
              {error && (
                <p className="text-red-600 text-center text-sm max-w-sm  mt-1 font-medium">
                  {error}
                </p>
              )}
              <SubmitButton
                setActiveHandler={(e) => setActiveHandler(e)}
                disabled={false}
                pending={false}
                id={idx.toString()}
              />
              <UpdateStatus
                hiringStatusHandler={(e) => hiringStatusHandler(e)}
                pending={hiringStatusPending}
                disabled={hiringStatus}
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
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl h-full w-full p-1 xs:p-2 overflow-hidden bg-white/35 border border-white/30 shadow-lg backdrop-blur-md  group-hover:border-green-300 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="px-2 py-3 xs:px-1.5 sm:px-2 lg:px-4 lg:py-4">
          {children}
        </div>
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
      className="h-5 w-5 md:h-6 md:w-6 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
