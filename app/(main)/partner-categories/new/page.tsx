"use client";

import { useRouter } from "next/navigation";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newPartnerCategories } from "@lib/dummy";
import React from "react";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newPartnerCategories} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New partner category</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Title" />

          <input
            type="file"
            className="file-input file-input-ghost bg-lightGray"
          />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create partner category"
            // redirect to verify admin page
            rightBtnAction={() => push("/partner-categories")}
          />
        </form>
      </main>
    </section>
  );
}
