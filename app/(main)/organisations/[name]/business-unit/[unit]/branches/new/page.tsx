"use client";

import Link from "next/link";

import {
  BadgeContainer,
  BreadCrumb,
  Button,
  TextInput,
} from "@components/index";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";

export default function Page({ params }: any) {
  const links: BreadLink[] = [
    {
      link: "/organisations",
      textToDisplay: "Organisations",
    },
    {
      link: `/organisations/${params.name}`,
      textToDisplay: `${params.name}`,
    },
    {
      link: `/organisations/${params.name}/business-unit`,
      textToDisplay: "Business units",
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}`,
      textToDisplay: `${convertFirstCapitals(params.unit.split("-")).join(
        " "
      )}`,
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}/branches`,
      textToDisplay: "Branches",
    },
    {
      link: `/organisations/${params.name}/business-unit/${params.unit}/branches/new`,
      textToDisplay: "New Branch",
    },
  ];

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={links} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Branch</h2>

        {/* <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5"> */}
        <form>
          <div className="carousel">
            <div
              id="slide1"
              className="carousel-item w-[95%] md:w-full py-4 mr-4"
            >
              <div className="w-[95%] flex flex-col gap-y-6 md:w-3/5">
                <BadgeContainer editableBadges={[]} placeholder="Categories" />
                <TextInput inputType="text" placeholder="Name" />
                <TextInput inputType="text" placeholder="Branch info" />
                <TextInput inputType="email" placeholder="Email" />
                <TextInput inputType="tel" placeholder="Telephone" />
                <TextInput inputType="url" placeholder="Booking url" />

                {/* Form navigation  */}

                <div className="flex justify-between">
                  <Button text="Cancel" subtle />
                  <Button text="Next" primary />
                </div>
              </div>
            </div>

            {/* second form  */}
            <div
              id="slide2"
              className="carousel-item py-4 mr-4 w-[95%] md:w-full"
            >
              <div className="flex flex-col gap-y-6 w-[95%] md:w-3/5">
                <input
                  type="file"
                  className="file-input file-input-ghost bg-lightGray"
                />
                <h5 className="font-semibold">Address</h5>
                <TextInput inputType="text" placeholder="Line 1" />
                <TextInput inputType="text" placeholder="Line 2" />
                <TextInput inputType="text" placeholder="City" />
                <TextInput inputType="text" placeholder="County" />
                <TextInput inputType="number" placeholder="Post code" />
                <TextInput inputType="text" placeholder="Country" />
                <div className="flex justify-between">
                  <Button text="Back" subtle />
                  <Button text="Next" primary />
                </div>
              </div>
            </div>

            {/* third form  */}
            <div
              id="slide3"
              className="carousel-item py-4 mr-4 w-[95%] md:w-full"
            >
              <div className="flex flex-col gap-y-6 w-[95%] md:w-3/5">
                <div className="flex items-center">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      className="form-select bg-lightGray border-none p-3 rounded-md m-1"
                    >
                      +1
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-lightGray rounded-box w-52"
                    >
                      <li>
                        <a>+255</a>
                      </li>
                      <li>
                        <a>+254</a>
                      </li>
                    </ul>
                  </div>
                  <TextInput inputType="tel" placeholder="Mobile no" />
                </div>
                <TextInput inputType="text" placeholder="Latitude" />
                <TextInput inputType="text" placeholder="Longitude" />
                <div className="flex justify-between">
                  <Button text="Back" subtle />
                  <Button text="Create branch" primary />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}
