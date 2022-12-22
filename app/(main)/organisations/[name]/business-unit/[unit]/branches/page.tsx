import Link from "next/link";
import Image from "next/image";

import { BreadCrumb, Button } from "@components/index";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";
import rect44 from "@assets/images/rect44.png";
import rect45 from "@assets/images/rect45.png";
import rect46 from "@assets/images/rect46.png";

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
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}`,
      textToDisplay: `${convertFirstCapitals(params.unit.split("-")).join(
        " "
      )}`,
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}/branches`,
      textToDisplay: "Branches",
    },
  ];

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <BreadCrumb crumbs={links} />
      <header className="flex items-center justify-between px-3 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Branches</h3>
        </div>

        <div className="flex gap-x-3">
          <Link
            href={`/organisations/${params.name}/business-unit/${params.unit}/branches/edit`}
          >
            <Button
              text="Edit branch"
              extraStyles="font-thin text-sm px-4 py-3 outline outline-1 text-primary outline-primary"
            />
          </Link>
          <Link
            href={`/organisations/${params.name}/business-unit/${params.unit}/branches/new`}
          >
            <Button
              text="New branch"
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
              <th className="bg-lightGray">Name</th>
              <th className="bg-lightGray">Branch info</th>
              <th className="bg-lightGray">Image</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="text-primary">
                <Link
                  href={`/organisations/${params.name}/business-unit/${params.unit}/branches/edit`}
                >
                  1 Hotel Brooklyn Bridge
                </Link>
              </td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                labore.
              </td>
              <td>
                <div className="max-w-full">
                  <Image src={rect44} alt="rect 44" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-primary">
                <Link
                  href={`/organisations/${params.name}/business-unit/${params.unit}/branches/edit`}
                >
                  11 mirrors
                </Link>
              </td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                labore.
              </td>
              <td>
                <div className="max-w-full">
                  <Image src={rect45} alt="rect 45" />
                </div>
              </td>
            </tr>{" "}
            <tr>
              <td className="text-primary">
                <Link
                  href={`/organisations/${params.name}/business-unit/${params.unit}/branches/edit`}
                >
                  1906 Lodge
                </Link>
              </td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                labore.
              </td>
              <td>
                <div className="max-w-full">
                  <Image src={rect46} alt="rect 46" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
