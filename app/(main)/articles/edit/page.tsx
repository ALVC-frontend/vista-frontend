"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newArticleCrumbs } from "@lib/dummy";

interface FormData {
  title: string;
  content: string;
  categories: string[];
}

interface Article {
  id: number;
  title: string;
  content: string;
  publish_at: string;
  created_at: string;
  status: string;
  slug: string;
  // add any other properties here as needed
}

interface ArticlesResponse {
  title: string;
  content :string;
  publishedAt: string
  admin_articles: {
    breadcrumb: string;
  };
  admin_articles_path: {
    filters: {
      text: string;
    }
  };

  articles: Article[];
  paginate: Article[];
}

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log(id);
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publishDate, setPublishDate] = useState(new Date());

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categories: [],
  });
  const [title, setTitle] = useState<string>(formData.title);
  const [content, setContent] = useState<string>(formData.content);
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    async function fetchArticles() {

      try {
        const response = await axios.get<ArticlesResponse>(`http://localhost:4000/api/admin/articles/${id}`);
        setArticles(response.data.articles);
        setIsLoading(false);
        setTitle(response.data.title);
        setContent(response.data.content);
        setPublishedAt(response.data.publishedAt);
        console.log("Response status:", response.status);
        console.log(response.data);
        console.log(response.data.title);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);
  console.log("articles:", articles);

  const pageType= "Articles";

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
      const response = await axios.put(`http://localhost:4000/api/admin/articles/${id}`, {
        title,
        content,
        categories: formData.categories,
        publish_at: publishDate.toISOString()
      });
      console.log(response.data);
      router.push("/articles");
    } catch (error) {
      console.error(error);
    }
  };

const modules = {
  toolbar: {
    autoHeight: true
  }
};
  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newArticleCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit article</h2>

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
            placeholder={""}          />

          <ReactQuill
          value={content}
          onChange={setContent}
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
            rightBtnText="Edit article"
            rightBtnAction={handleSubmit}
          />
        </form>
      </main>
    </section>
  );
}
function push(arg0: string) {
  throw new Error("Function not implemented.");
}

