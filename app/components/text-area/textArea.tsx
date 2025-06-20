"use client";

import { cn } from "@/app/utils/utils";
import React from "react";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, rows, cols, name, ...props }, ref) => {
    return (
      <textarea
        wrap="soft"
        rows={rows}
        cols={cols}
        name={name}
        className={cn(
          `shadow-input font-mukta placeholder-text-neutral-600 flex h-40 resize-none w-full rounded-md border-none bg-gray-50 md:px-3 px-2 py-1 md:py-2 text-[15px] text-slate-700 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-emerald-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scroll-smooth `,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
