"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSvg from "@/public/loading-page.gif";
import { getUsersActivity } from "@/app/utils/actions/dashboard/actions";
const REQUEST_TABLE = ["No.", "Date", "Sender", "Recipient", "Recipient Email"];

function ActivityTable() {
  const [requests, setRequests] = useState<
    | {
        created_at: string;
        sender: string;
        receiver: string;
        receiver_email: string;
        id: string;
      }[]
    | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const res = await getUsersActivity();
        if (res.error) {
          setLoading(false);
          setError(res.error);
          return;
        }

        if (res.status !== 200) {
          setError("Something went wrong.");
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

  if (error) {
    return (
      <div className="bg-white/25 max-w-md border  border-white/30 shadow-lg rounded-2xl backdrop-blur-md p-4 w-full mx-auto">
        <h2 className="text-slate-700 font-mukta text-lg xs:text-xl md:text-2xl font-medium">
          Recent Activity
        </h2>
        <p className="text-sm sm:text-base lg:text-lg font-mukta text-center font-medium text-slate-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/25 border mx-auto md:min-w-md border-white/30 shadow-lg rounded-2xl backdrop-blur-md p-1.5 xs:p-4 sm:w-fit h-fit">
      <h2 className="text-slate-700 font-mukta text-lg xs:text-xl md:text-2xl font-medium">
        Recent Activity
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
        <div
          className={`my-2  ${
            requests?.length !== 0 && "border border-teal-400"
          } shadow-lg rounded-xl overflow-x-scroll [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scroll-smooth`}
        >
          {requests && requests.length ? (
            <motion.table className="table-auto w-full">
              <motion.thead>
                <motion.tr>
                  {REQUEST_TABLE.map((req, idx) => (
                    <motion.th
                      key={idx}
                      className="text-slate-700 font-mukta text-sm sm:text-base lg:text-lg border-b border-teal-400 px-2 py-0.5 xs:py-1 md:leading-relaxed"
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
                      <td className="text-slate-700 text-sm sm:text-base font-mukta text-center px-2 font-medium">
                        {idx + 1}
                      </td>
                      <td className="text-slate-700 text-sm sm:text-base font-mukta text-center px-2 font-medium">
                        {formatDate}
                      </td>

                      <td className="text-slate-700 text-sm sm:text-base font-mukta text-center px-2 font-medium">
                        {req.sender}
                      </td>
                      <td className="text-slate-700 text-sm sm:text-base font-mukta text-center px-2 font-medium">
                        {req.receiver}
                      </td>
                      <td className="text-slate-700 text-sm sm:text-base font-mukta text-center px-2 font-medium">
                        {req.receiver_email}
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </motion.table>
          ) : (
            <p className="text-slate-700 font-mukta text-sm sm:text-base lg:text-lg text-center px-2 font-medium ">
              No recent Activity.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ActivityTable;
