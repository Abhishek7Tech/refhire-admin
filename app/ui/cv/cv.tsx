"use client";
import { ResumeCard } from "@/app/components/cards/cv";
import { getCVData } from "@/app/home/cv/actions";
import Error from "@/app/home/error";
import Loading from "@/app/home/loading";
import { CV as CVInterface } from "@/app/utils/types/types";
import { useEffect, useState } from "react";

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
        console.log("DATA", data);
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
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={{ message: error }} reset={() => setError(null)} />;
  }
  return (
    <section className="max-w-8xl z-0 mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10">
        {cvData.map((cv, idx) => (
          <ResumeCard key={cv.id} idx={idx} data={cv} />
        ))}
      </div>
    </section>
  );
}
