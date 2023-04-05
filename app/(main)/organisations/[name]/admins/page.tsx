"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import admin1 from "@assets/images/admin-1.png";
import admin2 from "@assets/images/admin-2.png";
import { BreadLink } from "types/crumbs";

interface Admin {
  id: number;
  name: string;
  employeeId: string;
}

interface Props {
  params: { name: string };
}

export default function Page({ params }: Props) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(`l\/api/organisations/${params.name}/admins`)
      .then((response) => setAdmins(response.data))
      .catch((error) => console.error(error));
  }, [params.name]);

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
      link: `/organisations/${params.name}/admins`,
      textToDisplay: "Admins",
    },
  ];

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Admins</h3>
        </div>

        <div className="">
          <Link href={`/organisations/${params.name}/admins/add`}>
            <Button
              text="New admin"
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
              <th className="bg-lightGray">
                {" "}
                <div className="bg-white rounded-md flex w-3/5 items-center gap-x-2 p-2">
                  <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
                  <input
                    type="text"
                    placeholder="Search admin"
                    className="outline-none border-none"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </th>
              <th className="bg-lightGray">Name</th>
              <th className="bg-lightGray">Employee id</th>
            </tr>
          </thead>

          <tbody>
  {admins.map((admin) => (
    <tr key={admin.id}>
      <th>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image src={admin.avatar} alt={`Admin ${admin.id}`} />
            </div>
          </div>
          <div>
            <h4 className="font-bold opacity-[0.44]">{admin.username}</h4>
          </div>
        </div>
      </th>
      <th>{admin.name}</th>
      <th>{admin.employeeId}</th>
    </tr>
  ))}
</tbody>

        </table>
      </article>
    </section>
  );
}
