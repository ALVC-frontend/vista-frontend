"use client";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BreadCrumb, Button } from "@components/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

interface Category {
  id: number;
  title: string;
}

interface Question {
  id: number;
  title: string;
  category_id: string;
  kind: string;
  category: Category;
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get<Question[]>(`http://localhost:4000/api/admin/questions?_page=${currentPage}&_limit=${itemsPerPage}`);
        setQuestions(response.data);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuestions();
  }, [currentPage, itemsPerPage]);

  console.log("questions:", questions);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
  pageNumbers.push(i);
  }


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
  {Array.isArray(currentItems) && currentItems.length > 0 ? (
    currentItems.map((question) => (
      <tr key={question.id}>
        <td>
          <p>{question.title}</p>
          <Link href={`/questions/${question.id}`}>
            Read More
          </Link>
        </td>
        <td>{question.category.title}</td>
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
        <div className="flex justify-center items-center mt-4 ">
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
  >
    Prev
  </button>
  {pageNumbers
    .filter(
      (number) =>
        number === 1 ||
        number === currentPage ||
        number === currentPage + 1 ||
        number === currentPage - 1 ||
        number === totalPages
    )
    .map((number, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(number)}
        className={`mx-2 rounded-full px-3 py-2 ${
          currentPage === number ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        {number}
      </button>
    ))}
  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentItems.length < itemsPerPage}
  >
    Next
  </button>
</div>


      </article>
    </section>

  );
}
