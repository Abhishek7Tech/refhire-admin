export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div className="text-black text-3xl">Edit Resume: {slug}</div>
}