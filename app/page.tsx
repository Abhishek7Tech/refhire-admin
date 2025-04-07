import SignIn from "./ui/signIn-form/form";

export default function Home() {
  return (
    <>
      <main className="flex h-screen w-full flex-col justify-center bg-gradient-to-t from-cyan-100 to-emerald-200 items-center">
        <SignIn />
      </main>
    </>
  );
}
