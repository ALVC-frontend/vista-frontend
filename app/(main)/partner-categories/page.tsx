"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "components/index";
import React from "react";

interface Category {
  id: number;
  title: string;
  breadcrumb: string;
  link_to: string[];
  icon: string;
}
interface CategoryResponse {
  paginate: {
    id: number;
    title: string;
    position: number;
    created_at: string;
    updated_at: string;
  }[];
}
export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<Category[]>("http://localhost:4000/admin/partner_categories");
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
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Partner Categories</h3>
        </div>
        {/* <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search city"
            className="outline-none border-none"
          />
        </div> */}
        <div className="">
          <Link href="/partner-categories/new">
            <Button
              text="New category"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Categories table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Category details</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <Link href={`/partner-categories/${category.id}`}>
                      <p className="text-primary">{category.title}</p>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={1}>No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
