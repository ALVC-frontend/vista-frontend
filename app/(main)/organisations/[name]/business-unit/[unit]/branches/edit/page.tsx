"use client";

import Link from "next/link";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";

export default function Page({ params }: any) {
  const links: BreadLink[] = [
    {
      link: "/organisations",
      textToDisplay: "Organisations",
    },
    {
      link: `/organisations/${params.name}`,
      textToDisplay: `${params.name}`,
    },
    {
      link: `/organisations/${params.name}/business-unit`,
      textToDisplay: "Business units",
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}`,
      textToDisplay: `${convertFirstCapitals(params.unit.split("-")).join(
        " "
      )}`,
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}/branches`,
      textToDisplay: "Branches",
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}/branches/edit`,
      textToDisplay: "Edit Branch",
    },
  ];

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={links} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Branch</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          <BadgeContainer
            editableBadges={["Hotels"]}
            placeholder="Categories"
          />
          <TextInput
            inputType="text"
            placeholder="Name"
            value="1 Hotel Brookly Bridge"
          />

          <TextInput
            inputType="text"
            placeholder="Branch info"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, laboriosam?"
          />
          <TextInput
            inputType="email"
            placeholder="Email"
            value="abcd@gmail.com"
          />
          <TextInput
            inputType="tel"
            placeholder="Telephone"
            value="123-456-789"
          />
          <TextInput
            inputType="url"
            placeholder="Booking url"
            value="https://abcd.com"
          />
          <FormNav rightBtnText="Next" />
        </form>
      </main>
    </section>
  );
}
