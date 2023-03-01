"use client";

import { useRouter } from "next/router";

import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import { BreadLink } from "types/crumbs";

export default function Page({ params }: any) {
  const { push } = useRouter();

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
      link: `/organisations/${params.name}/edit`,
      textToDisplay: "Edit organisation",
    },
  ];

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={links} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Editing organisation</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Name" value="Kanso" />
          <TextInput
            inputType="text"
            placeholder="About"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <ImagePicker />

          {/* Form navigation  */}

          <FormNav
            leftBtnText="Delete"
            rightBtnText="Update organisation"
            // redirect to verify admin page
            rightBtnAction={() => push("/cities")}
          />
        </form>
      </main>
    </section>
  );
}
