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

export const newArticleCrumbs: BreadLink[] = [
  {
    link: "/articles",
    textToDisplay: "Articles",
  },
  {
    link: "/articles/new",
    textToDisplay: "New article",
  },
];

const cityCrumbs: BreadLink[] = [
  {
    link: "/cities",
    textToDisplay: "Cities",
  },
];

export const newCityCrumbs: BreadLink[] = [
  ...cityCrumbs,
  {
    link: "/cities/new",
    textToDisplay: "New City",
  },
];

export const editCityCrumbs: BreadLink[] = [
  ...cityCrumbs,
  {
    link: "/cities/edit",
    textToDisplay: "Edit city",
  },
];

const partnerCategories: BreadLink[] = [
  {
    link: "/partner-categories",
    textToDisplay: "Partner Categories",
  },
];

export const newPartnerCategories: BreadLink[] = [
  ...partnerCategories,
  {
    link: "/partner-categories/new",
    textToDisplay: "New category",
  },
];

export const editPartnerCategories: BreadLink[] = [
  ...partnerCategories,
  {
    link: "/partner-categories/edit",
    textToDisplay: "Edit category",
  },
];

export const newOrganisation: BreadLink[] = [
  {
    link: "/organisations",
    textToDisplay: "Organisations",
  },
  {
    link: "/organisations/new",
    textToDisplay: "New Organisation",
  },
];

export const editOrganisation: BreadLink[] = [
  {
    link: "/organisations",
    textToDisplay: "Organisations",
  },
  {
    link: "/organisations/edit",
    textToDisplay: "Edit Organisation",
  },
];

export const newDataImports: BreadLink[] = [
  {
    link: "/data-imports",
    textToDisplay: "Data Imports",
  },
  {
    link: "/data-imports/new",
    textToDisplay: "New Data imports",
  },
];

export const statusDataImports: BreadLink[] = [
  {
    link: "/data-imports",
    textToDisplay: "Data Imports",
  },
  {
    link: "/data-imports/status",
    textToDisplay: "status",
  },
];

export const releases: BreadLink[] = [
  {
    link: "/releases",
    textToDisplay: "Releases",
  },
  {
    link: "/releases/status",
    textToDisplay: "status",
  },
];

export const newPreferenceGroup: BreadLink[] = [
  {
    link: "/preference-group",
    textToDisplay: "Preference Groups",
  },
  {
    link: "/preference-group/new",
    textToDisplay: "New preference group",
  },
];

export const statusPreferenceGroup: BreadLink[] = [
  {
    link: "/preference-group",
    textToDisplay: "Preference Groups",
  },
  {
    link: "/preference-group/status",
    textToDisplay: "Status",
  },
];

export const statusQuestions: BreadLink[] = [
  {
    link: "/questions",
    textToDisplay: "Questions",
  },
  {
    link: "/questions",
    textToDisplay: "Status",
  },
];

export const newQuestion: BreadLink[] = [
  {
    link: "/questions",
    textToDisplay: "Questions",
  },
  {
    link: "/questions/new",
    textToDisplay: "New Question",
  },
];

export const statusCategories: BreadLink[] = [
  {
    link: "/categories",
    textToDisplay: "Categories",
  },
  {
    link: "/categories",
    textToDisplay: "Status",
  },
];

export const newCategories: BreadLink[] = [
  {
    link: "/categories",
    textToDisplay: "Categories",
  },
  {
    link: "/categories/new",
    textToDisplay: "New Category",
  },
];
