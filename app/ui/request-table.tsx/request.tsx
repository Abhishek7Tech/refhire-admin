"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSvg from "@/public/loading-page.gif";
import { getRecruiteRequests } from "@/app/utils/actions/dashboard/actions";
const REQUEST_TABLE = ["No.", "Status", "Role", "Progress", "Date Submitted"];

function RequestTable() {
  const [requests, setRequests] = useState<
    | {
        created_at: string;
        application_status: boolean;
        position: string;
      }[]
    | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const res = await getRecruiteRequests();
        setError(null);
        if (res.error) {
          console.log("Error", res.error);
          setLoading(false);
          setError(res.error);
          return;
        }

        if(res.status !== 200) {
          setError("Something went wrong.")
          return; 
        }
        if (res.data) {
          setRequests(res.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Something went wrong.");
        setLoading(false);
      }
    })();
  }, []);

  if(error) {
    return (
      <div className="bg-white/25 min-w-lg border border-white/30 shadow-lg rounded-2xl backdrop-blur-md p-4">
      <h2 className="text-slate-700 font-mukta text-2xl font-medium">
        Recent Requests
      </h2>
      <p className="text-lg font-mukta font-medium text-red-600">
          {error}
        </p>
      </div>
    )
  }
 
  return (
    <div className="bg-white/25 min-w-lg border border-white/30 shadow-lg rounded-2xl backdrop-blur-md p-4 w-fit">
      <h2 className="text-slate-700 font-mukta text-2xl font-medium">
        Recent Requests
      </h2>
   
      {loading ? (
        <div className="flex flex-col justify-center items-center">
        <Image
          className="mx-auto"
          src={LoadingSvg}
          height={32}
          width={32}
          alt="loading-spinner"
        ></Image>
        </div>
      ) : (
        <div className="my-2  border border-teal-400 shadow-lg rounded-xl overflow-hidden">
          <motion.table className="">
            <motion.thead>
              <motion.tr>
                {REQUEST_TABLE.map((req, idx) => (
                  <motion.th
                    key={idx}
                    className="text-slate-700 font-mukta text-lg border-b border-teal-400 px-2 py-1 leading-relaxed "
                  >
                    {req}
                  </motion.th>
                ))}
              </motion.tr>
            </motion.thead>
            <motion.tbody>
              {requests?.map((req, idx) => {
                const date = new Date(req.created_at);
                const formatDate = new Intl.DateTimeFormat("en-GB").format(
                  date
                );
                return (
                  <motion.tr
                    whileHover={{
                      backgroundColor: "#bbf7d0",
                      cursor: "pointer",
                    }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.3,
                    }}
                    key={idx}
                    className={` ${
                      idx + 1 !== requests.length &&
                      "border-b border-teal-400 rounded-2xl"
                    }`}
                  >
                    <td className="text-slate-700 text-base font-mukta text-center px-2 font-medium">
                      {idx + 1}
                    </td>
                    <td className="text-slate-700 font-mukta text-base text-center px-2 font-medium">
                      {req.application_status ? "🟢" : "🔴"}
                    </td>
                    <td className="text-slate-700 font-mukta text-base text-center px-2 font-medium">
                      {req.position}
                    </td>
                    <td className="text-slate-700 font-mukta text-base text-center px-2 font-medium ">
                      {req.application_status ? "Approved" : "Pending"}
                    </td>
                    <td className="text-slate-700 font-mukta text-base text-center px-2 font-medium ">
                      {formatDate}
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </motion.table>
        </div>
      )}
    </div>
  );
}

export default RequestTable;
