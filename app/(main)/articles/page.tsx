"use client";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { BreadCrumb, Button } from "components/index";
import axios from "axios";
import  Loader  from "@components/Loader";

interface Article {
  id: number;
  title: string;
  content: string;
  publish_at: string;
  created_at: string;
  status: string;
  slug: string;
  // add any other properties here as needed
}

interface ArticlesResponse {
  title: string;
  admin_articles: {
    breadcrumb: string;
  };
  admin_articles_path: {
    filters: {
      text: string;
    }
  };

  articles: Article[];
  paginate: Article[];
}

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get<ArticlesResponse>("http://localhost:4000/api/admin/articles");
        setArticles(response.data.articles);
        setIsLoading(false);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);

  console.log("articles:", articles);

  const pageType= "Articles";

  if (isLoading) {
    return <Loader variable={pageType} />
  }


  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
        <h3 className="font-semibold">{articles && articles.length > 0 ? articles[0].title : ""}</h3>
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
                    <Link href={`/articles/edit?id=${article.id}`} passHref>
                      Read More
                    </Link>
                  </td>
                  <td>{article.status}</td>
                  <td>{article.publish_at?.slice(0, 10)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={parseInt("3")}>No articles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
