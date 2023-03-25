"use client";

import { useRouter } from "next/router";
import axios from "axios";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newPartnerCategories } from "@lib/dummy";

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
        rightBtnAction={async () => {
        const title = document.getElementById("title-input").value;
        const fileInput = document.getElementById("file-input");
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", file);
    try {
      const response = await axios.post("/api/partner-categories", formData);
      console.log(response.data);
      push("/partner-categories");
    } catch (error) {
      console.error(error);
    }
  }}
/>     </form>
      </main>
    </section>
  );
}
