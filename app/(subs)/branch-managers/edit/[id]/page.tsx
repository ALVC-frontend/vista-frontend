"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { branchManagerCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    assignedBranches: "Seeded branch 96",
    employeeID: 123,
    firstName: "Tahir",
    lastName: "Ramzan",
    email: "tahir@nappr.io",
    countryCode: "+1",
    mobileNo: 18398484848,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/branchManagers", formData);
      push("/admins/add/verify");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={branchManagerCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit Branch Manager</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={handleSubmit}
        >
          <TextInput
            inputType="text"
            name="assignedBranches"
            value={formData.assignedBranches}
            placeholder="Assigned branches"
            onChange={handleChange}
          />
          <TextInput
            inputType="number"
            name="employeeID"
            value={formData.employeeID}
            placeholder="Employee ID"
            onChange={handleChange}
          />
          <TextInput
            inputType="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First name"
            onChange={handleChange}
          />
          <TextInput
            inputType="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            onChange={handleChange}
          />
          <TextInput
            inputType="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />

          {/* Dropdown  */}

          <div className="flex items-center">
            <div className="dropdown">
              <div
                tabIndex={0}
                className="form-select bg-lightGray border-none p-3 rounded-md m-1"
              >
                {formData.countryCode}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-lightGray rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        countryCode: "+255",
                      }))
                    }
                  >
                    +255
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      setFormData((prevState) => ({
                        ...prevState,
                        countryCode: "+254",
                      }))


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
