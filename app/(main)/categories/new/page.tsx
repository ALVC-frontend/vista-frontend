"use client";
import { FormEvent, useState } from "react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { BreadCrumb, Button, TextInput } from "components/index";
import { newCategories } from "@lib/dummy";
import Link from "next/link";
import React from "react";

export default function Page(): JSX.Element{
  // Define state variables for each input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("");
  const [initial, setInitial] = useState(false);
  const [visibilityConditions, setVisibilityConditions] = useState("");

  // Define an async function to handle form submission
  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      // Send a POST request to the server with the form data
      const response = await axios.post("https://vista-testing.herokuapp.com/api/admin/categories", {
        title,
        description,
        parent,
        initial,
        visibilityConditions,
      });
      console.log(response.data);
      // Redirect to the categories page after successful creation
      // You can use the router from Next.js or Link component to navigate to the categories page
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newCategories} />
        <h2 className="font-semibold text-xl mb-4">New Category</h2>
      </header>
      <main className="">
        <form className="flex gap-x-4 flex-col-reverse md:flex-row gap-y-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4 basis-2/3">
            <TextInput
              placeholder="Title"
              inputType="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextInput
              placeholder="Description"
              inputType="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex w-full items-center">
              <div className="dropdown w-full">
                <div
                  tabIndex={0}
                  className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
                >
                  <small className="opacity-[0.44]">Parent</small>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
                >
                  <li>
                    <a className="">option</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="" id="" checked={initial} onChange={(e) => setInitial(e.target.checked)} />
              <small>Initial</small>
            </div>
            <small className="opacity-[0.44]">
              This will make the category display first in the top carousel
              view.{" "}
            </small>

            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray"
            />
                <div className="flex justify-between items-center bg-lightGray rounded-md p-2">
          <input type="text" placeholder="Visibility conditions" onChange={(e) => setVisibilityConditions(e.target.value)} value={visibilityConditions} />
          <Button
            text="Add condition"
            extraStyles="outline outline-1 outline-primary text-primary m-1"
          />
        </div>
        <div className="flex justify-end my-6">
          <Link href="/categories">
          <Button
          text="Create Category"
          primary
          onClick={() => {handleSubmit();}}
/>
          </Link>
        </div>
      </div>

      <div className="basis-1/3 flex flex-col gap-y-4 px-3 ">
        <h3 className="font-semibold flex items-center gap-x-2 text-primary">
          <span>Customize appearance </span>
          <PencilIcon className="w-4 h-4" />
        </h3>

        <div className="flex w-full items-center">
          <div className="dropdown w-full">
            <div
              tabIndex={0}
              className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
            >
              <small className="opacity-[0.44]">Text style</small>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
            >
              <li>
                <a className="">Style 1</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  </main>
</section>
);
}
