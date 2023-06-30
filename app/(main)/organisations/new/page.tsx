"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BreadCrumb, FormNav } from "components";
import { newOrganisation } from "@lib/dummy";
import React from "react";
import { useAuth } from "components/useAuth";

interface FormData {
  name: string;
  about: string;
  logo: File | null;
}

export default function Page() {
  const { accessToken } = useAuth();
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    about: "",
    logo: null,
  });

  const handleInputChange = (event: any) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(
        "https://vista-testing.herokuapp.com/api/admin/organisations",
        {
          name: formData.name,
          about: formData.about,
        },
        { headers }
      );

      console.log(response.data);
      // redirect to verify admin page
      push("/organisations");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newOrganisation} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New organisation</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleInputChange}
          />

          <input
            type="file"
            name="logo"
            className="file-input file-input-ghost bg-lightGray"
            onChange={handleInputChange}
          />

          {/* Form navigation  */}
          <FormNav rightBtnText="Create organisation" />
        </form>
      </main>
    </section>
  );
}

