import { api } from "../config/axios";
import { User } from "../types/user";

const baseUrl = "/admin/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(baseUrl);
  return response.data;
};
