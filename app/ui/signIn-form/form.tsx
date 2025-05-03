"use client";
import SubmitButton from "@/app/components/buttons/signIn";
import { Input } from "@/app/components/input/input";
import { cn } from "@/app/utils/utils";
import { getSignInData } from "@/app/utils/actions/signIn/actions";
import { useActionState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";

const initialFormState = {
  message: "",
  email: "",
};

function SignIn() {
  const [inputState, setInputState] = useActionState(
    getSignInData,
    initialFormState
  );
  return (
    <section className="mx-auto w-full max-w-md bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl my-12">
      <h2 className="text-2xl font-mukta font-medium text-slate-700">
        SignIn to Admin Panel.
      </h2>
      <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <form className="my-2" action={setInputState}>
        <div className="mb-4 flex flex-col space-y-3">
          <LabelInputContainer
            className={inputState?.errors?.email ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="email"
              className="text-slate-700 font-mukta font-semibold text-base"
            >
              Email
            </label>
            <Input
              name="email"
              placeholder="tyler@google.com"
              type="email"
              required
            ></Input>
          </LabelInputContainer>
          {inputState?.errors?.email && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium font-mukta">
              {inputState?.errors.email}
            </p>
          )}

          {!inputState?.message && (
            <p className="text-slate-700 font-medium text-center text-sm max-w-sm mb-2 font-mukta">
              We don&#39;t store passwords.
            </p>
          )}

          {inputState?.message && (
            <p className="text-green-600 font-medium text-center text-sm max-w-sm mb-2">
              {inputState.message}
            </p>
          )}
          <SubmitButton />
          <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>
      </form>
    </section>
  );
}

export default SignIn;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
