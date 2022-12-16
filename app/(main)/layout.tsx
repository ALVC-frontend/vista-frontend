"use client";

import { SideBar } from "@components/index";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subs = [
    {
      name: "Organizations",
      links: [
        {
          displayName: "Business Unit",
          link: "/business-unit",
        },
      ],
    },
    {
      name: "Staff",
      links: [
        {
          displayName: "Staff Members",
          link: "/staff-members",
        },
        {
          displayName: "Branch Managers",
          link: "/branch-managers",
        },
        {
          displayName: "Admins",
          link: "/admins",
        },
      ],
    },
  ];

  return (
    <main>
      <section className="w-full grid grid-cols-5">
        <SideBar sidebarItems={subs} />
        <div className="col-span-5 md:col-span-4 bg-background h-[100vh] overflow-y-auto overflow-x-hidden max-h-[100vh]">
          {children}
        </div>
      </section>
    </main>
  );
}
