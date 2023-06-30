"use client";
import axios from "axios";
import { BreadCrumb, Button } from "@components/index";
import { statusDataImports } from "@lib/dummy";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import  Loader  from "@components/Loader";
import { useAuth } from "components/useAuth";

interface Import {
  file: string;
  status: string;
  created: string;
  finished: string;
}

interface ImportItem {
  file: {
    url: string;
  };
  status: string;
  created_at:string;
  finished_at: string;
}

export default function Page() {
  const { accessToken } = useAuth();
  const [imports, setImports] = useState<Import[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          "https://vista-testing.herokuapp.com/api/admin/data_imports",
          { headers: headers }
        );

        const importData = response.data.paginate.map((importItem: ImportItem) => {
          return {
            file: importItem.file.url,
            status: importItem.status,
            created: importItem.created_at,
            finished: importItem.finished_at,
          };
        });

        setImports(importData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [accessToken]);

  const pageType= "Data-imports";

  if (isLoading) {
    return <Loader variable={pageType} />
  }

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header  */}
      <BreadCrumb crumbs={statusDataImports} />
      <header className="flex items-center justify-between px-10 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Data imports</h3>
        </div>

        <div className="">
          <Link href="/data-imports/new">
            <Button
              text="Import data"
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
              <th className="bg-lightGray">File</th>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Created</th>
              <th className="bg-lightGray">Finished</th>
            </tr>
          </thead>

          <tbody>
            {imports.map((importData) => (
              <tr key={importData.file}>
                <td>
                  <p className="text-primary">{importData.file}</p>
                </td>
                <td>
                  <p className="badge bg-background text-primary text-sm border-background p-4">
                    {importData.status}
                  </p>
                </td>
                <td>
                  <small>{importData.created}</small>
                </td>
                <td>
                  <small>{importData.finished}</small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
