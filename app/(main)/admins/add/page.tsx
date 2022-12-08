"use client";

import { useRouter } from "next/navigation";

import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { crumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={crumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Admin</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          <TextInput inputType="number" placeholder="Employee ID" />
          <TextInput inputType="text" placeholder="First name" />
          <TextInput inputType="text" placeholder="Last name" />
          <TextInput inputType="email" placeholder="Email" />

          {/* Dropdown  */}

          <div className="flex items-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                className="form-select bg-lightGray border-none py-3 rounded-md m-1"
              >
                +1
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-lightGray rounded-box w-52"
              >
                <li>
                  <a>+255</a>
                </li>
                <li>
                  <a>+254</a>
                </li>
              </ul>
            </div>
            <TextInput inputType="tel" placeholder="Mobile no" />
          </div>

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Next"
            // redirect to verify admin page
            rightBtnAction={() => push("/admins/add/verify")}
          />
        </form>
      </main>
    </section>
  );
}
