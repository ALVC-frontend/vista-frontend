"use client";

import { useRouter } from "next/router";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newOrganisation } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newOrganisation} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New organisation</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Name" />
          <TextInput inputType="text" placeholder="About" />

          <input
            type="file"
            className="file-input file-input-ghost bg-lightGray"
          />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create organisation"
            // redirect to verify admin page
            rightBtnAction={() => push("/organisations")}
          />
        </form>
      </main>
    </section>
  );
}
