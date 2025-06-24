"use client";
import { RecruiteCard } from "@/app/components/cards/recruite";
import { getRecruiteRequests } from "@/app/home/recruiters/actions";
import { useEffect, useState } from "react";
import { RecruiteRequest } from "@/app/utils/types/types";
import Error from "@/app/home/error";
import Loading from "@/app/home/loading";
import Heading from "../heading/heading";
export function Recruiters() {
  const [recruiteRequests, setRecruiteRequests] = useState<RecruiteRequest[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      return;
    }
    setLoading(true);

    (async () => {
      try {
        const res = await getRecruiteRequests();
        if (res.error) {
          setError(res.error);
          setLoading(false);
          return;
        }
        const data = res.data as RecruiteRequest[] | [];
        if (data.length) {
          setRecruiteRequests(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);

        setError("Something went wrong.");
        return;
      }
    })();
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={{ message: error }} reset={"/home/recruiters"} />;
  }
  return (
    <section className="md:pl-[72px] lg:mx-auto max-w-8xl z-0 mx-auto px-1.5 xs:px-3 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-12 xs:py-10">
        <Heading title="Recruiters" />
        {recruiteRequests.map((req, idx) => (
          <RecruiteCard idx={idx} key={req.id} recruiteData={req} />
        ))}
      </div>
    </section>
  );
}
