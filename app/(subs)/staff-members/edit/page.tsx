"use client";

import axios from "axios";
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

  const handleSubmit = async (event: { preventDefault: () => void; target: any; }) => {
    event.preventDefault();

    const form = event.target;

    try {
      const response = await axios.put(
        "/api/staff-members",
        {
          id: form.id.value,
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          mobile: form.mobile.value,
          pin: form.pin.value,
        }
      );

      console.log(response.data);

      push("/staff-members/edit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={editStaffMemberCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Staff Member</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={handleSubmit}
        >
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
            name="id"
          />
          <TextInput
            inputType="text"
            placeholder="First name"
            value="Staff"
            name="firstName"
          />
          <TextInput
            inputType="text"
            placeholder="Last name"
            value="member"
            name="lastName"
          />
          <TextInput
            inputType="email"
            placeholder="Email"
            name="email"
          />

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
              name="mobile"
            />
          </div>
          <TextInput
            inputType="password"
            placeholder="PIN"
            value={2367}
            name="pin"
          />
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
