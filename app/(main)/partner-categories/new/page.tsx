"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newPartnerCategories } from "@lib/dummy";
import React from "react";
import axios from "axios";
import { useAuth } from "components/useAuth";
interface FormData {
  title: string;
  content: string;
  categories: string[];
}
export default function Page() {
  const { accessToken } = useAuth();
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categories: [],
  });

  const handleInputChange = (event: any) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      // handle file input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    }
    else {
      // handle all other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

;
const handleSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault();
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(
      "https://vista-testing.herokuapp.com/api/admin/partner_categories",
      {
        title: formData.title,
      },
      { headers }
    );

    console.log(response.data);
    push("/partner-categories");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newPartnerCategories} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New partner category</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
        <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleInputChange}
         />


          <input
            type="file"
            className="file-input file-input-ghost bg-lightGray"
            name="file"
            onChange={handleInputChange}
          />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create partner category"
            // redirect to verify admin page
           // rightBtnAction={() => push("/partner-categories")}
           type="submit"
          />
        </form>
      </main>
    </section>
  );
}
