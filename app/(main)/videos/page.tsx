import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@components/index";

export default function Page() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <header className="flex items-center justify-around my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Videos</h3>
        </div>
        <<div className="bg-white rounded-md flex items-center gap-x-2 p-2">
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
            {videos.map((video) => (
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
                <p className="badge bg-background text-primary text-sm border-background p-4">
                {video.published_at}
                </p>
              </td>
        
            </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
