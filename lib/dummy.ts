/**
 * This file contains dummy data that is used temporarily
 * when developing the project
 */

import { BreadLink } from "types/crumbs";

export const crumbs: BreadLink[] = [
  {
    link: "/admins",
    textToDisplay: "Admins",
  },
  {
    link: "/admins/add",
    textToDisplay: "New Admin",
  },
];

export const verifyAdminCrumbs: BreadLink[] = [
  ...crumbs,
  {
    link: "/admins/add/verify",
    textToDisplay: "New Admin",
  },
];
