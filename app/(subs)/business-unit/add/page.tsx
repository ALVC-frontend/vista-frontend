"use client";

import { useRouter } from "next/navigation";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { businessUnitCrumbs } from "@lib/dummy";
import React from "react";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={businessUnitCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Business Unit</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          <TextInput inputType="text" placeholder="Name" />

          {/* Form navigation  */}

          <FormNav
            extraStyles="mt-10"
            rightBtnStyles="font-thin text-sm md:w-2/5"
            rightBtnText="Create business unit"
            // redirect to verify admin page
            rightBtnAction={() => push("/business-unit/add")}
          />
        </form>
      </main>
    </section>
  );
}
