/*
export default function Page() {
  return <div className="">Releases Page</div>;
}
*/
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BreadCrumb, Button } from "@components/index";
import { releases } from "@lib/dummy";
import axios from "axios";
import React from "react";
import  Loader  from "@components/Loader";
import { useAuth } from "components/useAuth";

interface Release {
  id: number;
  status: string;
  created_at: string;
  download_url: string;
}

interface ReleaseResponse {
  paginate: Release[];
}
export default function Page() {
  const { accessToken } = useAuth();
  const [releases, setReleases] = useState<Release[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReleases() {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get<ReleaseResponse>(
          "https://vista-testing.herokuapp.com/api/admin/releases",
          { headers }
        );

        setReleases(response.data.paginate);
        setIsLoading(false);
        console.log("Response status:", response.status);
        console.log(response.data.paginate);
      } catch (error) {
        console.error(error);
      }
    }

    fetchReleases();
  }, [accessToken]);

  const handleDelete = (id: number) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .delete(`/api/releases/${id}`, { headers })
      .then(() => {
        const updatedReleases = releases.filter((release) => release.id !== id);
        setReleases(updatedReleases);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("categories:", releases);

  const pageType= "Releases";

if (isLoading) {
  return <Loader variable={pageType} />
}
  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <BreadCrumb crumbs={[]} />
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
          {Array.isArray(releases) && releases.length > 0 ? (
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
                  {release.download_url && (
                  <Link href={release.download_url}>
                  <a className="text-primary">Download</a>
                  </Link>
                  )}

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
                <td colSpan={4}>No releases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
