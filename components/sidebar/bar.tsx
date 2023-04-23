"use client";

import {
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

import { SidebarItem } from "@components/index";

type Props = {
  sidebarItems: any;
};

const SideBar = ({ sidebarItems }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navBarDiv = useRef<HTMLDivElement>(null);

  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <div
        className={`col-span-1 md:flex h-[100vh] flex-col gap-y-6 overflow-y-auto items-center py-4`}
        //@ts-ignore
        ref={navBarDiv}
        onClick={(e: any) => {
          console.log(navBarDiv.current?.contains(e.target));
        }}
      >
        <div className="relative left-[85%]">
          <XMarkIcon
            className="w-6 h-6 cursor-pointer"
            onClick={toggleSideBar}
          />
        </div>
        {sidebarItems.map((item: any) => (
          <div className="w-4/5" key={item.name}>
            <h2 className="opacity-[0.44]">{item.name}</h2>
            {item.links.map(({ displayName, link }: any) => (
              <SidebarItem
                name={displayName}
                path={link}
                key={link}
                toggle={toggleSideBar}
              />
            ))}
          </div>
        ))}

        {/* Logout Button  */}
        <div className="flex flex-col w-4/5 justify-end items-start flex-grow">
          <p className="text-red-500 flex items-center gap-x-1">
            <ArrowLeftOnRectangleIcon className="w-8 h-8" />
            Logout
          </p>
        </div>
      </div>

      {/* swap to display the sidebar on mobile devices  */}

      {!isSidebarOpen && (
        <ChevronLeftIcon
          className="w-6 h-6 md:hidden absolute cursor-pointerm top-1/2 text-white -right-2 z-30 bg-primary rounded-full"
          onClick={toggleSideBar}
        />
      )}
    </>
  );
};

export default SideBar;
