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
} from "@tabler/icons-react";
import { useState } from "react";

export function AdminMenu() {
  const menuItems = [
    {
      label: "Add Resume",
      href: "home/resume",
      icon: <IconUserPlus className="h-5 w-5 shrink-0 text-slate-700 " />,
    },
    {
      label: "Resumes",
      href: "home/cv",
      icon: <IconFileCv className="h-5 w-6 shrink-0 text-slate-700 " />,
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
        " flex w-fit flex-col overflow-hidden rounded-md bg-white/25 border border-white/30 shadow-lg backdrop-blur-md md:flex-row",
        "h-full z-10 absolute" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
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
