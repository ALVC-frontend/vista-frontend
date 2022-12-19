import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { Button } from "@components/index";

export default function Page() {
  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Videos</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search videos"
            className="outline-none border-none"
          />
        </div>
        <div className="">
          <Link href="/videos/new">
            <Button
              text="New video"
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
              <th className="bg-lightGray">Description</th>
              <th className="bg-lightGray">Partner</th>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Published at</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <Link href="/videos/edit">
                  <p>Sample Video</p>
                </Link>
              </td>
              <td>
                <p>Placeholder seeded video for development purposes...</p>
              </td>
              <td>
                <p className="text-primary">Vista</p>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  Published
                </p>
              </td>
              <td>
                <small>5/07/2022 at 11:30</small>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
