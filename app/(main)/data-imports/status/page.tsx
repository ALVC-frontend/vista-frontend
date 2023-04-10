"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

import { BreadCrumb, Button } from "@components/index";
import { statusDataImports } from "@lib/dummy";
import React from "react";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleImportClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/import-data");
      console.log(response.data);
      // handle success response here
    } catch (error) {
      console.log(error);
      // handle error response here
    }

    setIsLoading(false);
  };

  return (
    <section className="w-full pl-1 pt-3">
      {/* Header */}
      <BreadCrumb crumbs={statusDataImports} />
      <header className="flex items-center justify-between px-10 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Data imports</h3>
        </div>

        <div>
          <Button
            text="Import data"
            primary
            extraStyles="font-thin text-sm px-4 py-3"
            onClick={handleImportClick}
            disabled={isLoading}
          />
        </div>
      </header>

      {/* Table */}
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
            {/* Add more rows dynamically based on imported data */}
            <tr>
              <td>
                <p className="text-primary">file1.docx</p>
              </td>
              <td>
                {/* Change badge color based on status */}
                <p className="badge bg-success text-primary text-sm border-background p-4">
                  Finished
                </p>
              </td>
              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
              <td>
                <small>2022-11-23 12:25:40 UTC</small>
              </td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
}
