import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import { releases } from "@lib/dummy";
import axios from "axios";

export default function Page() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    axios.get("/api/statuses")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <BreadCrumb crumbs={releases} />
      <header className="flex items-center justify-between px-10 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold text-xl">Releases</h3>
        </div>

        <div className="">
          <Link href="/releases/new">
            <Button
              text="New release"
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
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Created</th>
              <th className="bg-lightGray"></th>
              <th className="bg-lightGray"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  {status}
                </p>
              </td>

              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
              <td>
                <p className="text-primary">Download</p>
              </td>
              <td>
                <small className="text-red-400 underline">Delete</small>
              </td>
            </tr>
            <tr>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                {status}
                </p>
              </td>

              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
              <td>
                <p className="text-primary">Download</p>
              </td>
              <td>
                <small className="text-red-400 underline">Delete</small>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
