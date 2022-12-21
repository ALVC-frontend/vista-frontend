import Link from "next/link";
import Image from "next/image";

import { BreadCrumb, Button } from "@components/index";
import { BreadLink } from "types/crumbs";
import logo1 from "@assets/svg/orgs-logo-1.svg";
import logo2 from "@assets/svg/two-ppl.svg";

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
  ];

  return (
    <section className="pl-4 w-4/5">
      <header>
        <BreadCrumb crumbs={links} />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{params.name}</h3>
          <Link href={`organisations/${params.name}/admins/new`}>
            <Button text="New admin" primary />
          </Link>
        </div>
      </header>
      <main className="flex items-center gap-x-5 my-4">
        <div className="flex flex-col items-center justify-center min-w-[18.5rem] min-h-[17.375rem] bg-lightGray p-4 rounded-md">
          <div className="">
            <Image src={logo1} alt="Business unit logo" />
          </div>
          <Link href={`/organisations/${params.name}/business-unit`}>
            <h4 className="text-primary">Business units</h4>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-w-[18.5rem] min-h-[17.375rem] bg-lightGray p-4 rounded-md">
          <div className="">
            <Image src={logo2} alt="two people logo" />
          </div>
          <Link href={`/organisations/${params.name}/admins`}>
            <h4 className="text-primary">Admins</h4>
          </Link>
        </div>
      </main>
    </section>
  );
}
