"use client";
import Image from "next/image";
import { useActionState, useContext, useEffect } from "react";
import { useFormStatus } from "react-dom";
import LoadingSvg from "../../../public/loading.gif";
function SubmitButton({
  disabled,
  pending,
}: //   apporveRequestHandler,
{
  disabled: boolean;
  pending: boolean;
  //   apporveRequestHandler: (
  //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ) => void;
}) {
  return (
    <button
      disabled={disabled}
      //   onClick={(e) => apporveRequestHandler(e)}
      type="button"
      className="p-[3px] mt-3 relative mx-auto cursor-pointer border-t-cyan-300 border-r-cyan-300 bg-emerald-200/100 hover:bg-emerald-300/40 backdrop-blur-lg shadow-md border-b-emerald-300 border-l-emerald-300 hover:border-emerald-300/40 rounded-lg"
    >
      <div className="px-8 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-slate-700 font-mukta font-medium  text-shadow-md">
        {pending ? (
          <Image
            className="mx-auto"
            src={LoadingSvg}
            height={28}
            width={28}
            alt="loading-spinner"
          ></Image>
        ) : (
          <span>View Experience</span>
        )}
      </div>
    </button>
  );
}

export default SubmitButton;
