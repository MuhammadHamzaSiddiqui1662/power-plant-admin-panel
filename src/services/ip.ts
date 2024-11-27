import { api } from "../config/axios";
import { BACKEND_URL } from "../config/constants";
import { RootState } from "../config/store";
import { IP } from "../types/ip";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "/admin/ips";

export const getIPs = async (filterQuery?: string): Promise<IP[]> => {
  const response = await api.get(`${baseUrl}${filterQuery || ""}`);
  return response.data;
};

export const getIPById = async (ipId: string): Promise<{ result: IP }> => {
  const response = await api.get(`${baseUrl}/${ipId}`);
  return response.data;
};

export const getIPDetailsById = async (
  ipId: string
): Promise<{ result: IP }> => {
  const response = await api.get(`${baseUrl}/${ipId}/details`);
  return response.data;
};

export const publishIp = async (ipId: string): Promise<{ result: IP }> => {
  const response = await api.put(`${baseUrl}/${ipId}/publish`);
  return response.data;
};

export const createIP = async (formData: FormData): Promise<{ result: IP }> => {
  const response = await api.post(baseUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateIP = async (
  ipId: string,
  formData: FormData
): Promise<{ result: IP }> => {
  const response = await api.put(`${baseUrl}/${ipId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteIP = async (ipId: string): Promise<{ result: IP }> => {
  const response = await api.delete(`${baseUrl}/${ipId}`);
  return response.data;
};

export const ipApi = createApi({
  reducerPath: "ipApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/ips`,
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
    getFilteredIps: build.query({
      query: (filter = "") => `?${filter}`,
    }),
    getIp: build.query({
      query: (id) => `/${id}`,
    }),
    updateIp: build.mutation({
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

export const { useUpdateIpMutation, useGetFilteredIpsQuery, useGetIpQuery } =
  ipApi;
