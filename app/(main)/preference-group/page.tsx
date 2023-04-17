"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import axios from "axios";
import React from "react";

interface PreferenceGroup {
  id: number;
  title: string;
  // Add other properties of the preference group here
}
interface partNerCategoryResponse {
  preference_groups: PreferenceGroup[];
}
export default function Page() {
  const [preferenceGroups, setPreferenceGroups] = useState<PreferenceGroup[]>([]);

  useEffect(() => {
    async function fetchPreferenceGroups() {
      try {
        const response = await axios.get<partNerCategoryResponse>("http://localhost:4000/api/admin/preference_groups");
        setPreferenceGroups(response.data.preference_groups);
        console.log("Response status:", response.status);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPreferenceGroups();
  }, []);

  console.log("preferenceGroups:", preferenceGroups);

  return (
    <section className="w-full pl-1 pt-3">
      <BreadCrumb crumbs={[]} />

      <header className="flex items-center justify-between px-4 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Preference Groups</h3>
        </div>

        <div className="">
          <Link href="/preference-group/new">
            <Button
              text="New preference group"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Name</th>
            </tr>
          </thead>

          <tbody>
          {Array.isArray(preferenceGroups) && preferenceGroups.length > 0 ? (
              preferenceGroups.map((preferenceGroup) => (
                <tr key={preferenceGroup.id}>
                  <td>
                    <p>{preferenceGroup.title}</p>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={parseInt("3")}>No preferenceGroups found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
