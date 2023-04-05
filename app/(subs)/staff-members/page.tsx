"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@components/index";
import axios from "axios";

export default function Page() {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/staff-members");
        setStaffMembers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Staff Members</h3>
        </div>

        <div className="">
          <Link href="/staff-members/add">
            <Button
              text="New staff member"
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
              <th>Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>

          <tbody>
            {staffMembers.map((staffMember) => (
              <tr key={staffMember.id}>
                <td>
                  <Link href={`/staff-members/${staffMember.id}/edit`}>
                    <p>{`${staffMember.first_name} ${staffMember.last_name}`}</p>
                  </Link>
                </td>
                <td>
                  <p className="text-primary">{staffMember.employee_id}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
