import { JSX } from "react";

function Heading({ title }: { title: string }): JSX.Element {
  return (
    <div className="bg-white/25 col-span-full place-self-start ml-2 align-middle border mb-2 border-white/30 shadow-lg backdrop-blur-md px-4 py-2 rounded-2xl w-fit">
      <h2 className="text-2xl underline underline-offset-2 font-mukta font-medium text-slate-700">
        {title}
      </h2>
    </div>
  );
}

export default Heading;
