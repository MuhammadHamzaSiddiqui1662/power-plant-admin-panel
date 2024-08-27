import { Column } from "../types/saleDeed";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://power-plant-2a6a23ab8691.herokuapp.com/api/v1"
    : "http://localhost:3001/api/v1";

export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://power-plant-frontend.vercel.app"
    : "http://localhost:3000";

export const ROUTES = {
  dashboard: "",
  users: "users",
  signUp: "sign-up",
  signIn: "sign-in",
  forgotPassword: "forgot-password",
  verifyOtp: "verify-otp",
  profile: "profile",
  brokers: "brokers",
  approved: "approved",
  unapproved: "unapproved",
  suspended: "suspended",
  ip: "ip",
  published: "published",
  inactive: "inactive",
  draft: "draft",
  appliedForPatent: "appliedForPatent",
  pending: "pending",
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
  {
    id: "_id",
    label: "ID",
    minWidth: 100,
  },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    format: (value: number) => `$${value.toFixed(2)}`,
  },
  { id: "status", label: "Status", minWidth: 100 },
];

export const USERS_COLUMNS = [
  {
    id: "id",
    label: "ID",
    minWidth: 100,
  },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
  },
  { id: "status", label: "Status", minWidth: 100 },
];

export const BROKERS_COLUMNS = [
  {
    id: "id",
    label: "ID",
    minWidth: 100,
  },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
  },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "brokerStatus", label: "Broker Status", minWidth: 100 },
];

export const HIRINGS_COLUMNS = [
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
  },
  { id: "ip", label: "IP", minWidth: 100 },
];
