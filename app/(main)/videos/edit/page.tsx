"use client";

import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { editVideoCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={editVideoCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Video</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[70%]">
          <TextInput inputType="text" placeholder="Name" value="Sample Video" />
          <TextInput
            inputType="url"
            placeholder="URL"
            value="https://edehbdgygrtgvryyr/5454637?s=cbdbcufvbufvbf"
          />
          {/* Add a warning or error component here  */}

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            value="Placeholder seeded video for development purposes"
          ></textarea>

          {/* Dropdown  */}

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Vista</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <a>Vista</a>
                </li>
                <li>
                  <a>Nappr</a>
                </li>
              </ul>
            </div>
          </div>
          <BadgeContainer
            editableBadges={["Men's fashion"]}
            placeholder="Content categories"
          />

          <div className="">
            <label className="cursor-pointer flex gap-x-2 items-center">
              <input type="checkbox" className="" checked />
              <span className="label-text text-primary">Published</span>
            </label>
          </div>
          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create video"
            // redirect to verify admin page
            rightBtnAction={() => push("/videos")}
          />
        </form>
      </main>
    </section>
  );
}
