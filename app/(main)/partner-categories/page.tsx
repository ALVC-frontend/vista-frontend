"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "components/index";
import React from "react";

interface Category {
  id: number;
  title: string;
  description: string;
  breadcrumb: string;
  link_to: string[];
  icon: string;
}

interface CategoryResponse {
  paginate: Category[];
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<CategoryResponse>("https://vista-testing.herokuapp.com/api/admin/partner_categories");
        setCategories(response.data.paginate);
        console.log("Response status:", response.status);
        console.log(response.data.paginate);
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
              text="New Partner category"
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
                    <p className="text-gray-500 text-sm mt-1">{category.description}</p>
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
