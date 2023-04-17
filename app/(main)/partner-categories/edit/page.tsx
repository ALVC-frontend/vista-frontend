"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import axios from "axios";
import { editPartnerCategories } from "@lib/dummy";
export default function Page() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const id = "replace-with-actual-category-id";

  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    //formData.append("image", image);

    try {
      const response = await axios.put(`https://vista-testing.herokuapp.com//api/partner-categories/${id}`, formData);
      console.log(response.data);
      push("/partner-categories");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={editPartnerCategories} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Editing {name}</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]" onSubmit={handleSubmit}>
          <TextInput
            inputType="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <ImagePicker  />

          {/* Form navigation  */}

          <FormNav rightBtnText="Update partner category" rightBtnAction={handleSubmit} />
        </form>
      </main>
    </section>
  );
}
