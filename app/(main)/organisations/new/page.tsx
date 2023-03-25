import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newOrganisation } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("file", file);

    try {
      const response = await axios.post("/api/organisations", formData);
      console.log(response.data);
      push("/organisations");
    } catch (error) {
      console.log(error);
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
          <TextInput
            inputType="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextInput
            inputType="text"
            placeholder="About"
            value={about}
            onChange={handleAboutChange}
          />

          <input
            type="file"
            className="file-input file-input-ghost bg-lightGray"
            onChange={handleFileChange}
          />

          {/* Form navigation  */}

          <FormNav rightBtnText="Create organisation" />
        </form>
      </main>
    </section>
  );
}
