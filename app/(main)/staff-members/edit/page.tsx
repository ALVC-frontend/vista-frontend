"use client";

import { useRouter } from "next/navigation";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { editStaffMemberCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={editStaffMemberCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Staff Member</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5">
          {/* <TextInput placeholder="Assigned Branches" inputType="text" /> */}

          {/* Edit assigned branches  */}
          <BadgeContainer
            editableBadges={["Developer Branch", "Booked tickets"]}
            placeholder="Assigned Branches"
          />
          <TextInput
            inputType="number"
            placeholder="Employee ID"
            value={632587}
          />
          <TextInput inputType="text" placeholder="First name" value="Staff" />
          <TextInput inputType="text" placeholder="Last name" value="member" />
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
            <TextInput
              inputType="tel"
              placeholder="Mobile no"
              value={123456789}
            />
          </div>
          <TextInput inputType="password" placeholder="PIN" value={2367} />
          <TextInput
            inputType="password"
            placeholder="PIN confirmation"
            value={2367}
          />

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Update staff member"
            // redirect to verify admin page
            rightBtnAction={() => push("/staff-members/edit")}
          />
        </form>
      </main>
    </section>
  );
}
