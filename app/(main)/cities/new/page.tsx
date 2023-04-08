"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newCityCrumbs } from "@lib/dummy";

export default function Page() {

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();


  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/admin/cities", { name, status });
      console.log(res.data);
      router.push('/cities');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newCityCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New city</h2>

        <form
          className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[75%]"
          onSubmit={handleSubmit}
        >
          <TextInput
            inputType="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Status</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <input
                    type="text"
                    className="w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </li>
                <li>
                  <a
                    className="text-primary"
                    onClick={() => setStatus("Enabled")}
                  >
                    Enabled
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary"
                    onClick={() => setStatus("Disabled")}
                  >
                    Disabled
                  </a>
                </li>
                <li>
                  <p
                    className="text-primary"
                    onClick={() => setStatus("Coming soon")}
                  >
                    Coming soon
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Form navigation  */}

          <FormNav
            rightBtnText="Create city"
            // redirect to verify admin page
            rightBtnAction={handleSubmit}
          />
        </form>
      </main>
    </section>
  );
}
