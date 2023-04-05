import { useRouter } from "next/router";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import { editCityCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Enabled");
  const [image, setImage] = useState(null);

  const handleUpdateCity = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("status", status);
      if (image) {
        formData.append("image", image);
      }
      const res = await axios.put("http://localhost:4000/api/cities/:id", formData);
      console.log(res.data);
      push("/cities");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={editCityCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit city</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleUpdateCity}
        >
          <TextInput
            inputType="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44] text-primary">{status}</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <button
                    className="text-primary"
                    onClick={() => setStatus("Enabled")}
                  >
                    Enabled
                  </button>
                </li>
                <li>
                  <button
                    className="text-primary"
                    onClick={() => setStatus("Disabled")}
                  >
                    Disabled
                  </button>
                </li>
                <li>
                  <button
                    className="text-primary"
                    onClick={() => setStatus("Coming soon")}
                  >
                    Coming soon
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <ImagePicker onChange={(file) => setImage(file)} />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Update city"
            // redirect to verify admin page
            rightBtnAction={handleUpdateCity}
          />
        </form>
      </main>
    </section>
  );
}
