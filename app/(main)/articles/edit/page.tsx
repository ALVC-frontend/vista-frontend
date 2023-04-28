"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import axios from "axios";
import {useRouter } from 'next/navigation';

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publishDate, setPublishDate] = useState(new Date());
  const { push } = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categories: [],
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get<ArticlesResponse>("https://vista-testing.herokuapp.com/api/admin/articles/${id}");
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
      const response = await axios.post("https://vista-testing.herokuapp.com/api/admin/articles", {
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

          <input
            type="text"
            placeholder="Title"
            name="title"
            defaultValue={title}
            onChange={handleInputChange}
          />

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            name="content"
            defaultValue={content}
            onChange={handleInputChange}
          ></textarea>

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
