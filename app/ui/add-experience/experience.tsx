import { Input } from "@/app/components/input/input";
function Experience({id}: {id: number}) {
  return (
    <div className="flex space-x-2">
      <Input name="role" type="text" placeholder="Frontend Engineer"></Input>
      <Input name="from" type="month" className="w-fit"></Input>
      <Input name="to" type="month" className="w-fit"></Input>
    </div>
  );
}

export default Experience;
