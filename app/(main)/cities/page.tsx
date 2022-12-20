import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { Button } from "@components/index";

export default function Page() {
  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Cities</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search city"
            className="outline-none border-none"
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

      {/* Admins table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Name</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p>Cardiff</p>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
