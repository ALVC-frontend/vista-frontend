"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "components/useAuth";

import { BreadCrumb, Button } from "@components/index";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";
import { useSearchParams } from 'next/navigation';
export default function Page({ params }: any) {
  const { accessToken } = useAuth();
  const searchParams = useSearchParams();
  const organisation_id = searchParams?.get('organisation_id');
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`https://vista-testing.herokuapp.com/api/admin/organisations/${organisation_id}/business_units/${params.unit}/branches`, { headers })
      .then(response => {
        setBranches(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching branches:", error);
      });
  }, [ accessToken ]);


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
              <th className="bg-lightGray w-1/5">Branch info</th>
              <th className="bg-lightGray">Image</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(branches) && branches.length > 0 ? (
    branches.map((branch: any) => (
      <tr key={branch.id}>
        <td className="text-primary">
          <Link
            href={`/organisations/${params.name}/business-unit/${params.unit}/branches/edit`}
          >
            {branch.name}
          </Link>
        </td>
        <td className=" w-1/5">{branch.about}</td>

        <td>
          <div className="max-w-full">
            <Image src={branch.image} alt={branch.name} />
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={3}>No branches found.</td>
    </tr>
  )}
</tbody>


        </table>
      </article>
    </section>
  );
}
