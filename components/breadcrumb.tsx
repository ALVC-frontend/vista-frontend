"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BreadLink } from "../types/crumbs";

type Props = {
  crumbs: BreadLink[];
};

const BreadCrumb = ({ crumbs }: Props) => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {crumbs.map(({ link, textToDisplay }) => {
          const active = usePathname() === link;

          return (
            <li
              key={link}
              className={`${active ? "text-black" : "text-primary"}`}
            >
              <Link href={link}>{textToDisplay}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumb;
