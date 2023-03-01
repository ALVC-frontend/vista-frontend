"use client";

import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newArticleCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newArticleCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New article</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <div className="flex w-full">
            {/* <TextInput inputType="text" placeholder="No file selected" /> */}
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray w-full max-w-xs"
            />
          </div>
          <TextInput inputType="text" placeholder="Title" />
          {/* Add a warning or error component here  */}

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
          ></textarea>

          <BadgeContainer
            editableBadges={[]}
            placeholder="Content categories"
          />
          {/* Dropdown  */}

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

          <FormNav
            rightBtnText="Update article"
            // redirect to verify admin page
            rightBtnAction={() => push("/articles")}
          />
        </form>
      </main>
    </section>
  );
}
