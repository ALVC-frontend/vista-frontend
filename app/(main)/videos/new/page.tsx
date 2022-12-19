"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newVideoCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newVideoCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Video</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          <TextInput inputType="text" placeholder="Name" />
          <TextInput inputType="url" placeholder="URL" />
          {/* Add a warning or error componen here  */}

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
          ></textarea>

          {/* Dropdown  */}

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Organisation</small>
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
            editableBadges={[]}
            placeholder="Content categories"
          />

          <div className="">
            <label className="cursor-pointer flex gap-x-2 items-center">
              <input type="checkbox" className="" />
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
