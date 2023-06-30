"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BreadCrumb, Button } from "@components/index";
import { statusCategories } from "@lib/dummy";
import React from "react";
import  Loader  from "@components/Loader";
import { useAuth } from "components/useAuth";

interface Category {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  ancestry: null | string;
  image: string;
  initial:boolean;
}

interface ResponseData {
  categories: Category[];
}

export default function Page() {
  const { accessToken } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get<ResponseData>(
          "https://vista-testing.herokuapp.com/api/admin/categories",
          { headers: headers }
        );

        setCategories(response.data.categories);
        setIsLoading(false);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, [accessToken]);

  console.log("categories:", categories);

  const pageType= "Categories";

  if (isLoading) {
    return <Loader variable={pageType} />
  }


  return (
    <section className="pl-3">
      <header>
        <BreadCrumb crumbs={statusCategories} />
        <div className="flex justify-between items-center px-4">
          <h2 className="font-semibold text-xl">Categories</h2>
          <Link href="/categories/new">
            <Button text="New category" primary />
          </Link>
        </div>
      </header>
      <main className="mt-3">
  {Array.isArray(categories) && categories.length > 0 ? (
    <>
      {categories
        .filter((category) => category.initial)
        .map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]"
          >
            <Image src={category.image} alt={category.title} />
            <p className="text-primary">
              ⭐️ {category.title}
            </p>
          </div>
        ))}
      {categories
        .filter((category) => !category.initial)
        .map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]"
          >
            <Image src={category.image} alt={category.title} />
            <p className="text-primary">
              {category.title}
              <br/>
              <Link href={`/categories/edit/${category.id}`} passHref>
                      edit
              </Link> &nbsp;
              <Link href={`/categories/edit/${category.id}`} passHref>
                      view category
              </Link>
            </p>
          </div>
        ))}
    </>
  ) : (
    <div>No categories found.</div>
  )}
</main>

    </section>
  );
}
