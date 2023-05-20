"use client";
import { FormEvent, useState, useEffect  } from "react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { BreadCrumb, Button, TextInput } from "components/index";
import { newCategories } from "@lib/dummy";
import Link from "next/link";
import React from "react";
import  Loader  from "@components/Loader";
import ids from "components/ids";

interface Category {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    ancestry: null | string;
    image: string;
    initial:boolean;
    // Add other properties of the category here
  }

  interface ResponseData {
    categories: Category[];
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    ancestry: null | string;
    image: string;
    description: string;
    initial:boolean;
  }


export default function Page(): JSX.Element{
  // Define state variables for each input field
  const categoryId = ids();
  console.log(categoryId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("");
  const [initial, setInitial] = useState(false);
  const [visibilityConditions, setVisibilityConditions] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<ResponseData>(
            `http://localhost:4000/api/admin/categories/${categoryId}`
        );
        setCategories(response.data.categories);
        setIsLoading(false);
        setTitle(response.data.title);
        setDescription(response.data.description);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section>
   </section>
);
}
