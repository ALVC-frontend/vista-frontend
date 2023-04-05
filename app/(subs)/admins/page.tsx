"use client";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { Button } from "@components/index";
import admin1 from "@assets/images/admin-1.png";
import admin2 from "@assets/images/admin-2.png";

export default function Page() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      const response = await axios.get("/api/admins");
      setAdmins(response.data);
    }

    fetchAdmins();
  }, []);

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Admins</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search admin"
            className="outline-none border-none"
          />
        </div>
        <div className="">
          <Link href="/admins/add">
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
              <th>Profile</th>
              <th>Name</th>
              <th>Employee id</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <th>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image src={admin1} alt="Admin 1" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold opacity-[0.44]">
                        {admin.username}
                      </h4>
                    </div>
                  </div>
                </th>
                <th>{admin.name}</th>
                <th>{admin.employee_id}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
