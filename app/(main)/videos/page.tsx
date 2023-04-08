"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@components/index";

interface Video {
  id: number;
  name: string;
  description: string;
  partner: string;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string;
}

export default function Page() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get<Video[]>("http://localhost:4000/admin/videos");
        setVideos(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVideos();
  }, []);
 console.log(videos);
  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Videos</h3>
        </div>
        <div className="bg-white rounded-md flex items-center gap-x-2 p-2">
          <MagnifyingGlassIcon className="w-5 h-5 opacity-[0.44]" />
          <input
            type="text"
            placeholder="Search videos"
            className="outline-none border-none"
          />
        </div>
        <div className="">
          <Link href="/videos/new">
            <Button
              text="New video"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* Videos table  */}
      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-lightGray">Name</th>
              <th className="bg-lightGray">Description</th>
              <th className="bg-lightGray">Partner</th>
              <th className="bg-lightGray">Status</th>
              <th className="bg-lightGray">Published at</th>
            </tr>
          </thead>

          <tbody>
          {Array.isArray(videos) && videos.length > 0 ? (
  videos.map((video) => (
    console.log("Rendering video:", video.id),
    <tr key={video.id}>
      <td>
        <Link href={`/videos/${video.id}`}>
          <p>{video.name}</p>
        </Link>
      </td>
      <td>
        <p>{video.description}</p>
      </td>
      <td>
        <p className="text-primary">{video.partner}</p>
      </td>
      <td>
        <p>{video.status}</p>
      </td>
      <td>
        <p>{video.published_at}</p>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5}>No videos found.</td>
  </tr>
)}

          </tbody>
        </table>
      </article>
    </section>
  );
}
