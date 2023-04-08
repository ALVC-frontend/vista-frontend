"use client";
import BreadCrumb from "@components/breadcrumb";
import FormNav from "@components/form-nav";
import TextInput from "@components/text-input";
import { crumbs } from "@lib/dummy";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admins", {
        firstName,
        lastName,
        email,
        mobileNo,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function push(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={crumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Admin</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={handleSubmit}
        >
          <TextInput
            inputType="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            inputType="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            inputType="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <TextInput
              inputType="tel"
              placeholder="Mobile no"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
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
