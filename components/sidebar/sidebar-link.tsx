"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  name: string;
  path: string;
  toggle: () => void;
};

const SidebarItem = ({ name, path, toggle }: Props) => {
  const active = usePathname()?.startsWith(path);

  const router = useRouter();

  const navigate = () => {
    router.push(path);
    toggle();
  };

  return (
    <p
      className={`flex items-center gap-x-1 text-sm my-4 cursor-pointer p-2 ${
        active ? "text-white bg-primary rounded-md" : ""
      }`}
      onClick={navigate}
    >
      <PlayIcon className="w-4 h-4" /> {name}
    </p>
  );
};

export default SidebarItem;
