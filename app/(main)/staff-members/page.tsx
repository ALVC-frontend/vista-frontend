import Link from "next/link";

import { Button } from "@components/index";

export default function Page() {
  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Staff Members</h3>
        </div>

        <div className="">
          <Link href="/staff-members/add">
            <Button
              text="New staff member"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* business units table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="pl-3">
              <th>Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>

          <tbody>
            {/* admin 3  */}
            <tr>
              <td>
                <p>Staff Member</p>
              </td>
              <td>
                <p className="text-primary">7646464</p>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
