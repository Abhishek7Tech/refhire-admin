"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LoadingSvg from "@/public/loading.gif";
// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: { message: string };
  reset: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleReset = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    router.push(reset);
  };
  return (
    <section className="min-h-screen flex items-center">
      <div className="mx-auto z-100 flex flex-col min-w-sm max-w-xl bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl h-fit">
        <h2 className="text-slate-700 font-medium text-lg text-center">
          {error?.message + " ☹️" || "Something went wrong." + " ☹️"}
        </h2>
        <button
          disabled={loading}
          type="reset"
          className="p-[3px] mt-3 relative min-w-52 mx-auto cursor-pointer border-t-cyan-300 border-r-cyan-300 bg-emerald-200/100 hover:bg-emerald-300/40 backdrop-blur-lg shadow-md border-b-emerald-300 border-l-emerald-300 hover:border-emerald-300/40 rounded-lg"
          onClick={
            // Attempt to recover by trying to re-render the segment
            (e) => handleReset(e)
          }
        >
          <div className="px-8 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-slate-700 font-mukta font-medium  text-shadow-md">
            {loading ? (
              <Image
                className="mx-auto"
                src={LoadingSvg}
                height={24}
                width={24}
                alt="loading-spinner"
              ></Image>
            ) : (
              <span className="text-base">Try again</span>
            )}
          </div>
        </button>
      </div>
    </section>
  );
}
