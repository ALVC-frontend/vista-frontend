"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import axios from "axios";

interface PreferenceGroup {
  id: number;
  name: string;
  // Add other properties of the preference group here
}

export default function Page() {
  const [preferenceGroups, setPreferenceGroups] = useState<PreferenceGroup[]>([]);

  useEffect(() => {
    async function fetchPreferenceGroups() {
      try {
        const response = await axios.get<PreferenceGroup[]>("/api/preference-groups");
        setPreferenceGroups(response.data);
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
      <BreadCrumb crumbs={[{ label: "Preference Groups", link: "#" }]} />

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
            {preferenceGroups.map((preferenceGroup) => (
              <tr key={preferenceGroup.id}>
                <td>
                  <p>{preferenceGroup.name}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
