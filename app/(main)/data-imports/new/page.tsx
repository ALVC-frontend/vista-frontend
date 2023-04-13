"use client";
import axios from 'axios';
import { BreadCrumb, Button } from "@components/index";
import { newDataImports } from "@lib/dummy";
import React, { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    file: null,
    categories: 0,
    visibility_conditions: 0,
    questions: 0,
    locking_conditions: 0,
  });

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({ ...prevState, file }));
  };

  const handleCheckboxInputChange = (event) => {
    const { name } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: 1 }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(`data_import[${key}]`, formData[key]);
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/admin/data_imports',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log(response.data);
      window.location.href = "/data-imports/status";
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
