"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { BreadCrumb, Button } from "@components/index";
import { statusCategories } from "@lib/dummy";
import beauty from "@assets/images/beauty.png";
import beauty1 from "@assets/images/beauty2.png";
import beauty2 from "@assets/images/beauty3.png";
import beauty3 from "@assets/images/beauty4.png";
import beauty4 from "@assets/images/beauty4.png";

export default function Page() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    }

    fetchCategories();
  }, []);

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
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]"
          >
            <Image src={category.image} alt={category.name} />
            <p className="text-primary">{category.name}</p>
          </div>
        ))}
      </main>
    </section>
  );
}
