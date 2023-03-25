import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@components/index";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("your_api_endpoint_url");
      setCategories(result.data);
    };
    fetchData();
  }, []);

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Partner Categories</h3>
        </div>
        {/* <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search city"
            className="outline-none border-none"
          />
        </div> */}
        <div className="">
          <Link href="/partner-categories/new">
            <Button
              text="New category"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Admins table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Category details</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <Link href={`/partner-categories/${category.id}`}>
                    <p className="text-primary">{category.name}</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
