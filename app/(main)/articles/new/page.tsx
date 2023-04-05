"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import {
  BreadCrumb,
  TextInput,
  Button,
} from "@components/index";
import { newArticleCrumbs } from "@lib/dummy";

export default function Page() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/admin/articles", formData);
      console.log(response.data);
      // redirect to verify admin page
      window.location.href = "/articles";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newArticleCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New article</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray w-full max-w-xs"
              name="file"
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            inputType="text"
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
          />

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            name="description"
            onChange={handleInputChange}
          ></textarea>

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Publish at</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <a>11/12/2022</a>
                </li>
                <li>
                  <a>10/12/2022</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form navigation  */}

          <div className="w-full flex items-center justify-between px-1">
            <Button
              text="Cancel"
              onPress={() => window.history.back()}
              subtle
              extraStyles="md:w-1/5"
            />

            <Button
              extraStyles="md:w-1/5"
              onPress={handleSubmit}
              text="Update article"
              primary
              type="submit"
            />
          </div>
        </form>
      </main>
    </section>
  );
}
