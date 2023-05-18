"use client";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BreadCrumb, Button } from "@components/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import  Loader  from "@components/Loader";

interface Category {
  id: number;
  title: string;
}

interface Question {
  id: number;
  title: string;
  category_id: number;
  kind: string;
  category: Category;
}


interface ResponseData {
  categories: Category[];
}

export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [kindFilter, setKindFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);



  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get<Question[]>(`http://localhost:4000/api/admin/questions?_page=${currentPage}&_limit=${itemsPerPage}&q=${searchTerm}${categoryFilter ? `&category_id=${categoryFilter}` : ""}${kindFilter ? `&kind=${kindFilter}` : ""}`);
        setQuestions(response.data);
        setIsLoading(false);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuestions();

  }, [currentPage, itemsPerPage, searchTerm, categoryFilter, kindFilter]);


    const filteredItems = questions.filter((question) => {
    const categoryMatch = categoryFilter ? question.category.title=== categoryFilter : true;
    const kindMatch = kindFilter ? question.kind === kindFilter : true;
    const titleMatch = question.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && kindMatch && titleMatch;
  });

  console.log("questions:", questions);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const categories = new Set(questions.map((question) => question.category.title));
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleKindFilter = (kind: string) => {
    setKindFilter(kind);
  };


  const handleFilterChange = (e: any) => {
    setCategoryFilter(e.target.value);
  };

  const handleSearch = () => {
    // Perform search based on categoryFilter
    console.log(`Searching for ${categoryFilter}`);
  };

  const pageType= "Questions";

  if (isLoading) {
    return <Loader variable={pageType} />
  }

  return (
    <section className="question">
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
<div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
            <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
              <FunnelIcon className="w-4 h-4" />
            </p>
            <select value={categoryFilter} onChange={handleFilterChange}>
  <option value="">Filter by category</option>
  {Array.from(categories).map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>
</div>

<div className="outline outline-1 flex justify-center flex-grow outline-primary p-2 cursor-pointer rounded-md">
  <p className="flex items-center gap-x-3 text-primary text-xs md:text-md">
  <FunnelIcon className="w-4 h-4" />
  </p>
  <select value={kindFilter} onChange={(e) => setKindFilter(e.target.value)}>
    <option value="">Filter by kind</option>
    <option value="option">option</option>
    <option value="ordered_list">ordered_list</option>
    <option value="boolean">boolean</option>
    <option value="number">number</option>
    <option value="number_range">number_range</option>
    <option value="temperature">temperature</option>
    <option value="temperature_range">temperature_range</option>
    <option value="text">text</option>
    <option value="time">time</option>
    <option value="time_range">time_range</option>
  </select>

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
