"use client";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import LoadingSvg from "../../../public/loading.gif";
function SubmitReview() {
  const { data, pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="p-[3px] mt-2 relative min-w-30 xs:min-w-52 cursor-pointer border-t-cyan-300 border-r-cyan-300 bg-emerald-200/100 hover:bg-emerald-300/40 backdrop-blur-lg shadow-md border-b-emerald-300 border-l-emerald-300 hover:border-emerald-300/40 rounded-lg"
    >
      <div className="px-2 md:px-8 py-1.5 md:py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-slate-700 font-mukta font-medium  text-shadow-md">
        {pending ? (
          <Image
            className="mx-auto"
            src={LoadingSvg}
            height={28}
            width={28}
            alt="loading-spinner"
          ></Image>
        ) : (
          <span className="text-sm xs:text-[15px] sm:text-base">
            Submit Review
          </span>
        )}
      </div>
    </button>
  );
}

export default SubmitReview;
