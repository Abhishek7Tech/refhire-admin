import React from "react";
import AdminMenu from "../ui/admin-menu/menu";

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex relative min-h-screen w-full justify-between bg-gradient-to-t from-cyan-100 to-emerald-200 items-start space-x-8">
      <AdminMenu />
      {children}
    </main>
  );
}
