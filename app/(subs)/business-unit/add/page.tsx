"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { businessUnitCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("/business-unit", { name });
      // Redirect to business unit page
      push(`/business-unit/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={businessUnitCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Business Unit</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={handleSubmit}
        >
          <TextInput
            inputType="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Form navigation  */}
          <FormNav
            extraStyles="mt-10"
            rightBtnStyles="font-thin text-sm md:w-2/5"
            rightBtnText="Create business unit"
            type="submit"
          />
        </form>
      </main>
    </section>
  );
}
