"use client";

import { Input } from "@/app/components/input/input";
import { cn } from "@/app/utils/utils";
import Experience from "../add-experience/experience";
import { useActionState, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatMonth } from "@/app/utils/format-date/date";
import SubmitButton from "@/app/components/buttons/resume";
import { getResumeData } from "@/app/home/resume/actions";
import { Categories } from "@/app/utils/categories/categories";
import { IconCircleArrowDown, IconCircleArrowUp } from "@tabler/icons-react";
import { ExperienceInterface } from "@/app/utils/types/types";



const initialFormState = {
  name: "",
  email: "",
  profession: "",
  yoe: 0,
  country: "",
  location: "",
  preference: [],
  relocation: [],
  salary: "",
  experience: [],
  admin: "",
  tags: [],
  message: "",
};

function Resume() {
  const [inputState, setInputState] = useActionState(
    getResumeData,
    initialFormState
  );
  const [current, setCurrent] = useState<{ id: number; present: boolean }[]>([
    {
      id: 1,
      present: false,
    },
  ]);

  useEffect(() => {
    console.log("InputState", current[0]);
  }, []);
  const [experience, setExperience] = useState<ExperienceInterface[]>([
    {
      id: 1,
      role: "",
      from: "",
      to: "",
      city: "",
      country: "",
      work: [{ id: 1, work: "" }],
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [categoriesTags, setCategoriesTags] = useState<
    {
      id: string;
      name: string;
      subCategories: string[];
      showSubCategories: boolean;
    }[]
  >(Categories);

  const currentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.currentTarget.value;
    console.log("Value", value);
    const inputId = e.currentTarget.id;
    if (!inputId) {
      return;
    }
    const updateExperience = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, to: value } : ex
    );
    setExperience(updateExperience);
    const updateCurrent = current.map((ex) =>
      ex.id === +inputId ? { ...ex, present: !ex.present } : ex
    );

    setCurrent(updateCurrent);
  };
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
      city: "",
      country: "",
      work: [{ id: 1, work: "" }],
    };
    const addCurrent = { id, present: false };
    const updateExperience = [...experience, addExperience];
    const updateCurrent = [...current, addCurrent];
    setExperience(updateExperience);
    setCurrent(updateCurrent);
  };

  const showCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const updateCategories = categoriesTags.map((category) =>
      category.id === id ? { ...category, showSubCategories: true } : category
    );
    setCategoriesTags(updateCategories);
  };

  const hideCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    const updateCategories = categoriesTags.map((category) =>
      category.id === id ? { ...category, showSubCategories: false } : category
    );
    setCategoriesTags(updateCategories);
  };

  const addExperienceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputId = e.currentTarget.id;
    const value = e.currentTarget.value;
    if (!inputId || value.length < 3) {
      return;
    }

    const updateExperince = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, role: value } : ex
    );
    setExperience(updateExperince);
  };

  const fromDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    if (!value) {
      return;
    }
    const month = formatMonth(value);
    if (!month) {
      return;
    }
    const updateExperience = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, from: month } : ex
    );
    setExperience(updateExperience);
  };

  const toDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    if (!value) {
      return;
    }
    const month = formatMonth(value);
    if (!month) {
      return;
    }
    const updateExperience = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, to: month } : ex
    );
    setExperience(updateExperience);
  };

  const countryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    if (!value) {
      return;
    }
    const updateExperience = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, country: value } : ex
    );
    setExperience(updateExperience);
  };
  const cityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    if (!value) {
      return;
    }
    const updateExperience = experience.map((ex) =>
      ex.id === +inputId ? { ...ex, city: value } : ex
    );
    setExperience(updateExperience);
  };
  const increaseWorkHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const experienceId = e.currentTarget.parentElement?.id;
    if (!experienceId) {
      return;
    }
    const updateWork = experience.map((ex) =>
      ex.id === +experienceId
        ? { ...ex, work: [...ex.work, { id: ex.work.length + 1, work: "" }] }
        : ex
    );

    console.log("Work-increase", updateWork);

    setExperience(updateWork);
  };

  const decreaseWorkHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const experienceId = e.currentTarget.parentElement?.id;
    if (!experienceId) {
      return;
    }

    console.log("EX", experience);
    const workId = +e.currentTarget.id;
    console.log("WORKID", workId);
    const updateWork = experience.map((ex) =>
      ex.id === +experienceId && ex.work.length > 1
        ? { ...ex, work: ex.work.filter((work) => work.id !== workId) }
        : ex
    );
    setExperience(updateWork);
  };
  const subCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const subcategory = e.currentTarget.id;
    if (selectedCategory?.includes(subcategory)) {
      const updateSelectedCategory = selectedCategory.filter(
        (category) => category !== subcategory
      );
      setSelectedCategory(updateSelectedCategory);
      return;
    }
    setSelectedCategory((prev) => [...prev, subcategory]);
  };

  const workInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const workId = e.currentTarget.id;
    const value = e.currentTarget.value;
    const experienceId = e.currentTarget.parentElement?.id;

    if (!experienceId) {
      return;
    }

    const updateWork = experience.map((ex) =>
      ex.id === +experienceId
        ? {
            ...ex,
            work: ex.work.map((work) =>
              work.id === +workId ? { ...work, work: value } : work
            ),
          }
        : ex
    );
    setExperience(updateWork);
  };

  const decreaseExpHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (experience.length === 1) {
      return;
    }
    const id = +e.currentTarget.id;
    const updateExperience = experience.filter((ex) => ex.id !== id);
    const updateCurrent = current.filter((ex) => ex.id !== id);
    setExperience(updateExperience);
    setCurrent(updateCurrent);
  };

  return (
    <section className="mx-auto w-full max-w-max bg-white/25 border border-white/30 shadow-lg backdrop-blur-md p-4 rounded-2xl my-12">
      <h2 className="text-2xl font-mukta font-medium text-slate-700">
        Add a Resume.
      </h2>
      <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <form className="my-2" action={setInputState}>
        <div className="mb-4 flex flex-col space-y-3">
          <LabelInputContainer
            className={inputState.errors?.name ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="name"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Name
            </label>
            <Input name="name" placeholder="Tyler" type="text" required></Input>
          </LabelInputContainer>
          {inputState.errors?.name && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.name}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.email ? "mb-0" : "mb-4"}
          >
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
          {inputState.errors?.email && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.email}
            </p>
          )}
          <LabelInputContainer
            className={inputState.errors?.profession ? "mb-0" : "mb-4"}
          >
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
          {inputState.errors?.profession && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.profession}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.yoe ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="yoe"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Years of Experience
            </label>
            <Input name="yoe" placeholder="3" type="number" required></Input>
          </LabelInputContainer>
          {inputState.errors?.yoe && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.yoe}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.country ? "mb-0" : "mb-4"}
          >
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
          {inputState.errors?.country && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.country}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.location ? "mb-0" : "mb-4"}
          >
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
          {inputState.errors?.location && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.location}
            </p>
          )}
          <LabelInputContainer
            className={inputState.errors?.preference ? "mb-0" : "mb-4"}
          >
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
              {inputState.errors?.preference && (
                <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
                  {inputState.errors.preference}
                </p>
              )}
            </fieldset>
          </LabelInputContainer>
          <LabelInputContainer
            className={inputState.errors?.relocation ? "mb-0" : "mb-4"}
          >
            <fieldset className=" border-2 border-dashed border-green-300 p-4 rounded-md ">
              <legend className="text-slate-700 font-mukta font-medium text-base">
                Open to Relocation:
              </legend>

              <div className="flex justify-start space-x-6">
                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="anotherState"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="anotherState"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Another State
                  </label>
                </div>

                <div className="flex space-x-2 items-center py-1 px-2 bg-gray-50 rounded-md">
                  <Input
                    name="anotherCountry"
                    type="checkbox"
                    className="w-4 h-4 rounded-sm cursor-pointer"
                  ></Input>
                  <label
                    htmlFor="anotherCountry"
                    className="text-slate-700 font-mukta font-medium text-base"
                  >
                    Another Country
                  </label>
                </div>
              </div>
              {inputState.errors?.relocation && (
                <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
                  {inputState.errors.relocation}
                </p>
              )}
            </fieldset>
          </LabelInputContainer>

          <LabelInputContainer
            className={inputState.errors?.salary ? "mb-0" : "mb-4"}
          >
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
          {inputState.errors?.salary && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.salary}
            </p>
          )}
          <LabelInputContainer
            className={inputState.errors?.experience ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="experience"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Experience
            </label>
            {
              experience.map((ex) => (
                <div
                  key={ex.id}
                  className="border-2 border-dashed border-green-300 p-4 rounded-md mb-3"
                >
                  <Experience
                    current={current[ex.id - 1]?.present}
                    currentHandler={currentHandler}
                    cityHandler={cityHandler}
                    countryHandler={countryHandler}
                    fromDateHandler={fromDateHandler}
                    experienceHandler={addExperienceHandler}
                    toDateHandler={toDateHandler}
                    id={ex.id.toString()}
                  />
                  {ex.work.map((work) => (
                    <div
                      className="my-4 flex space-x-2 items-center "
                      key={work.id.toString()}
                      id={ex.id.toString()}
                    >
                      <Input
                        onChange={(e) => workInputHandler(e)}
                        id={work.id.toString()}
                        placeholder="Developed dynamic dashboards using Next.js."
                        type="text"
                        required
                        autoComplete="off"
                      ></Input>

                      <motion.button
                        whileHover={{
                          scaleY: 1.1,
                        }}
                        type="button"
                        id={work.id.toString()}
                        onClick={(e) => increaseWorkHandler(e)}
                        className="text-slate-700 w-fit cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                      >
                        &#43;
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scaleY: 1.1,
                        }}
                        type="button"
                        id={work.id.toString()}
                        className="text-slate-700 w-fit cursor-pointer rounded-sm bg-emerald-200 py-1.5 px-3"
                        onClick={(e) => decreaseWorkHandler(e)}
                      >
                        &minus;
                      </motion.button>
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
          {experience && (
            <input
              type="hidden"
              name="experience"
              value={JSON.stringify(experience)}
            ></input>
          )}
          {inputState.errors?.experience && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.experience}
            </p>
          )}
          <LabelInputContainer
            className={inputState.errors?.tags ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="tags"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Select Category
            </label>

            <div className="flex flex-col gap-2 border-2 border-dashed border-green-300 p-4 rounded-md mb-3">
              {categoriesTags.map((category) => {
                return (
                  <div key={category.id} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-slate-700 font-mukta text-sm font-semibold">
                        {category.name}
                      </h4>
                      {category.showSubCategories ? (
                        <motion.button
                          onClick={(e) => hideCategoryHandler(e)}
                          id={category.id}
                          className="cursor-pointer"
                        >
                          <IconCircleArrowUp className="h-5 w-5 shrink-0 text-slate-700" />
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={(e) => showCategoryHandler(e)}
                          id={category.id}
                          className="cursor-pointer"
                        >
                          <IconCircleArrowDown className="h-5 w-5 shrink-0 text-slate-700" />
                        </motion.button>
                      )}
                    </div>

                    <AnimatePresence initial={false} mode="wait">
                      {category.showSubCategories && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 0.12, delay: 0.2 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.12, delay: 0.3 },
                          }}
                          className="flex gap-1 flex-wrap max-w-lg"
                          layoutId={`${category.subCategories}-${category.id}`}
                          key={`${category.subCategories}-${category.id}`}
                        >
                          {category.subCategories.map((subCategory) => {
                            return (
                              <button
                                onClick={(e) => subCategoryHandler(e)}
                                key={subCategory}
                                id={subCategory}
                                className={`w-fit cursor-pointer text-xs px-1 py-0.5 rounded-lg ${
                                  selectedCategory.includes(subCategory)
                                    ? "bg-emerald-200 border-2 border-gray-50"
                                    : "bg-gray-50"
                                } text-slate-700`}
                              >
                                {subCategory}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </LabelInputContainer>
          <input
            type="hidden"
            name="tags"
            value={JSON.stringify(selectedCategory)}
          ></input>
          {inputState.errors?.tags && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.tags}
            </p>
          )}

          <LabelInputContainer
            className={inputState.errors?.admin ? "mb-0" : "mb-4"}
          >
            <label
              htmlFor="admin"
              className="text-slate-700 font-mukta font-medium text-base"
            >
              Submitted by
            </label>
            <Input
              name="admin"
              placeholder="Abhishek"
              type="text"
              required
            ></Input>
          </LabelInputContainer>
          {inputState.errors?.admin && (
            <p className="text-red-600 px-3 text-start text-sm max-w-sm mb-4 mt-1 font-medium">
              {inputState.errors.admin}
            </p>
          )}
          {inputState.message && (
            <p className="text-green-600 px-3 text-center text-sm mb-4 mt-1 font-medium">
              {inputState.message}
            </p>
          )}

          <SubmitButton />
          <div className="mt-4 mb-2 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
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
