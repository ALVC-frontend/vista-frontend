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

export const branchManagerCrumbs: BreadLink[] = [
  {
    link: "/branch-managers",
    textToDisplay: "Branch Managers",
  },
  {
    link: "/branch-managers/add",
    textToDisplay: "New Branch Manager",
  },
];

export const businessUnitCrumbs: BreadLink[] = [
  {
    link: "/business-unit",
    textToDisplay: "Business units",
  },
  {
    link: "/business-unit/add",
    textToDisplay: "New Business Unit",
  },
];

export const staffMembersCrumb: BreadLink[] = [
  {
    link: "/staff-members",
    textToDisplay: "Staff Members",
  },
];

export const addStaffMemberCrumb: BreadLink[] = [
  ...staffMembersCrumb,
  {
    link: "/staff-members/add",
    textToDisplay: "Add staff member",
  },
];

export const editStaffMemberCrumbs: BreadLink[] = [
  ...staffMembersCrumb,
  {
    link: "/staff-members/edit",
    textToDisplay: "Edit Staff Member",
  },
];

// -------Main navigation crumbs-------

const videoCrumbs: BreadLink[] = [
  {
    link: "/videos",
    textToDisplay: "Videos",
  },
];

export const newVideoCrumbs: BreadLink[] = [
  ...videoCrumbs,
  {
    link: "/videos/new",
    textToDisplay: "New Video",
  },
];

export const editVideoCrumbs: BreadLink[] = [
  ...videoCrumbs,
  {
    link: "/videos/edit",
    textToDisplay: "Edit Video",
  },
];
