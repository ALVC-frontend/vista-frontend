"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useAuth } from "components/useAuth";



import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newVideoCrumbs } from "@lib/dummy";
import React from "react";

interface Organisation {
  id: number;
  name: string;
  // Add other properties of the organization here
}

interface FormData {
  name: string;
  organisation_id: number[];
  description: string;
  published: boolean;
  url: string;
  content_category_ids: number[];

}

interface Props {
  organisations: Organisation[];
}

const Organisations = ({ organisations, ...props }: Props & any): JSX.Element => {
  return (
    <select {...props} className="w-full h-12 p-3 bg-lightGray border-none rounded-md">
      <option value="">Select an Organization...</option>
      {organisations.map((organisation: Organisation) => (
        <option key={organisation.id} value={organisation.id}>
          {organisation.name}
        </option>
      ))}
    </select>
  );
};

export default function PreferenceGroupForm(): JSX.Element {
  const { accessToken } = useAuth();
  const { push } = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [selectedOrganisation, setSelectedOrganisation] = useState<number>(0);
  const [organisation, setOrganization] = useState<Organisation[]>([]);

  const getOrganisations = () => {
    const headers = {
      Authorization: 'Bearer your_token',
      'Content-Type': 'application/json',
    };

    axios.get<Organisation[]>("https://vista-testing.herokuapp.com/api/admin/organisations", { headers })
      .then((response) => {
        setOrganization(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const handleOrganisationChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const organisationId = parseInt(event.target.value);
    setSelectedOrganisation(organisationId);
  };
  const createVideo = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const data: FormData = {
      name: name,
      organisation_id: [selectedOrganisation],
      description: description,
      published: false,
      url: url,
      content_category_ids: []
    };


  const headers = {
    Authorization: "Bearer <your_access_token_here>",
  };

    axios
      .post("https://vista-testing.herokuapp.com/api/admin/videos", data, { headers })
      .then((response) => {
        push("/videos");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newVideoCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Video</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5" onSubmit={createVideo}>
          <TextInput
          inputType="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          />

          <TextInput
          inputType="url"
          placeholder="URL"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          />

          {/* Add a warning or error component here  */}

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>

          {/* Dropdown  */}

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <Organisations
               organisations={organisation}
               value={setSelectedOrganisation.toString()}
              onChange={handleOrganisationChange}
          />
            </div>
          </div>
          <BadgeContainer
            editableBadges={[]}
            placeholder="Content categories"
          />
<div className="">
  <label className="cursor-pointer flex gap-x-2 items-center">
    <input type="checkbox" className="" />
    <span className="label-text text-primary">Published</span>
  </label>
</div>

<BadgeContainer
  editableBadges={[]}
  placeholder="Content categories"
/>

{/* Form navigation  */}
<FormNav
  rightBtnText="Create video"
/>
</form>
      </main>
    </section>
  );
}
function setSelectedOrganisation(organisationId: number) {
  throw new Error("Function not implemented.");
}

