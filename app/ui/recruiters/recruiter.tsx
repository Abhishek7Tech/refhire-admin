"use client";
import { HoverEffect } from "@/app/components/cards/card";
export function Recruiters() {
  return (
    <div className="max-w-8xl z-0 mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },

];
