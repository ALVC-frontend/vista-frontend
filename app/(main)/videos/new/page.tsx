"use client";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // import Axios library

import {
  BadgeContainer,
  BreadCrumb,
  FormNav,
  TextInput,
} from "@components/index";
import { newVideoCrumbs } from "@lib/dummy";

export default function Page() {
  const { push } = useRouter();

  // function to create a new video
  const createVideo = async (event: any) => {
    event.preventDefault(); // prevent form from submitting

    // get form data
    const name = event.target.elements.name.value;
    const url = event.target.elements.url.value;
    const description = event.target.elements.description.value;
    const published = event.target.elements.published.checked;

    // make POST request to create new video
    try {
      const response = await axios.post("http://localhost:4000/admin/videos", {
        name,
        url,
        description,
        published,
      });
      console.log(response.data);
      push("/videos"); // redirect to videos page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full pl-6">
      <header>
        <BreadCrumb crumbs={newVideoCrumbs} />
      </header>

      <main>
        <h2 className="text-2xl font-semibold">New Video</h2>

        <form className="flex flex-col gap-y-6 my-4 w-[95%] md:w-3/5" onSubmit={createVideo}>
          <TextInput inputType="text" placeholder="Name" name="name" />
          <TextInput inputType="url" placeholder="URL" name="url" />
          {/* Add a warning or error component here  */}

          <textarea
            cols={30}
            rows={5}
            placeholder="Description"
            className="p-3 bg-lightGray outline-none rounded-md"
            name="description"
          ></textarea>

          {/* Dropdown  */}

          <div className="flex w-full items-center">
            <div className="dropdown w-full">
              <div
                tabIndex={0}
                className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
              >
                <small className="opacity-[0.44]">Organisation</small>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 w-full shadow bg-lightGray rounded-box"
              >
                <li>
                  <a>Vista</a>
                </li>
                <li>
                  <a>Nappr</a>
                </li>
              </ul>
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
  // redirect to verify admin page
  rightBtnAction={() => push("/videos")}
/>
</form>
      </main>
    </section>
  );
}
