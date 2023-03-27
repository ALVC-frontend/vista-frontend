"use client";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BreadCrumb, Button } from "@components/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/admin/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  return (
    <section className="">
      <header>
        <BreadCrumb crumbs={[]} />
        <div className="flex items-center justify-between px-4">
          <h2 className="font-semibold text-xl flex-grow">Questions</h2>
          <Link href="/questions/new">
            <Button text="New Question" primary extraStyles="" />
          </Link>
        </div>

        {/* Filter area  */}
        <div className="flex items-center flex-grow justify-between px-3 gap-x-4 cursor-pointer my-6 w-full">
          <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
            <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
            <input
              type="search"
              placeholder="Search by title"
              className="outline-none border-none"
            />
          </div>

          <div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
            <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
              <FunnelIcon className="w-4 h-4" />
              <span>Filter by category</span>
            </p>
          </div>
          <div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
            <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
              <FunnelIcon className="w-4 h-4" />
              <span>Filter by kind</span>
            </p>
          </div>
        </div>
      </header>

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Category</th>
              <th className="bg-lightGray">Title</th>
              <th className="bg-lightGray">Kind</th>
              <th className="bg-lightGray">Intro</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>
                  <p className="text-primary">{question.category}</p>
                </td>
                <td>
                  <Link href={`/questions/${question.id}`}>
                    <a className="text-primary hover:underline">
                      {question.title}
                    </a>
                  </Link>
                </td>
                <td>
                  <small>{question.kind}</small>
                </td>
                <td>
                  <p
                    className={`badge ${
                      question.intro ? "bg-background" : "bg-red-200"
                    } text-primary text-sm border-background p-4`}
                  >
                    {question.intro ? "True" : "False"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
