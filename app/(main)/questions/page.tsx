"use client";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BreadCrumb, Button } from "@components/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  id: number;
  title: string;
  category: string;
  kind: string;
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get<Question[]>("http://localhost:4000/admin/questions");
        setQuestions(response.data);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuestions();
  }, []);

  console.log("questions:", questions);

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
              <th className="bg-lightGray">Title</th>
              <th className="bg-lightGray">Category</th>
              <th className="bg-lightGray">Kind</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(questions) && questions.length > 0 ? (
              questions.map((question) => (
                <tr key={question.id}>
                  <td>
                    <p>{question.title}</p>
                    <Link href={`/questions/${question.id}`}>
                      Read More
                    </Link>
                  </td>
                  <td>{question.category}</td>
                  <td>{question.kind}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No questions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
