"use client";

import SubmitButton from "@/app/components/buttons/verify";
import { Input } from "@/app/components/input/input";
import { UserContext } from "@/app/contexts/userContext";
import { cn } from "@/app/utils/utils";
import { getVerifyData, resendOtp } from "@/app/verify/actions";
import { useActionState, useCallback, useContext, useState } from "react";

const initialFormState = {
  message: "",
  otp: "",
  email: "",
};

function Verify() {
  const [inputState, setInputState] = useActionState(
    getVerifyData,
    initialFormState
  );
  const [resendError, setResendError] = useState<undefined | string>(undefined);

  const [pending, setPending] = useState<boolean>(false);

  const userContext = useContext(UserContext);

  if (!userContext) {
    return;
  }

  const resendOtpHanlder = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPending(true);
      setResendError(undefined);
      if (!userContext?.email) return;
      console.log("Email", userContext.email);
      const res = await resendOtp(userContext.email);
      setResendError(res?.errors.otp);
      setPending(false);
    },
    [userContext.email]
  );
  return (
    <section className="mx-auto w-full max-w-md bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl my-12">
      <h2 className="text-2xl font-mukta font-medium text-slate-700 leading-loose">
        Verify your email
      </h2>
      <form className="my-2" action={setInputState}>
        <input type="hidden" name="email" readOnly value={userContext.email} />
        <div className="mb-4 flex flex-col space-y-3">
          <LabelInputContainer className={inputState.errors?.otp ? "" : "mb-4"}>
            <Input
              name="otp"
              className="text-center"
              placeholder="Enter OTP"
              type="text"
            />
          </LabelInputContainer>
          {inputState.errors?.otp && (
            <p className="text-red-600 text-center text-sm max-w-sm mb-2 mt-1 font-medium">
              {inputState.errors.otp}
            </p>
          )}

          {resendError && (
            <p className="text-red-600 text-center text-sm max-w-sm mb-2 mt-1 font-medium">
              {resendError}
            </p>
          )}

          {!inputState.message && (
            <p className="text-green-600 font-medium text-center text-sm max-w-sm  mb-2">
              Please check your email for the verification code.
            </p>
          )}

          {inputState.message && (
            <p className="text-green-600 font-medium text-center text-sm max-w-sm mb-2">
              {inputState.message}
            </p>
          )}

          <SubmitButton />
          <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

          <p className="text-slate-700 font-medium text-center text-sm max-w-sm mt-3 mb-2">
            Didn&apos;t receive the OTP?{" "}
            <button
              className="text-blue-700 cursor-pointer"
              onClick={(e) => resendOtpHanlder(e)}
              disabled={pending}
            >
              Try again.
            </button>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Verify;

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
