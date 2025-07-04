"use client";
import { ResumeCard } from "@/app/components/cards/cv";
import { getCVData } from "@/app/home/cv/actions";
import Error from "@/app/home/error";
import Loading from "@/app/home/loading";
import { CV as CVInterface } from "@/app/utils/types/types";
import { useEffect, useState } from "react";
import Heading from "../heading/heading";

export function CV() {
  const [cvData, setCvData] = useState<CVInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (error) {
      return;
    }
    setLoading(true);

    (async () => {
      try {
        const res = await getCVData();
        if (res.error) {
          setError(res.error);
          setLoading(false);
          return;
        }

        const data = res.data as CVInterface[] | [];
        if (data.length) {
          setCvData(data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Something went wrong.");
        return;
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!loading && cvData.length === 0) {
    return (
      <section className="mx-auto z-0 flex flex-col items-center justify-center min-h-screen min-w-auto xs:min-w-sm max-w-xl p-2 sm:p-4">
        <div className="bg-white/25 place-self-center self-center align-middle border border-white/30 shadow-lg backdrop-blur-md px-4 py-2 rounded-2xl w-fit">
          <h1 className="text-slate-700 text-lg sm:text-xl text-center sm:text-start">
            No CVs found. 😔
          </h1>
        </div>
      </section>
    );
  }
  if (error) {
    return <Error error={{ message: error }} reset={"/home/cv"} />;
  }
  return (
    <section className="md:pl-[72px] lg:mx-auto max-w-8xl z-0 mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 py-10">
        <Heading title={"Resumes"} />

        {cvData.map((cv, idx) => (
          <ResumeCard key={cv.id} idx={idx} data={cv} />
        ))}
      </div>
    </section>
  );
}
