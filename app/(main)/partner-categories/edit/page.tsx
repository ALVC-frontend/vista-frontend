"use client";

import { useRouter } from "next/router";

import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import { editPartnerCategories } from "@lib/dummy";
import axios from "axios";


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
  rightBtnAction={async () => {
    const name = document.getElementById("name-input").value;
    const image = document.getElementById("image-input").files[0];
    const id = "123"; // replace with actual partner category ID
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    try {
      const response = await axios.put(`/api/partner-categories/${id}`, formData);
      console.log(response.data);
      push("/partner-categories");
    } catch (error) {
      console.error(error);
    }
  }}
/>
        </form>
      </main>
    </section>
  );
}
