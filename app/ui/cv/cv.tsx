"use client";
import { ResumeCard } from "@/app/components/cards/cv";
import { getCVData } from "@/app/home/cv/actions";
import { CV as CVInterface } from "@/app/utils/types/types";
import { useEffect, useState } from "react";

export function CV() {
  const [cvData, setCvData] = useState<CVInterface[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getCVData();
      if (res.error) {
        console.log(res.error);
        return;
      }
      const data = res.data as CVInterface[] | [];
      if (data.length) {
        setCvData(data);
      }
    })();
  }, []);
  return (
    <div className="max-w-8xl z-0 mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10">
        {cvData.map((cv, idx) => (
          <ResumeCard key={cv.id} idx={idx} data={cv} />
        ))}
      </div>
    </div>
  );
}
