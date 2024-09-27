import { axiosInstance } from "./axios";
import { TMessageResponse } from "./response-types";

export const registerUser = async (
  email: string,
  password: string,
  token: string
) => {
  const { data } = await axiosInstance.post<TMessageResponse>(
    `/users/register`,
    {
      email,
      password,
      token,
    }
  );

  return data;
};
