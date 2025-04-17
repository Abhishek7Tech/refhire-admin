"use client";

import { Input } from "@/app/components/input/input";
import { cn } from "@/app/utils/utils";
import Experience from "../add-experience/experience";
import { useState } from "react";
import { motion } from "framer-motion";

interface WorkInterface {
  id: number;
  work: string;
}
interface ExperienceInterface {
  id: number;
  role: string;
  from: string;
  to: string;
  work: WorkInterface[] | [];
}

function Resume() {
  const [experience, setExperience] = useState<ExperienceInterface[]>([
    { id: 1, role: "", from: "", to: "", work: [{ id: 1, work: "" }] },
  ]);

  const increaseExpHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("EX", experience.length);
    const id = experience.length + 1;
    const addExperience = {
      id,
      role: "",
      from: "",
      to: "",
      work: [{ id: 1, work: "" }],
    };
    const updateExperience = [...experience, addExperience];
    setExperience(updateExperience);
  };

  const increaseWorkHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.currentTarget.parentElement?.id;
    
  };

  const decreaseWorkHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const decreaseExpHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (experience.length === 1) {
      return;
    }
    const id = +e.currentTarget.id;
    const updateExperience = experience.filter((ex) => ex.id !== id);
    setExperience(updateExperience);
  };

  return (
    <section className="mx-auto w-full max-w-max bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl my-12">
      <h2 className="text-2xl font-mukta font-medium text-slate-700">
        Add a Resume.
      </h2>
      <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <form className="my-2" action={() => {}}>
        <div className="mb-4 flex flex-col space-y-3">
          {/* <LabelInputContainer
            className={inputState.errors?.name ? "mb-0" : "mb-4"}
          > */}
          <LabelInputContainer>
            <label
              htmlFor="name"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Name
            </label>
            <Input name="name" placeholder="Tyler" type="text" required></Input>
          </LabelInputContainer>
          {/* {inputState.errors?.name && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.name}
            </p>
          )} */}

          <LabelInputContainer>
            <label
              htmlFor="email"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Email
            </label>
            <Input
              name="email"
              placeholder="tyler@google.com"
              type="email"
              required
            ></Input>
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              htmlFor="profession"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Profession
            </label>
            <Input
              name="profession"
              placeholder="Frontend Engineer"
              type="text"
              required
            ></Input>
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              htmlFor="country"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Country of Residence
            </label>
            <Input
              name="country"
              placeholder="U.S.A"
              type="text"
              required
            ></Input>
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              htmlFor="location"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Location
            </label>
            <Input
              name="location"
              placeholder="San Francisco, California"
              type="text"
              required
            ></Input>
          </LabelInputContainer>

          <LabelInputContainer>
            <fieldset className=" border-2 border-dashed border-green-300 p-4 rounded-md">
              <legend className="text-slate-700 font-mukta font-medium text-base">
                Job Preference:
              </legend>
              <div className="flex justify-start space-x-6">
                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="remote"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="remote"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Remote
                  </label>
                </div>

                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="hybrid"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="hybrid"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Hybrid
                  </label>
                </div>

                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="onSite"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="onSite"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    On-site
                  </label>
                </div>
              </div>
            </fieldset>
          </LabelInputContainer>
          <LabelInputContainer>
            <fieldset className=" border-2 border-dashed border-green-300 p-4 rounded-md ">
              <legend className="text-slate-700 font-mukta font-medium text-base">
                Open to Relocation:
              </legend>

              <div className="flex justify-start space-x-6">
                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="state"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="state"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Another State
                  </label>
                </div>

                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="country"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="country"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Another Country
                  </label>
                </div>
              </div>
            </fieldset>
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              htmlFor="salary"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Salary Expectations
            </label>
            <Input
              name="salary"
              placeholder="$60,000"
              type="text"
              required
            ></Input>
          </LabelInputContainer>

          <LabelInputContainer>
            <label
              htmlFor="experience"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Experience
            </label>
            {experience.map((ex) => (
              <div key={ex.id}>
                <Experience id={ex.id} />
                {ex.work.map((work) => (
                  <div
                    className="my-4 flex space-x-2 items-center"
                    key={work.id.toString()}
                  >
                    <Input
                      name="work"
                      placeholder="Developed dynamic dashboards using Next.js."
                      type="text"
                      required
                    ></Input>

                    <div className="w-fit flex items-center space-x-2 justify-center">
                      <motion.button
                        whileHover={{
                          scaleY: 1.1,
                        }}
                        type="button"
                        id={work.id.toString()}
                        onClick={(e) => increaseWorkHandler(e)}
                        className="text-slate-700 cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                      >
                        &#43;
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scaleY: 1.1,
                        }}
                        type="button"
                        id={ex.id.toString()}
                        className="text-slate-700 cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                        onClick={(e) => decreaseWorkHandler(e)}
                      >
                        &minus;
                      </motion.button>
                    </div>
                  </div>
                ))}
                <div className="w-full flex items-center space-x-2 justify-center mb-2 mt-4">
                  <motion.button
                    whileHover={{
                      scaleY: 1.1,
                    }}
                    type="button"
                    onClick={(e) => increaseExpHandler(e)}
                    className="text-slate-700 cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                  >
                    &#43;
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scaleY: 1.1,
                    }}
                    type="button"
                    id={ex.id.toString()}
                    className="text-slate-700 cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                    onClick={(e) => decreaseExpHandler(e)}
                  >
                    &minus;
                  </motion.button>
                </div>
              </div>
            ))}
          </LabelInputContainer>
        </div>
      </form>
    </section>
  );
}

export default Resume;

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
