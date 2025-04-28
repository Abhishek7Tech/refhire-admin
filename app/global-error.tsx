"use client";

export default function Error({
  error,
  reset,
}: {
  error: { message: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto z-100 w-full max-w-max bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl my-32">
      <h2 className="text-slate-700 font-medium text-lg">
        {error?.message || "Something went wrong." + " ☹️"}
      </h2>
      <button
        type="button"
        className="p-[3px] mt-3 relative min-w-52 mx-auto cursor-pointer border-t-cyan-300 border-r-cyan-300 bg-emerald-200/100 hover:bg-emerald-300/40 backdrop-blur-lg shadow-md border-b-emerald-300 border-l-emerald-300 hover:border-emerald-300/40 rounded-lg"
        onClick={() => reset()}
      >
        <div className="px-8 py-2  bg-transparent rounded-[6px]  relative group transition duration-200 text-slate-700 font-mukta font-medium  text-shadow-md">
          Try again
        </div>
      </button>
    </div>
  );
}
