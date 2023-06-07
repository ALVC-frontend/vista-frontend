"use client";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import axios from "axios";
import  Loader  from "@components/Loader";

import Button from "@components/button";

interface City {
  city_name_url: string;
}

interface TableData {
  thead: {
    tr: {
      th: string;
    }
  }
  tbody: City[];
}

interface ApiResponse {
  title: string;
  breadcrumb: string;
  table: TableData[];
}

export default function Page() {
  const [cities, setCities] = useState<City[]>([]);
  const [title, setTitle] = useState("");
  const [breadcrumb, setBreadcrumb] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCities() {
      try {
        const response = await axios.get<ApiResponse>("https://vista-testing.herokuapp.com/api/admin/cities");
          setCities(response.data.table[0].tbody);
          setTitle(response.data.title);
          setBreadcrumb(response.data.breadcrumb);
          setIsLoading(false);
          console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCities();
  }, []);


  const pageType= "Cities";

  if (isLoading) {
    return <Loader variable={pageType} />
  }

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search city"
            className="outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="">
          <Link href="/cities/new">
            <Button
              text="New city"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Cities table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">{breadcrumb}</th>
            </tr>
          </thead>

          <tbody>
          {Array.isArray(cities) && cities.length > 0 ? (
              cities.map((city, index) => (
                  <tr key={index}>
                    <td>
                      <p>{city.city_name_url}</p>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="text-center py-4" colSpan={1}>
                  No cities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
