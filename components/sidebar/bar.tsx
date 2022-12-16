"use client";

import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

import { SidebarItem } from "@components/index";

type Props = {
  sidebarItems: any;
};

const SideBar = ({ sidebarItems }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <div
        className={`col-span-1 md:flex flex-col gap-y-6 items-center my-10 ${
          isSidebarOpen
            ? "absolute bg-white w-[50vw] my-0 h-[100vh] top-0 z-20"
            : "hidden"
        }`}
      >
        {sidebarItems.map((item: any) => (
          <div className="w-4/5" key={item.name}>
            <h2 className="opacity-[0.44]">{item.name}</h2>
            {item.links.map(({ displayName, link }: any) => (
              <SidebarItem name={displayName} path={link} />
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

      <label className="btn bg-primary hover:bg-primary hover:border-primary border-primary btn-circle md:hidden absolute bottom-2 right-2 z-10 swap swap-rotate">
        <input type="checkbox" />

        {/* hamburger icon  */}
        <Bars3Icon
          onClick={toggleSideBar}
          className="w-6 h-6 swap-off fill-current"
        />

        {/* close icon  */}
        <XMarkIcon
          onClick={toggleSideBar}
          className="w-6 h-6 swap-on fill-current"
        />
      </label>
    </>
  );
};

export default SideBar;
