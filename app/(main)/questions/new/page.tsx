
"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { BreadCrumb, Button, TextInput } from "@components/index";
import { newQuestion } from "@lib/dummy";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  title: string;
}
interface Props {
  categories: Category[];
}

interface FormData {
  title: string;
  category_id: number;
  kind: string;
  intro: string;
}

interface ResponseData {
  categories: Category[];
}


const Categories = ({ categories, ...props }: Props & any): JSX.Element => {
  return (
    <select {...props} className="w-full h-12 p-3 bg-lightGray border-none rounded-md">
      <option value="">Select a category...</option>
      {categories.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  );
};


export default function Page() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [kind, setKind] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<ResponseData>(
          "https://vista-testing.herokuapp.com/api/admin/categories"
        );
        setCategories(response.data.categories);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategory(categoryId);
  };

  console.log("categories:", categories);
  const createQuestion = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data: FormData = {
      title: title,
      category_id: selectedCategory,
      kind: kind,
      intro: intro,
    };
    try {
      const response = await axios.post("https://vista-testing.herokuapp.com//api/admin/questions", data);
      console.log("Question created successfully", response.data);
      router.push("/questions");
    } catch (error) {
      console.error("Error creating question", error);
    }
  };


  return (
    <section className="pl-4">
      <header>
        <BreadCrumb crumbs={newQuestion} />
        <h2 className="font-semibold text-xl mb-4">New Question</h2>
      </header>
      <main className="">
        <form className="flex gap-x-4 flex-col-reverse md:flex-row gap-y-2" onSubmit={createQuestion}>
          <div className="flex flex-col gap-y-4 basis-2/3">
            <div className="flex w-full items-center">
              <div className="dropdown w-full">
              <Categories
               categories={categories}
               value={selectedCategory.toString()}
               onChange={handleCategoryChange}
               />
              </div>
            </div>

                <TextInput
                placeholder="Title"
                inputType="text"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />

               <div className="flex w-full items-center">
              <div className="dropdown w-full">
                <select
                  className="w-full bg-lightGray border-none p-3 rounded-md"
                  defaultValue=""
                  onChange={(event) => setKind(event.target.value)}
                >
                  <option  value={kind} disabled hidden>
                    Kind
                  </option>
                  <option>text</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="intro" id="" />
              <small>Intro</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" name="allow_note" id="" />
              <small>Allows note</small>
            </div>
            <TextInput inputType="text" placeholder="Note title" />
            <input
              type="file"
              className="file-input file-input-ghost bg-lightGray"
            />
            <div className="flex justify-between items-center bg-lightGray rounded-md p-2">
              <TextInput inputType="text" placeholder="Answers" />
              <Button
                text="Add answer"
                extraStyles="outline outline-1 outline-primary text-primary m-1"
              />
            </div>
            <div className="flex justify-between items-center bg-lightGray rounded-md p-2">
              <TextInput inputType="text" placeholder="Locking condition" />
              <Button
                text="Add condition"
                extraStyles="outline outline-1 outline-primary text-primary m-1"
              />
            </div>
            <div className="flex justify-end my-6">

              <Button
                text="Create Question"
                primary
                type="submit"
              />

            </div>
          </div>

          <div className="basis-1/3 flex flex-col gap-y-4 px-3 ">
            <h3 className="font-semibold flex items-center gap-x-2 text-primary">
              <span>Customize appearance </span>
              <PencilIcon className="w-4 h-4" />
            </h3>

            <div className="flex w-full items-center">
              <div className="dropdown w-full">
              <select
                  className="w-full bg-lightGray border-none p-3 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Text style
                  </option>
                  <option>Dark</option>
                  <option>light</option>
                  <option>Light-gold</option>
                  <option>Dark-gold</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small className="text-primary">Blur background</small>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" />
              <small className="text-primary">Background overlay</small>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}
function push(arg0: string) {
  throw new Error("Function not implemented.");
}

