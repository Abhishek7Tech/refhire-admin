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
        name="from"
        type="month"
        onChange={(e) => fromDateHandler(e)}
        className="w-min"
      ></Input>
      <Input
        id={id}
        name="to"
        type="month"
        onChange={(e) => toDateHandler(e)}
        className="w-min"
      ></Input>
    </div>
  );
}

export default Experience;
