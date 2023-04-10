"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { crumbs } from "@lib/dummy";

export default function Page() {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    mobileNumber: "",
  });
  const { push } = useRouter();

  const handleFormChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://vista-testing.herokuapp.com/admin/api/admins", formData);
      if (response.status === 201) {
        push("/admins/add/verify");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={crumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Admin</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"
          onSubmit={handleFormSubmit}
        >
          <TextInput
            inputType="number"
            placeholder="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleFormChange}
          />
          <TextInput
            inputType="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
          />
          <TextInput
            inputType="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
          />
          <TextInput
            inputType="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
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
                  <a onClick={() => setFormData((prevData) => ({ ...prevData, countryCode: "+255" }))}>+255</a>
                </li>
                <li>
                  <a onClick={() => setFormData((prevData) => ({ ...prevData, countryCode: "+254" }))}>+254</a>
                </li>
              </ul>
            </div>
            <TextInput
              inputType="tel"
              placeholder="Mobile no"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleFormChange}
            />
          </div>

          {/* Form navigation  */}

          <FormNav rightBtnText="Next" />
        </form>
      </main>
    </section>
  );
}
