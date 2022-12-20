"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import { editPartnerCategories } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={editPartnerCategories} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Editing Travel</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Name" value="Travel" />

          <ImagePicker />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Update partner category"
            // redirect to verify admin page
            rightBtnAction={() => push("/cities")}
          />
        </form>
      </main>
    </section>
  );
}
