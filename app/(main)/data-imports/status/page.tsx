import Link from "next/link";

import { BreadCrumb, Button } from "@components/index";
import { statusDataImports } from "@lib/dummy";

export default function Page() {
  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <BreadCrumb crumbs={statusDataImports} />
      <header className="flex items-center justify-between px-10 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Data imports</h3>
        </div>

        <div className="">
          <Link href="/data-imports/new">
            <Button
              text="Import data"
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
              <th className="bg-lightGray">File</th>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Created</th>
              <th className="bg-lightGray">Finished</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <p className="text-primary">file1.docx</p>
              </td>
              <td>
                <p className="badge bg-background text-primary text-sm border-background p-4">
                  Finished
                </p>
              </td>
              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
