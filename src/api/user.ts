import axios from "axios";
import { SERVER_URL } from "./constants";
import { TMessageResponse } from "./response-types";

export const registerUser = async (
  email: string,
  password: string,
  token: string
) => {
  const { data } = await axios.post<TMessageResponse>(
    `${SERVER_URL}/api/users/register`,
    {
      email,
      password,
      token,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};
