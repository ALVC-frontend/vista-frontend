'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.css';
import Link from "next/link";

import {
  Button,
  BreadCrumb,
} from "@components/index";
import { newArticleCrumbs } from "@lib/dummy";
import ids from "components/ids";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface FormData {
  title: string;
  content: string;
  categories: string[];
}

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
  status: string;
  title: string;
  content: string;
  publishedAt: string;
  admin_articles: {
    breadcrumb: string;
  };
  admin_articles_path: {
    filters: {
      text: string;
    };
  };

  articles: Article[];
  paginate: Article[];
}

export default function Page() {
  const articleId = ids();
  console.log(articleId);
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>();
  const [publishDate, setPublishDate] = useState<string>(
    new Date().toLocaleString()
  );
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categories: [],
  });

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get<ArticlesResponse>(
          `https://vista-testing.herokuapp.com/api/admin/articles/${articleId}`
        );
        setArticles(response.data.articles);
        setIsLoading(false);
        setFormData({
          title: response.data.title,
          content: response.data.content,
          categories: [],
        });
        setStatus(response.data.status);
        setPublishDate(response.data.publishedAt);
        console.log("Response status:", response.status);
        console.log(response.data);
        console.log(response.data.title);
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);

  const { title, content } = formData;

  console.log("articles:", articles);
  return (
    <section className="w-full pl-1 pt-3">
      <header className="flex items-center justify-around my-4">
      <BreadCrumb crumbs={newArticleCrumbs} />
        <div className="hidden md:block">
        <h3 className="font-semibold">{articles && articles.length > 0 ? articles[0].title : ""}</h3>
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
     <main>
      <div id="article-window">
        <h3 className="article-title">
          Title: {title || "No Title"}
        </h3>
        <div style={{fontStyle: "italic"}}>
          Date published: {publishDate}
        </div>
        <br></br>
        <hr style={{backgroundColor: "rgb(216, 194, 94)"}} />
        <p className="article-content">
          {content || "No content"}
        </p>
        <hr style={{backgroundColor: "rgb(216, 194, 94)"}} />
        <br></br>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span style={{color: "blue", fontWeight: "bold", display: "inline-block", padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px", textDecoration: "none"}}>
            Edit
          </span>
          <span className="pay_btn" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <i className="fa fa-credit-card" aria-hidden="true"></i>&nbsp;
            {status}Published
          </span>
          <span className="delete_btn" style={{display: "flex", justifyContent: "flex-end", alignItems: "center" ,color:"red"}}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      </main>
      </section>
    );
}
