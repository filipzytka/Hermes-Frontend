import { TAuthResponse } from "./response-types";
import { axiosInstance } from "./axios";

export const authenticateUser = async () => {
  const { data, status } = await axiosInstance.get<TAuthResponse>(
    `/auth/check`
  );
  return { data, status };
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await axiosInstance.post<TAuthResponse>(`/auth/login`, {
    email,
    password,
  });

  return data;
};

export const logoutUser = async () => {
  await axiosInstance.post(`/auth/logout`, {});
};
