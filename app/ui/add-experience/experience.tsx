"use client";
import { Input } from "@/app/components/input/input";
import { useEffect, useState } from "react";
function Experience({
  id,
  experienceHandler,
  fromDateHandler,
  toDateHandler,
  currentHandler,
  cityHandler,
  countryHandler,
  remoteLocHandler,
  current,
  remoteLoc,
}: {
  id: string;
  current: boolean;
  remoteLoc: boolean;
  experienceHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cityHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  countryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fromDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  remoteLocHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  useEffect(() => {
    console.log("current", current);
  }, [current]);
  return (
    <div className="flex flex-col space-x-2 w-full space-y-3">
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="role"
          className="text-slate-700 font-mukta font-medium text-[15px]"
        >
          Job Title
        </label>
        <Input
          id={id}
          name="role"
          type="text"
          onChange={(e) => experienceHandler(e)}
          placeholder="Frontend Engineer"
        ></Input>
      </div>

      <div className="flex justify-between space-x-4">
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="city"
            className="text-slate-700 font-mukta font-medium text-[15px]"
          >
            City
          </label>
          <Input
            disabled={remoteLoc}
            id={id}
            type="text"
            onChange={(e) => cityHandler(e)}
            className="w-min"
            placeholder="Optional"
            defaultValue={""}
          ></Input>
        </div>
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="end-date"
            className="text-slate-700 font-mukta font-medium text-[15px]"
          >
            Country
          </label>
          <Input
            disabled={remoteLoc}
            id={id}
            type="text"
            onChange={(e) => countryHandler(e)}
            className="w-min"
            placeholder="Optional"
            defaultValue={""}
          ></Input>
        </div>

        <div className="flex space-x-2 place-self-end items-center h-10 py-1 px-2 w-full bg-gray-50 rounded-md">
          <Input
            id={id}
            onChange={(e) => remoteLocHandler(e)}
            type="checkbox"
            value={"Remote"}
            className="w-4 h-4 rounded-sm cursor-pointer"
          ></Input>
          <label
            htmlFor="current"
            className="text-slate-700 font-mukta font-medium text-[15px] text-nowrap"
          >
            Remote
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="space-y-1 flex flex-col w-full">
          <label
            htmlFor="start-date"
            className="text-slate-700 font-mukta font-medium text-[15px]"
          >
            Start Date
          </label>
          <Input
            id={id}
            type="month"
            onChange={(e) => fromDateHandler(e)}
            className="w-min"
            defaultValue={""}
          ></Input>
        </div>
        <div className="space-y-1 flex flex-col w-full">
          <label
            htmlFor="end-date"
            className="text-slate-700 font-mukta font-medium text-[15px]"
          >
            End Date
          </label>
          <Input
            disabled={current}
            id={id}
            type="month"
            onChange={(e) => toDateHandler(e)}
            className="w-min"
            defaultValue={""}
          ></Input>
        </div>
        <div className="flex space-x-2 place-self-end items-center h-10 py-1 px-2 w-full bg-gray-50 rounded-md">
          <Input
            id={id}
            onChange={(e) => currentHandler(e)}
            type="checkbox"
            value={"present"}
            className="w-4 h-4 rounded-sm cursor-pointer"
          ></Input>
          <label
            htmlFor="current"
            className="text-slate-700 font-mukta font-medium text-[15px] text-nowrap"
          >
            Present (Current)
          </label>
        </div>
      </div>
    </div>
  );
}

export default Experience;
