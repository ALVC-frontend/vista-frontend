import Link from "next/link";

import { BreadCrumb, Button } from "@components/index";
import { statusPreferenceGroup } from "@lib/dummy";

export default function Page() {
  return (
    <section className="w-full pl-1 pt-3">
      <BreadCrumb crumbs={statusPreferenceGroup} />
      {/* Header  */}
      <header className="flex items-center justify-between px-4 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Preference Groups</h3>
        </div>

        <div className="">
          <Link href="/preference-group/new">
            <Button
              text="New preference group"
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
                <p>Hotel</p>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
