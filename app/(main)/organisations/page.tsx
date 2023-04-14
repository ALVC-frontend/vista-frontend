"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@components/index";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Organization {
  id: number;
  name: string;
  // Add other properties of the organization here
}

export default function Page() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    axios.get<Organization[]>("http://localhost:4000/api/admin/organisations").then((res) => {
      setOrganizations(res.data);
    });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Organisations</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search organisations"
            className="outline-none border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="">
          <Link href="/organisations/new">
            <Button
              text="New organisation"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Organizations table  */}
      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganizations.length === 0 ? (
              <tr>
                <td>No organizations found</td>
              </tr>
            ) : (
              filteredOrganizations.map((org) => (
                <tr key={org.id}>
                  <td>
                    <Link href={`/organizations/${org.name}`}>
                      <p className="text-primary">{org.name}</p>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
