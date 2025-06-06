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
      <div className="flex flex-col md:mx-auto w-full items-center justify-between min-h-screen max-h-screen overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scroll-smooth">
        {children}
      </div>
    </main>
  );
}
