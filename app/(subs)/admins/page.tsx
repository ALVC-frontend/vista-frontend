"use client";
import Button from "@components/button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Admin {
  id: number;
  username: string;
  name: string;
  employee_id: number;
}

interface PageProps {}

interface PageState {
  admins: Admin[];
}

export default function Page(props: PageProps): JSX.Element {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    async function fetchAdmins() {
      const response = await axios.get<Admin[]>("/api/admins");
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
          <Link to="/admins/add">
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
            {admins.map((admin: Admin) => (
              <tr key={admin.id}>
                <th>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">

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
