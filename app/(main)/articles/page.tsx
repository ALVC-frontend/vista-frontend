"use client"
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import axios from "axios";

export default function Page() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await axios.get("/api/articles");
      setArticles(response.data);
    }

    fetchArticles();
  }, []);

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Articles</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search articles"
            className="outline-none border-none"
          />
        </div>
        <div className="">
          <Link href="/articles/new">
            <Button
              text="New article"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Articles table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Title</th>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Published at</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>
                  <p>{article.title}</p>
                  <Link href={`/articles/${article.slug}`}>
                    <a>Read More</a>
                  </Link>
                </td>
                <td>{article.status}</td>
                <td>{article.published_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
