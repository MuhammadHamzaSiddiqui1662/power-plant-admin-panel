import { Column } from "../types/saleDeed";

export const ROUTES = {
  dashboard: "",
  signUp: "sign-up",
  signIn: "sign-in",
  forgotPassword: "forgot-password",
  verifyOtp: "verify-otp",
  cases: "cases",
  pending: "pending",
  inProgress: "in-progress",
  saleDeed: ":saleDeedId",
  profile: "profile",
  ip: "ip",
  published: "published",
  inactive: "inactive",
  draft: "draft",
  appliedForPatent: "appliedForPatent",
};

export const SEARCH_PARAMS = {
  redirect: "redirect",
  status: "status",
};

export const COLUMNS: Column[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 100,
  },
  {
    id: "plotId",
    label: "Plot ID",
    minWidth: 100,
  },
  {
    id: "stampValue",
    label: "Stamp Value",
    minWidth: 150,
    format: (value: number) =>
      value.toLocaleString("en-US", { style: "currency", currency: "PKR" }),
  },
  {
    id: "advanceAmount",
    label: "Advance Paid",
    minWidth: 150,

    format: (value: number) =>
      value.toLocaleString("en-US", { style: "currency", currency: "PKR" }),
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 150,

    format: (value: number) =>
      value.toLocaleString("en-US", { style: "currency", currency: "PKR" }),
  },
];

export const IP_COLUMNS = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    format: (value: number) => `$${value.toFixed(2)}`,
  },
  { id: "status", label: "Status", minWidth: 100 },
];
