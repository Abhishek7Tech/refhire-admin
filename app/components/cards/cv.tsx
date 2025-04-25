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
  IconDevices2,
  IconDevicesPc,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import SubmitButton from "../buttons/cv";
export const ResumeCard = ({ idx }: { idx: number }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [active, setActive] = useState<boolean>(false);

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
                  duration: 0.1
                }}
                onClick={(e) => hideExperienceHandler(e)}
                className="cursor-pointer"
              >
                {" "}
                <CloseIcon />
              </motion.button>
            </div>

            <div className="grid grid-cols-5 row-auto gap-4 py-2 px-3 w-full">
              <div className="col-span-5 col-end-5">
                <h4 className="capitalize text-lg font-semibold text-slate-700 font-mukta">
                  Frontend React Developer Intern
                </h4>
                <ol className="list-disc px-4 w-fit text-base text-slate-700 font-mukta">
                  <li>
                    Implemented Material UI & SCSS to create visually appealing
                    UIs and components, adding a creative touch to project
                    aesthetics.
                  </li>
                  <li>
                    Developed 17+ assessment projects, employing a tailored
                    approach to overcome unique challenges.{" "}
                  </li>
                  <li>
                    Revamped e-commerce UX, resulting in a measurable 15% boost
                    in sales and improved customer satisfaction.{" "}
                  </li>
                  <li>
                    Streamlined CRM & back-office processes, enhancing overall
                    operational efficiency and productivity.{" "}
                  </li>
                </ol>
              </div>
              <div className="col-start-5 col-end-6 place-items-end w-full">
                <h4 className="font-medium text-base text-slate-700 font-mukta">
                  {"May 2023"}-{"Aug 2023"}
                </h4>
                <span className="font-medium text-sm text-slate-700">
                  Capetown, South Africa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 row-auto gap-4 py-2 px-3 w-full">
              <div className="col-span-5 col-end-5">
                <h4 className="font-medium capitalize text-lg text-slate-700 font-mukta">
                  Frontend React Developer Intern
                </h4>
                <ol className="list-disc px-4 w-fit text-base text-slate-700 font-mukta">
                  <li>
                    Implemented Material UI & SCSS to create visually appealing
                    UIs and components, adding a creative touch to project
                    aesthetics.
                  </li>
                  <li>
                    Developed 17+ assessment projects, employing a tailored
                    approach to overcome unique challenges.{" "}
                  </li>
                  <li>
                    Revamped e-commerce UX, resulting in a measurable 15% boost
                    in sales and improved customer satisfaction.{" "}
                  </li>
                  <li>
                    Streamlined CRM & back-office processes, enhancing overall
                    operational efficiency and productivity.{" "}
                  </li>
                </ol>
              </div>
              <div className="col-start-5 col-end-6 place-items-end w-full">
                <h4 className="font-medium text-base text-slate-700 font-mukta">
                  {"May 2023"}-{"Aug 2023"}
                </h4>
                <span className="font-medium text-sm text-slate-700">
                  Capetown, South Africa
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 row-auto gap-4 py-2 px-3 w-full">
              <div className="col-span-5 col-end-5">
                <h4 className="font-medium capitalize text-lg text-slate-700 font-mukta">
                  Frontend React Developer Intern
                </h4>
                <ol className="list-disc px-4 w-fit text-base text-slate-700 font-mukta">
                  <li>
                    Implemented Material UI & SCSS to create visually appealing
                    UIs and components, adding a creative touch to project
                    aesthetics.
                  </li>
                  <li>
                    Developed 17+ assessment projects, employing a tailored
                    approach to overcome unique challenges.{" "}
                  </li>
                  <li>
                    Revamped e-commerce UX, resulting in a measurable 15% boost
                    in sales and improved customer satisfaction.{" "}
                  </li>
                  <li>
                    Streamlined CRM & back-office processes, enhancing overall
                    operational efficiency and productivity.{" "}
                  </li>
                </ol>
              </div>
              <div className="col-start-5 col-end-6 place-items-end w-full">
                <h4 className="font-medium text-base text-slate-700 font-mukta">
                  {"May 2023"}-{"Aug 2023"}
                </h4>
                <span className="font-medium text-sm text-slate-700">
                  Capetown, South Africa
                </span>
              </div>
            </div>
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
