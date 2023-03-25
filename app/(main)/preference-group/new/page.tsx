"use client";

import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { newPreferenceGroup } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newPreferenceGroup} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Preference Group</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Title" />

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Questions</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <input type="text" className="w-full" />
                </li>
                <li>
                  <a className="">How often do you stay at hotel?</a>
                </li>
                <li>
                  <a className="">
                    What are your main reasons to visit a hotel?
                  </a>
                </li>
                <li>
                  <p className="">
                    Who will accompany you at a visit to a hotel?
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create group"
            // redirect to verify admin page
            rightBtnAction={() => push("/preference-group")}
          />
        </form>
      </main>
    </section>
  );
}
