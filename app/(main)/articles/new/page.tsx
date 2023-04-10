"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import {
  BreadCrumb,
  TextInput,
  Button,
} from "components/index";
import { newArticleCrumbs } from "@lib/dummy";
import React from "react";

export default function Page() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishDate, setPublishDate] = useState(new Date());

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "title") {
      setTitle(value);
    }
     if (name === "content") {
      setContent(value);
    }
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataWithFile = new FormData();
    try {
      const response = await axios.post("http://localhost:4000/admin/articles", formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // redirect to verify admin page
      window.location.href = "/articles";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newArticleCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New article</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray w-full max-w-xs"
              name="file"
              onChange={handleFileChange}
            />
          </div>

          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
            value={title}
          />

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            name="content"
            onChange={handleInputChange}
            value={content}
          ></textarea>

          <div className="flex w-full items-center">
            <DatePicker
              selected={publishDate}
              onChange={(date: Date) => setPublishDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Publish at"
              className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
            />
          </div>

          {/* Form navigation  */}

          <div className="w-full flex items-center justify-between px-1">
            <Button
              text="Cancel"
              onPress={() => window.history.back()}
              subtle
              extraStyles="md:w-1/5"
            />

            <Button
              extraStyles="md:w-1/5"
              onPress={() =>handleSubmit}
              text="Update article"
              primary
              type="submit"
            />
          </div>
        </form>
      </main>
    </section>
  );
}
