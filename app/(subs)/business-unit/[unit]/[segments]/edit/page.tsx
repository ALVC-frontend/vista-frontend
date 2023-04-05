"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BreadCrumb, FormNav, TextInput } from "@components/index";
import { businessUnitCrumbs } from "@lib/dummy";
import { BreadLink } from "types/crumbs";
import { convertFirstCapitals } from "@lib/helpers";
import axios from 'axios';

export default function Page({ params }: any) {
  const { push } = useRouter();

  const { unit, segments } = params;
  const businessUnit = convertFirstCapitals(unit.split("-")).join(" ");
  const title = convertFirstCapitals(segments.split("-")).join(" ");

  const initialCrumbs: BreadLink[] = [
    {
      link: "/business-unit/",
      textToDisplay: "Business Units",
    },
    {
      link: `/business-unit/${unit}`,
      textToDisplay: `${businessUnit}`,
    },
    {
      link: `/business-unit/${unit}/${segments}`,
      textToDisplay: `${title}`,
    },
    {
      link: `/business-unit/${unit}/${segments}/edit`,
      textToDisplay: "Edit Request type",
    },
  ];

  const [requestType, setRequestType] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestType(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(`/api/requestTypes/${segments}`, { requestType });
      console.log(response.data);
      // Redirect to verify admin page
      push("/business-unit/add");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full ml-6">
      <header>
        <BreadCrumb crumbs={initialCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">Edit request type</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5" onSubmit={handleFormSubmit}>
          <TextInput
            inputType="text"
            placeholder="Edit Request type"
            value={requestType}
            onChange={handleInputChange}
          />

          {/* Form navigation  */}

          <FormNav
            extraStyles="mt-10"
            rightBtnStyles="font-thin text-sm md:w-2/5"
            rightBtnText="Save request type"
            rightBtnAction={handleFormSubmit}
          />
        </form>
      </main>
    </section>
  );
}
