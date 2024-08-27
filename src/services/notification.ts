import { api } from "../config/axios";
import { Notification } from "../types/notification";

const baseUrl = "/notifications";

export const fireServerNotification = async (
  notification: Notification
): Promise<Notification> => {
  const response = await api.post(baseUrl, notification);
  return response.data;
};
