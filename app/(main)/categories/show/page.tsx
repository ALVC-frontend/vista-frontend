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
import { useAuth } from "components/useAuth";

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
  const { accessToken } = useAuth();
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
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get<ResponseData>(
          `https://vista-testing.herokuapp.com/api/admin/categories/${categoryId}`,
          { headers }
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
  }, [accessToken]);


  return (
    <section>
   </section>
);
}
