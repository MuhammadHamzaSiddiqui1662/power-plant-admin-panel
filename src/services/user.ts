// services/user.ts

import { api } from "../config/axios";
import { User } from "../types/user";

const baseUrl = "/admin/users";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get(baseUrl);
  return response.data;
};

export const updateBrokerStatus = async (id: string, status: string) => {
  const response = await api.put(`${baseUrl}/${id}`, { brokerStatus: status });
  return response.data;
};

export const getUserHirings = async (id: string) => {
  const response = await api.get(`/admin/hirings/${id}`);
  return response.data;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const response = await api.put(`${baseUrl}/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};
