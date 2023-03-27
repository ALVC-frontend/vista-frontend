"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
  slug: string;
  description: string;
  content: string;
  published_at: string;
  // Add other properties of the article here
}

interface ArticlesResponse {
  title: string;
  admin_articles: {
    breadcrumb: string;
    content: {
      hero_right: {
        new_article_url: string;
      };
      articles: Article[];
      paginate: string;
    };
  };
}

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get<ArticlesResponse>("http://localhost:4000/admin/articles");
        setArticles(response.data.admin_articles.content.articles);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);

  console.log("articles:", articles);

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
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <p>{article.title}</p>
                    <Link href={`/articles/${article.id}`}>
                      Read More
                    </Link>

                  </td>
                  <td>{article.status}</td>
                  <td>{article.publish_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}

