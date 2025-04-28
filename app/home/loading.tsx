import Image from "next/image";
import LoadingAnimation from "@/public/loading-page.gif";
export default function Loading() {
  return (
    <div className="flex min-h-screen mx-auto items-center justify-center">
      <Image
        src={LoadingAnimation}
        height={42}
        width={42}
        alt="loading screen"
      />
    </div>
  );
}
