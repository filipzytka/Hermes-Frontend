import { TTokenResponse } from "./response-types";
import { axiosInstance } from "./axios";

export const generateToken = async (createdBy: string) => {
  const { data, status } = await axiosInstance.post<TTokenResponse>(
    `/invite/generate`,
    {
      createdBy,
    }
  );

  return { data, status };
};

export const validateToken = async (token: string) => {
  const { data, status } = await axiosInstance.get<TTokenResponse>(
    `/invite/validate?token=${token}`
  );

  return { data, status };
};
