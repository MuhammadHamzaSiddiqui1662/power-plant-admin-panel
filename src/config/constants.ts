export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.pwrplant.ca/api/v1"
    : "http://localhost:3001/api/v1";

export const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.pwrplant.ca"
    : "http://localhost:3000";

export const ROUTES = {
  signIn: "sign-in",
  dashboard: "",
  ips: "ips",
  users: "users",
  profile: "profile",
};

export const SEARCH_PARAMS = {
  redirect: "redirect",
  status: "status",
};

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
