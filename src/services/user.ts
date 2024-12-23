import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../config/axios";
import { User } from "../types/user";
import { BACKEND_URL } from "../config/constants";
import { RootState } from "../config/store";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/users`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFilteredUsers: build.query({
      query: (filter = "") => `?${filter}`,
    }),
    getUser: build.query({
      query: (id) => `/${id}`,
    }),
    updateUser: build.mutation({
      query(body) {
        return {
          url: `/`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetFilteredUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
