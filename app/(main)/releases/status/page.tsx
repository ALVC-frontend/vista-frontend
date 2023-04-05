"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import { releases } from "@lib/dummy";
import axios from "axios";

interface Release {
  id: number;
  status: string;
  created_at: string;
  download_url: string;
}

export default function Page() {
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/admin/releases")
      .then((response) => {
        setReleases(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`/api/releases/${id}`)
      .then(() => {
        const updatedReleases = releases.filter((release) => release.id !== id);
        setReleases(updatedReleases);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <BreadCrumb crumbs={releases} />
      <header className="flex items-center justify-between px-10 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold text-xl">Releases</h3>
        </div>

        <div className="">
          <Link href="/releases/new">
            <Button
              text="New release"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Releases table  */}
      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Created</th>
              <th className="bg-lightGray"></th>
              <th className="bg-lightGray"></th>
            </tr>
          </thead>

          <tbody>
            {releases.length > 0 ? (
              releases.map((release) => (
                <tr key={release.id}>
                  <td>
                    <p className="badge bg-background text-primary text-sm border-background p-4">
                      {release.status}
                    </p>
                  </td>
                  <td>
                    <small>{release.created_at}</small>
                  </td>
                  <td>
                    <Link href={release.download_url}>
                      <a className="text-primary">Download</a>
                    </Link>
                  </td>
                  <td>
                    <button className="text-red-400 underline" onClick={() => handleDelete(release.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No releases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
