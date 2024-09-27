import axios from "axios";
import { TMessageResponse } from "./response-types";

export const registerUser = async (
  email: string,
  password: string,
  token: string
) => {
  const { data } = await axios.post<TMessageResponse>(`/users/register`, {
    email,
    password,
    token,
  });

  return data;
};
