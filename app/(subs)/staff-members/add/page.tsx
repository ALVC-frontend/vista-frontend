"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { addStaffMemberCrumb } from "@lib/dummy";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  pin: string;
}

export default function Page() {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);

  const rightBtnAction = async () => {
    const firstNameInput = document.querySelector<HTMLInputElement>('input[placeholder="First name"]');
    const firstName = firstNameInput ? firstNameInput.value : '';
    const lastNameInput = document.querySelector<HTMLInputElement>('input[placeholder="Last name"]');
    const lastName = lastNameInput ? lastNameInput.value : '';
    const emailInput = document.querySelector<HTMLInputElement>('input[placeholder="Email"]');
    const email = emailInput ? emailInput.value : '';
    const mobileNoInput = document.querySelector<HTMLInputElement>('input[placeholder="Mobile no"]');
    const mobileNo = mobileNoInput ? mobileNoInput.value : '';
    const pinInput = document.querySelector<HTMLInputElement>('input[placeholder="PIN"]');
    const pin = pinInput ? pinInput.value : '';

    const data: FormData = {
      firstName,
      lastName,
      email,
      mobileNo,
      pin,
    };

    try {
      const response = await axios.post("/api/staff-members", data);
      console.log(response.data);
      push("/staff-members/add");
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the staff member. Please try again.");
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={addStaffMemberCrumb} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Staff Member</h2>

        {error && <p className="text-red-500">{error}</p>}

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
            rightBtnAction={rightBtnAction}
          />
        </form>
      </main>
    </section>
  );
}
