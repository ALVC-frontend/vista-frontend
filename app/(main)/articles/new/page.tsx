"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newArticleCrumbs } from "@lib/dummy";
import React from "react";

interface FormData {
  title: string;
  content: string;
  categories: string[];
}

export default function Page() {
  const [publishDate, setPublishDate] = useState(new Date());
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categories: [],
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      // handle file input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.files[0],
      }));
    } else if (type === "checkbox") {
      // handle checkbox input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.checked,
      }));
    } else if (type === "date") {
      // handle date input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: new Date(value).toISOString(),
      }));
    } else {
      // handle all other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://vista-testing.herokuapp.com//api/admin/articles", {
        title: formData.title,
        content: formData.content,
        categories: formData.categories, // assuming categories is an array
        publish_at: publishDate.toISOString() // convert date to ISO string format
      });
      console.log(response.data);
      // redirect to verify admin page
      push("/articles");
    } catch (error) {
      console.error(error);
    }
  };
  const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
  });


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
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            inputType="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={"Title"}
            />

         <ReactQuill
          value={content}
          onChange={(content) => setContent(content)}
          placeholder="Description"
          className="p-3 bg-lightGray outline-none rounded-md"
          style={{
          minHeight: '300px',
          border: '1px solid #d1d5db',
          borderRadius: '0.25rem',
          padding: '0.5rem',
          fontSize: '1rem',
          color: '#4b5563',
          lineHeight: '1.5',
          background:'white',
          }}
          />

          <BadgeContainer
            editableBadges={[]}
            placeholder="Content categories"
            onChange={handleInputChange}
          />

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

          <FormNav
            rightBtnText="Update article"
            type="submit"
          />
        </form>
      </main>
    </section>
  );
}
