import { Input } from "@/app/components/input/input";
function Experience({
  id,
  experienceHandler,
  fromDateHandler,
  toDateHandler,
}: {
  id: string;
  experienceHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fromDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex space-x-2 w-full">
      <Input
        id={id}
        name="role"
        type="text"
        onChange={(e) => experienceHandler(e)}
        placeholder="Frontend Engineer"
      ></Input>

      <Input
        id={id}
        type="month"
        onChange={(e) => fromDateHandler(e)}
        className="w-min"
        defaultValue={""}
      ></Input>
      <Input
        id={id}
        type="month"
        onChange={(e) => toDateHandler(e)}
        className="w-min"
        defaultValue={""}
      ></Input>
    </div>
  );
}

export default Experience;
