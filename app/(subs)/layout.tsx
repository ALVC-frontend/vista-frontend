"use client";

import { SideBar } from "@components/index";
import { subs } from "@lib/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <section className="w-full h-[100vh] max-h-[100vh] grid grid-cols-5">
        <SideBar sidebarItems={subs} />
        <div className="col-span-5 md:col-span-4 bg-background h-[100vh] overflow-y-auto overflow-x-hidden max-h-[100vh]">
          {children}
        </div>
      </section>
    </main>
  );
}
