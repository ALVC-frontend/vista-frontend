import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import {
BadgeContainer,
BreadCrumb,
FormNav,
TextInput,
} from "@components/index";
import { editVideoCrumbs } from "@lib/dummy";

export default function Page() {
const { push } = useRouter();
const [videoName, setVideoName] = useState("Sample Video");
const [videoUrl, setVideoUrl] = useState(
"https://edehbdgygrtgvryyr/5454637?s=cbdbcufvbufvbf"
);
const [videoDesc, setVideoDesc] = useState(
"Placeholder seeded video for development purposes"
);
const [videoCategory, setVideoCategory] = useState(["Men's fashion"]);
const [isPublished, setIsPublished] = useState(true);

const handleEditVideo = async (event) => {
event.preventDefault();
const data = {
name: videoName,
url: videoUrl,
description: videoDesc,
category: videoCategory,
isPublished,
};
try {
const response = await axios.put(/api/videos/${VIDEO_ID}, data);
console.log(response.data);
push("/videos");
} catch (error) {
console.error(error);
}
};

return (
<section className="w-full pl-6">
<header>
<BreadCrumb crumbs={editVideoCrumbs} />
</header>
  <main>
    <h2 className="text-2xl font-semibold">Edit Video</h2>

    <form
      className="flex flex-col gap-y-6 my-4 w-[95%] md:w-[70%]"
      onSubmit={handleEditVideo}
    >
      <TextInput
        inputType="text"
        placeholder="Name"
        value={videoName}
        onChange={(event) => setVideoName(event.target.value)}
      />
      <TextInput
        inputType="url"
        placeholder="URL"
        value={videoUrl}
        onChange={(event) => setVideoUrl(event.target.value)}
      />
      {/* Add a warning or error component here  */}

      <textarea
        cols={30}
        rows={5}
        placeholder="Description"
        className="p-3 bg-lightGray outline-none rounded-md"
        value={videoDesc}
        onChange={(event) => setVideoDesc(event.target.value)}
      ></textarea>

      {/* Dropdown  */}

      <div className="flex w-full items-center">
        <div className="dropdown w-full">
          <div
            tabIndex={0}
            className="w-full bg-lightGray border-none p-3 rounded-md m-1 flex items-center justify-between"
          >
            <small className="opacity-[0.44]">Vista</small>
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
  editableBadges={videoCategory}
  placeholder="Content categories"
  onChange={(tags) => setVideoCategory(tags)}
/>

<div className="">
  <label className="cursor-pointer flex gap-x-2 items-center">
    <input
      type="checkbox"
      className=""
      checked={isPublished}
      onChange={(event) => setIsPublished(event.target.checked)}
    />
    <span className="label-text text-primary">Published</span>
  </label>
</div>

<FormNav
  rightBtnText="Update video"
  rightBtnAction={handleEditVideo}
/>
</form>
      </main>
    </section>
  );
}