import { cn } from "@/app/utils/utils";
import { AnimatePresence, motion } from "motion/react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Mikasa from "@/public/mikasa.png";
import {
  IconAlarmSnooze,
  IconBrandX,
  IconBrandXFilled,
  IconBriefcase,
  IconBriefcaseFilled,
  IconBuildings,
  IconCircleArrowDown,
  IconCircleArrowUp,
  IconCoin,
  IconCopy,
  IconIdBadge,
  IconLink,
  IconMapPin,
  IconMapPinFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { Categories } from "@/app/utils/categories/categories";
import SubmitButton from "../buttons/card";
import { RecruiteRequest } from "@/app/utils/types/types";
import {
  addCategory,
  getRecruiteRequests,
} from "@/app/home/recruiters/actions";
import { set } from "zod";

const RESUME_AVATAR = process.env.NEXT_PUBLIC_RESUME_AVATAR_URL;

export const HoverEffect = ({
  className,
  recruiteData,
  idx,
}: {
  className?: string;
  recruiteData: RecruiteRequest;
  idx: number;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categoriesTags, setCategoriesTags] = useState<
    {
      id: string;
      name: string;
      subCategories: string[];
      showSubCategories: boolean;
    }[]
  >(Categories);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (recruiteData.tags) {
      console.log("Tags:", recruiteData.tags);
      setSelectedCategory(recruiteData.tags);
      // setSelectedCategory(JSON.parse(recruiteData.tags));
    }
  }, [recruiteData]);

  const showCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const updateCategories = categoriesTags.map((category) =>
      category.id === id ? { ...category, showSubCategories: true } : category
    );
    setCategoriesTags(updateCategories);
  };

  const hideCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const updateCategories = categoriesTags.map((category) =>
      category.id === id ? { ...category, showSubCategories: false } : category
    );
    setCategoriesTags(updateCategories);
  };

  const subCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const subcategory = e.currentTarget.id;
    if (selectedCategory?.includes(subcategory)) {
      const updateSelectedCategory = selectedCategory.filter(
        (category) => category !== subcategory
      );
      setSelectedCategory(updateSelectedCategory);
      return;
    }
    setSelectedCategory((prev) => [...prev, subcategory]);
  };

  const apporveRequestHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPending(true);
    const res = await addCategory(selectedCategory, recruiteData.id);
    if (res.error) {
      setError(res.error);
    }
    setPending(false);
  };
  return (
    <div>
      <div
        //   href={item?.link}
        key={recruiteData.id}
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
              src={`${RESUME_AVATAR}/${recruiteData?.avatar}`}
              alt="user avatar"
              height={36}
              width={36}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-700 leading-2.5 font-medium font-mukta text-lg">
                {recruiteData.name}
              </h3>
              <Link
                className="text-slate-700 font-semibold text-sm"
                target="_blank"
                href={recruiteData.organization_url}
              >
                🏢 {recruiteData.organization}
              </Link>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <IconBriefcase className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <h4 className="text-slate-700 font-mukta text-base leading-2.5 font-semibold">
                Hiring:{" "}
                <span className="font-medium ">{recruiteData.position}</span>
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <IconBrandX className="h-5 w-5 shrink-0 text-slate-700" />{" "}
              <span className="text-slate-700 font-mukta text-base font-semibold">
                Twitter:
              </span>
              <Link
                target="_blank"
                href={recruiteData?.twitter_recruiter}
                className="text-slate-700 font-mukta text-base font-medium underline underline-offset-2"
              >
                {recruiteData.twitter_recruiter}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <IconMapPin className="h-5 w-5 shrink-0 text-slate-700" />
              <span className="text-slate-700 font-mukta text-base font-semibold">
                Location:
              </span>
              <span className="font-medium text-slate-700 font-mukta text-base">
                {recruiteData.office_location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconCoin className="h-5 w-5 shrink-0 text-slate-700" />
              <span className="text-slate-700 font-mukta text-base font-semibold">
                Referral Amount:
              </span>
              <span className="font-medium text-slate-700 font-mukta text-base">
                {recruiteData.amount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconLink className="h-5 w-5 shrink-0 text-slate-700" />
              <span className="text-slate-700 font-mukta text-base font-semibold">
                Hiring Link:
              </span>
              <Link
                target="_blank"
                href={recruiteData.hiring_ad}
                className="text-slate-700 font-mukta text-base font-medium underline underline-offset-2"
              >
                {recruiteData.hiring_ad.slice(0, 20)}...
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <IconBuildings className="h-5 w-5 shrink-0 text-slate-700" />
              <span className="text-slate-700 font-mukta text-base font-semibold">
                HQ:
              </span>
              <span className="font-medium text-slate-700 font-mukta text-base">
                {recruiteData.office_location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <IconAlarmSnooze className="h-5 w-5 shrink-0 text-slate-700" />
              <span className="text-slate-700 font-mukta text-base font-semibold">
                Status:
              </span>
              <span className="font-medium text-slate-700 font-mukta text-base">
                {recruiteData.application_status ? "🟢" : "🔴"}
              </span>
            </div>
            <h3 className="text-slate-700 font-mukta text-base font-semibold underline underline-offset-2">
              Select category
            </h3>
            <div className="mt-2 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            <div className="flex flex-col gap-2">
              {categoriesTags.map((category) => {
                return (
                  <div key={category.id} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-slate-700 font-mukta text-sm font-semibold">
                        {category.name}
                      </h4>
                      {category.showSubCategories ? (
                        <motion.button
                          onClick={(e) => hideCategoryHandler(e)}
                          id={category.id}
                          className="cursor-pointer"
                        >
                          <IconCircleArrowUp className="h-5 w-5 shrink-0 text-slate-700" />
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={(e) => showCategoryHandler(e)}
                          id={category.id}
                          className="cursor-pointer"
                        >
                          <IconCircleArrowDown className="h-5 w-5 shrink-0 text-slate-700" />
                        </motion.button>
                      )}
                    </div>

                    <AnimatePresence initial={false} mode="wait">
                      {category.showSubCategories && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.12, delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.12, delay: 0.3 },
                          }}
                          className="flex gap-1 flex-wrap max-w-2xs"
                          layoutId={`${category.subCategories}-${category.id}`}
                          key={`${category.subCategories}-${category.id}`}
                        >
                          {category.subCategories.map((subCategory) => {
                            return (
                              <button
                                onClick={(e) => subCategoryHandler(e)}
                                key={subCategory}
                                id={subCategory}
                                className={`w-fit cursor-pointer text-xs px-1 py-0.5 rounded-lg ${
                                  selectedCategory.includes(subCategory)
                                    ? "bg-emerald-200 border-2 border-gray-50"
                                    : "bg-gray-50"
                                } text-slate-700`}
                              >
                                {subCategory}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            {error && (
              <p className="text-red-600 text-center text-sm max-w-sm  mt-1 font-medium">
                {error}
              </p>
            )}
            <SubmitButton
              disabled={selectedCategory.length === 0}
              pending={pending}
              apporveRequestHandler={apporveRequestHandler}
            />
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
