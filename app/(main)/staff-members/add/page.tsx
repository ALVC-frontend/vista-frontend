"use client";

import { useRouter } from "next/navigation";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { addStaffMemberCrumb } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={addStaffMemberCrumb} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Staff Member</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          {/* <TextInput placeholder="Assigned Branches" inputType="text" /> */}

          {/* Edit assigned branches  */}
          <BadgeContainer editableBadges={[]} placeholder="Assigned Branches" />
          <TextInput inputType="number" placeholder="Employee ID" />
          <TextInput inputType="text" placeholder="First name" />
          <TextInput inputType="text" placeholder="Last name" />
          <TextInput inputType="email" placeholder="Email" />

          {/* Dropdown  */}

          <div className="flex items-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                className="form-select bg-lightGray border-none p-3 rounded-md m-1"
              >
                +1
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-52 shadow bg-lightGray rounded-box"
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
          <TextInput inputType="tel" placeholder="PIN" />
          <TextInput inputType="tel" placeholder="PIN confirmation" />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create Staff member"
            // redirect to verify admin page
            rightBtnAction={() => push("/staff-members/add")}
          />
        </form>
      </main>
    </section>
  );
}
