import EditResume from "@/app/ui/edit-resume/form";
import { UUID } from "crypto";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EditResume resumeId={slug as UUID} />;
}
