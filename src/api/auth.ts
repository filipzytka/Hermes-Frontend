import axios from "axios";
import { SERVER_URL } from "./constants";
import { TAuthResponse } from "./response-types";

export const authenticateUser = async () => {
  const { data, status } = await axios.get<TAuthResponse>(
    `${SERVER_URL}/api/auth/check`,
    {
      withCredentials: true,
    }
  );
  return { data, status };
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await axios.post<TAuthResponse>(
    `${SERVER_URL}/api/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const logoutUser = async () => {
  await axios.post(`${SERVER_URL}/api/auth/logout`, {
    withCredentials: true,
  });
};
