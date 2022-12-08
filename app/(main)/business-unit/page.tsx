import Link from "next/link";

import { Button } from "@components/index";

export default function Page() {
  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Business Units</h3>
        </div>

        <div className="">
          <Link href="/business-unit/add">
            <Button
              text="New business unit"
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
              <td>Name</td>
            </tr>
          </thead>

          <tbody>
            {/* admin 3  */}
            <tr>
              <td className="text-primary">
                <Link href="/business-unit/">Developer Division</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
