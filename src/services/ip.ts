import { api } from "../config/axios";
import { IP } from "../types/ip";

const baseUrl = "/admin/ips";

export const getIPs = async (): Promise<IP[]> => {
  const response = await api.get(baseUrl);
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
