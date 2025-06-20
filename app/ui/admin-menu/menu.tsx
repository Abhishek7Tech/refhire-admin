"use client";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/app/components/sidebar/sideBar";
import { cn } from "@/app/utils/utils";
import Image from "next/image";
import { motion } from "motion/react";
import {
  IconArrowLeft,
  IconGitPullRequest,
  IconUserFilled,
  IconUserPlus,
  IconFileCv,
  IconMessagePlus,
} from "@tabler/icons-react";
import { useState } from "react";

export function AdminMenu() {
  const menuItems = [
    {
      label: "Add Resume",
      href: "/home/resume",
      icon: <IconUserPlus className="h-5 w-5 shrink-0 text-slate-700 " />,
    },
    {
      label: "Add Review",
      href: "/home/review",
      icon: <IconMessagePlus className="h-5 w-5 shrink-0 text-slate-700 " />,
    },
    {
      label: "Resumes",
      href: "/home/cv",
      icon: <IconFileCv className="h-5 w-6 shrink-0 text-slate-700 " />,
    },
    {
      label: "Recruiters",
      href: "/home/recruiters",
      icon: <IconGitPullRequest className="h-5 w-6 shrink-0 text-slate-700 " />,
    },
    {
      label: "Dashboard",
      href: "/home",
      icon: <IconUserFilled className="h-5 w-5 shrink-0 text-slate-700 " />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-slate-700" />,
    },
  ];

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        " flex flex-col overflow-hidden  bg-white/25 border border-white/30 shadow-lg backdrop-blur-md md:flex-row",
        `${
          open
            ? "h-full w-full sm:max-w-3xs rounded-md"
            : "h-fit md:h-full w-min top-2 left-2 md:top-0 md:left-0 rounded-full md:rounded-md"
        } z-10 absolute` // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-2 md:mt-8 flex flex-col gap-1 md:gap-2">
              {menuItems.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export default AdminMenu;
