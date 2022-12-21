"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BreadCrumb, Button } from "@components/index";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";

export default function Layout({ params }: any) {
  const { unit, segments } = params;
  const businessUnit = convertFirstCapitals(unit.split("-")).join(" ");
  const title = convertFirstCapitals(segments.split("-")).join(" ");

  console.log(params);

  const initialCrumbs: BreadLink[] = [
    {
      link: "/business-unit/",
      textToDisplay: "Business Units",
    },
    {
      link: `/business-unit/${unit}`,
      textToDisplay: `${businessUnit}`,
    },
    {
      link: `/business-unit/${unit}/${segments}`,
      textToDisplay: `${title}`,
    },
  ];

  const path = usePathname();

  const [crumbs, setCrumbs] = useState(initialCrumbs);

  const subUnits = [
    {
      link: "branches",
      display: "Branches",
      child: ["Kanso branch 44", "Kijitonyama branch 43", "New york branch"],
    },
    {
      link: "roles",
      display: "Roles",
      child: ["Test Roles"],
    },

    {
      link: "request-types",
      display: "Request types",
      child: ["Laundry services", "Car services"],
    },
  ];

  return (
    <section className="w-full">
      <header className="ml-4">
        <BreadCrumb crumbs={crumbs} />
        <div className="flex w-full justify-between items-center">
          <h2 className="font-semibold basis-1/4">{title}</h2>
          <div className="flex items-center gap-x-4 w-3/5">
            <Button
              text="New request type"
              primary
              extraStyles="text-sm w-4/5"
            />
            <Button
              text="Edit business unit"
              primary
              extraStyles="text-sm w-4/5"
            />
          </div>
        </div>
      </header>
      <main className="ml-1">
        <div className="tabs bg-lightGray py-3 mt-4 gap-x-10">
          {subUnits.map(({ link, display }) => {
            const activeLink = `/business-unit/${unit}/${link}`;
            const isActive = path === activeLink;
            return (
              <Fragment key={link}>
                <Link href={activeLink}>
                  <small
                    className={`tab ${
                      isActive
                        ? "tab-active text-primary font-semibold underline underline-offset-4"
                        : ""
                    }`}
                  >
                    {display}
                  </small>
                </Link>
              </Fragment>
            );
          })}
        </div>

        <div className="">
          <div className="bg-white py-3 mb-[1px]">
            <p className="text-black font-semibold ml-4">Laundry Services</p>
          </div>
          <div className="bg-white py-3 mb-[1px]">
            <p className="text-black font-semibold ml-4">Car services</p>
          </div>
        </div>
      </main>
    </section>
  );
}
