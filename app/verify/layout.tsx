import React from "react";

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col justify-center bg-gradient-to-t from-cyan-100 to-emerald-200 items-center">
      {children}
    </main>
  );
}