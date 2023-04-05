"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { branchManagerCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();
  const [assignedBranches, setAssignedBranches] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const addBranchManager = async () => {
    try {
      const response = await axios.post("/api/branch-managers", {
        assignedBranches,
        employeeId,
        firstName,
        lastName,
        email,
        mobileNumber: countryCode + mobileNumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={branchManagerCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Branch Manager</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={(event) => {
            event.preventDefault();
            addBranchManager();
          }}
        >
          <BadgeContainer
            editableBadges={assignedBranches}
            placeholder="Assigned Branches"
            onBadgesChange={setAssignedBranches}
          />
          <TextInput
            inputType="number"
            placeholder="Employee ID"
            value={employeeId}
            onValueChange={setEmployeeId}
          />
          <TextInput
            inputType="text"
            placeholder="First name"
            value={firstName}
            onValueChange={setFirstName}
          />
          <TextInput
            inputType="text"
            placeholder="Last name"
            value={lastName}
            onValueChange={setLastName}
          />
          <TextInput
            inputType="email"
            placeholder="Email"
            value={email}
            onValueChange={setEmail}
          />
          <div className="flex items-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                className="form-select bg-lightGray border-none p-3 rounded-md m-1"
              >
                {countryCode}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-52 shadow bg-lightGray rounded-box"
              >
                <li>
                  <a
                    onClick={() => {
                      setCountryCode("+255");
                    }}
                  >
                    +255
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setCountryCode("+254");
                    }}
                  >
                    +254
                  </a>
                </li>
              </ul>
            </div>
            <TextInput
              inputType="tel"
              placeholder="Mobile no"
              value={mobileNumber}
              onValueChange={setMobileNumber}
            />
          </div>
          {/* Form navigation  */}

          <FormNav
            rightBtnText="Next"
            // redirect to verify admin page
            rightBtnAction={() => push("/branch-managers")}
          />
        </form>
      </main>
    </section>
  );
}
