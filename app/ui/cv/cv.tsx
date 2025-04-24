import { ResumeCard } from "@/app/components/cards/cv";

export function CV() {
  return (
    <div className="max-w-8xl z-0 mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10">
        <ResumeCard idx={1} />
        <ResumeCard idx={2} />
      </div>
    </div>
  );
}
