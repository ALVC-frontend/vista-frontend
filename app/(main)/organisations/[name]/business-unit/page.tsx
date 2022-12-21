import Link from "next/link";

import { BreadCrumb, Button } from "@components/index";
import { BreadLink } from "types/crumbs";

export default function Page({ params }: any) {
  const links: BreadLink[] = [
    {
      link: "/organisations",
      textToDisplay: "Organisations",
    },
    {
      link: `/organisations/${params.name}`,
      textToDisplay: `${params.name}`,
    },
    {
      link: `/organisations/${params.name}/business-unit`,
      textToDisplay: "Business units",
    },
  ];

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <BreadCrumb crumbs={links} />
      <header className="flex items-center justify-between px-3 my-4">
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
                <Link href="/business-unit/developer-division">
                  Developer Division
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
