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
import { useSearchParams } from 'next/navigation';

interface Admin {
  username: string;
  id: number;
  name: string;
  employeeId: string;
}

interface Props {
  params: { name: string };
}

export default function Page({ params }: Props) {
  const searchParams = useSearchParams();
  const organisation_id = searchParams?.get('organisation_id');
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchAdmin= async () => {
      try {
        const response = await axios.get(
          `https://vista-testing.herokuapp.com/api/admin/staff/organisations/1/admins`
        );
        setAdmins(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Admins', error);
      }
    };

    fetchAdmin();
  }, []);

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
  const filteredAdmins = Array.isArray(admins)
  ? admins.filter((admin) =>
      admin.name.toLowerCase().includes(searchText.toLowerCase())
    )
  : [];

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
             {Array.isArray(admins) ? (
              admins.map((admin) => (
            <tr key={admin.id}>
        <th>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
              <Image src={admin.id === 1 ? admin1 : admin2} alt={`Admin ${admin.id}`} />
              </div>
            </div>
            <div>
              <h4 >{admin.username}</h4>
            </div>
          </div>
        </th>
        <th>{admin.name}</th>
        <th>{admin.employeeId}</th>
      </tr>
    ))
  ) : (
    <p>No admins found.</p>
  )}
</tbody>


        </table>
      </article>
    </section>
  );
}
