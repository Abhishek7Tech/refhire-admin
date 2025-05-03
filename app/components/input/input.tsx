"use client";

import { cn } from "@/app/utils/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `shadow-input placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-base text-slate-700 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-emerald-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
