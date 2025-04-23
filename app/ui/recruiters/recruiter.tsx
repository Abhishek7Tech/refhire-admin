"use client";
import { HoverEffect } from "@/app/components/cards/card";
import { getRecruiteRequests } from "@/app/home/recruiters/actions";
import { useEffect, useState } from "react";
import { RecruiteRequest } from "@/app/utils/types/types";


export function Recruiters() {
  const [requests, setRequests] = useState<RecruiteRequest[] | []>([]);

  useEffect(() => {
    (async () => {
      const res = await getRecruiteRequests();
      console.log("Requests:", res);
      if (res.error) {
        console.log("Error fetching requests:", res.error);
        return;
      }
      const data = res.data as RecruiteRequest[] | [];
      if (data.length) {
        setRequests(data);
      }
      console.log("Data:", data);
    })();
  }, []);

  return (
    <div className="max-w-8xl z-0 mx-auto px-8">
      <HoverEffect items={requests} />
    </div>
  );
}
