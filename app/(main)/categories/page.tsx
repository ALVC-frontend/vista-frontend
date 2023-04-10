"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { BreadCrumb, Button } from "@components/index";
import { statusCategories } from "@lib/dummy";
import React from "react";

interface Category {
  id: number;
  name: string;
  image: string;
  // Add other properties of the category here
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<Category[]>("https://vista-testing.herokuapp.com/admin/categories");
        setCategories(response.data);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  console.log("categories:", categories);

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
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]"
            >
              <Image src={category.image} alt={category.name} />
              <p className="text-primary">{category.name}</p>
            </div>
          ))
        ) : (
          <div>No categories found.</div>
        )}
      </main>
    </section>
  );
}
