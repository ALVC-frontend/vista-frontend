"use client";
import axios from 'axios';
import { BreadCrumb, Button } from "@components/index";
import { newDataImports } from "@lib/dummy";
import React, { useState } from 'react';
import { useAuth } from "components/useAuth";

interface FormData {
  file: null;
  categories: number;
  visibility_conditions: number;
  questions: number;
  locking_conditions: number;
  [key: string]: any;
}

export default function Page() {
  const { accessToken } = useAuth();
  const [formData, setFormData] = useState({
    file: null,
    categories: 0,
    visibility_conditions: 0,
    questions: 0,
    locking_conditions: 0,
  });

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({ ...prevState, file }));
  };

  const handleCheckboxInputChange = (event: any) => {
    const { name } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: 1 }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const value = formData[key as keyof typeof formData];
        if (typeof value === 'number') {
          formDataToSend.append(`data_import[${key}]`, value.toString());
        } else if (value !== null) {
          formDataToSend.append(`data_import[${key}]`, value);
        }
      }
    }

    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      };

      const response = await axios.post(
        'https://vista-testing.herokuapp.com/api/admin/data_imports',
        formDataToSend,
        { headers }
      );

      console.log(response.data);
      window.location.href = "/imports/status";
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newDataImports} />
        <h2 className="font-semibold">Import new data</h2>
      </header>
      <main>
        <form className="w-[95%] md:w-3/5" onSubmit={handleSubmit}>
          <div className="">
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray rounded-md"
              name="file"
              onChange={handleFileInputChange}
            />
          </div>

          <small className="opacity-[0.44]">Categories</small>
          <div className="bg-lightGray p-4 rounded-md space-y-4">
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                name="visibility_conditions"
                onChange={handleCheckboxInputChange}
              />
              <small>Visibility conditions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                name="questions"
                onChange={handleCheckboxInputChange}
              />
              <small>Questions</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                type="checkbox"
                name="locking_conditions"
                onChange={handleCheckboxInputChange}
              />
              <small>Locking conditions</small>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button text="Import" primary extraStyles="w-1/5" type="submit" />
          </div>
        </form>
      </main>
    </section>
  );
}
