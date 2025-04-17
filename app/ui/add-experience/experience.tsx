import { Input } from "@/app/components/input/input";
function Experience({ id }: { id: string }) {
  return (
    <div className="flex space-x-2 w-full">
      <Input name="role" type="text" placeholder="Frontend Engineer"></Input>

      <Input name="from" type="month" className="w-min"></Input>
      <Input name="to" type="month" className="w-min"></Input>
    </div>
  );
}

export default Experience;
