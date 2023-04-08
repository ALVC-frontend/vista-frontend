"use client";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { Button } from "@components/index";

type StaffMember = {
  id: number;
  first_name: string;
  last_name: string;
  employee_id: string;
};

export default function Page() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<StaffMember[]> = await axios.get(
          "/api/staff-members"
        );
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
