"use client";

import SubmitReview from "@/app/components/buttons/review";
import { Input } from "@/app/components/input/input";
import { TextArea } from "@/app/components/text-area/textArea";
import { getTestimonialsData } from "@/app/home/review/actions";
import { cn } from "@/app/utils/utils";
import { useActionState } from "react";
import { twJoin } from "tailwind-merge";

const initialFormState = {
  name: "",
  twitter: "",
  role: "",
  company: "",
  review: "",
  message: "",
};
function TestimonialForm() {
  const [inputState, setInputState] = useActionState(
    getTestimonialsData,
    initialFormState
  );
  return (
    <section className=" mx-auto w-11/12 sm:w-4/5 md:max-w-xl bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-1.5 sm:p-4 rounded-2xl my-12">
      <h2 className="text-2xl font-mukta font-medium text-slate-700">
        Add Testimonial.
      </h2>
      <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <form className="my-2" action={setInputState}>
        <div className="mb-4 flex flex-col space-y-3">
          <LabelInputContainer
            className={inputState.errors?.name ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="name"
              className="text-slate-700 font-mukta font-semibold text-base"
            >
              Name
            </label>
            <Input name="name" placeholder="Tyler" type="text" required></Input>
          </LabelInputContainer>
          {inputState.errors?.name && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.name}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.twitter ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="twitter"
              className="text-slate-700 font-mukta font-semibold text-base"
            >
              Twitter/X
            </label>
            <Input
              name="twitter"
              placeholder="https://x.com/Tyler"
              type="url"
              required
            ></Input>
          </LabelInputContainer>
          {inputState.errors?.twitter && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.twitter}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.role ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="twitter"
              className="text-slate-700 font-mukta font-semibold text-base"
            >
              Role
            </label>
            <Input
              name="role"
              placeholder="CTO at Google"
              type="text"
              required
            ></Input>
          </LabelInputContainer>
          {inputState.errors?.role && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.role}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.company ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="company"
              className="text-slate-700 font-mukta font-semibold text-base"
            >
              Company/Startup
            </label>
            <Input
              name="company"
              placeholder="Google"
              type="text"
              required
            ></Input>
          </LabelInputContainer>
          {inputState.errors?.company && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.company}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.review ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="review"
              className="text-slate-700 font-mukta font-semibold text-sm sm:text-base"
            >
              Review
            </label>
            <TextArea
              name="review"
              placeholder="Write testimonial here..."
              rows={15}
              cols={12}
              required
            ></TextArea>
          </LabelInputContainer>
          {inputState.errors?.review && (
            <p className="text-red-600 text-start text-sm max-w-sm mb-2 md:mb-3 mt-1 font-medium font-mukta">
              {inputState.errors.review}
            </p>
          )}
        </div>
        <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="flex flex-col items-center justify-center pb-4">
          <SubmitReview />
        </div>
      </form>
    </section>
  );
}

export default TestimonialForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {children}
    </div>
  );
};
