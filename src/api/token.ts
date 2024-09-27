import axios from "axios";
import { TTokenResponse } from "./response-types";

export const generateToken = async (createdBy: string) => {
  const { data, status } = await axios.post<TTokenResponse>(
    `/invite/generate`,
    {
      createdBy,
    }
  );

  return { data, status };
};

export const validateToken = async (token: string) => {
  const { data, status } = await axios.get<TTokenResponse>(
    `/invite/validate?token=${token}`
  );

  return { data, status };
};
