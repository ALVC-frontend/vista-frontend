"use client";

import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { BreadCrumb, FormNav, ImagePicker, TextInput } from "@components/index";
import { editCityCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={editCityCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New city</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]">
          <TextInput inputType="text" placeholder="Name" />

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44] text-primary">Enabled</small>
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
                  <a className="text-primary">Enabled</a>
                </li>
                <li>
                  <a className="text-primary">Disabled</a>
                </li>
                <li>
                  <p className="text-primary">Coming soon</p>
                </li>
              </ul>
            </div>
          </div>

          <ImagePicker />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Update city"
            // redirect to verify admin page
            rightBtnAction={() => push("/cities")}
          />
        </form>
      </main>
    </section>
  );
}
