"use client";
import { RecruiteCard } from "@/app/components/cards/recruite";
import { getRecruiteRequests } from "@/app/home/recruiters/actions";
import { useEffect, useState } from "react";
import { RecruiteRequest } from "@/app/utils/types/types";
import Error from "@/app/home/error";
export function Recruiters() {
  const [recruiteRequests, setRecruiteRequests] = useState<RecruiteRequest[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      return;
    }
    (async () => {
      try {
        const res = await getRecruiteRequests();
        console.log("Requests:", res);
        if (res.error) {
          setError(res.error);
          return;
        }
        const data = res.data as RecruiteRequest[] | [];
        if (data.length) {
          setRecruiteRequests(data);
        }
      } catch (error) {
        setError("Something went wrong.");
        return;
      }
    })();
  }, [error]);
  if (error) {
    return <Error error={{ message: error }} reset={() => setError(null)} />;
  }
  return (
    <div className="max-w-8xl z-0 mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10">
        {recruiteRequests.map((req, idx) => (
          <RecruiteCard idx={idx} key={req.id} recruiteData={req} />
        ))}
      </div>
    </div>
  );
}
