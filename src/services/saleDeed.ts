import { api } from "../config/axios";

const registrarRoute = "Registrar";

export const getSaleDeed = async () => {
  const { data } = await api.get(`/${registrarRoute}/saledeeds`);
  return data;
};

export const approveSaleDeed = async (saleDeedId: number) => {
  const { data } = await api.get(
    `/${registrarRoute}/approve?SaleDeedId=${saleDeedId}`
  );
  return data;
};

export const scheduleMeeting = async (
  saleDeedId: number,
  meetingDate: string
) => {
  const { data } = await api.post(`/${registrarRoute}/schedule-meeting`, {
    saleDeedId,
    meetingDate,
  });
  return data;
};
