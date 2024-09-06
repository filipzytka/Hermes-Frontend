import axios from "axios";
import { SERVER_URL } from "./constants";
import { TMessageResponse, TServerDataResponse } from "./response-types";

export const getServerStatus = async () => {
  const { data, status } = await axios.get<TMessageResponse>(
    `${SERVER_URL}/api/server/status`,
    {
      withCredentials: true,
    }
  );

  return { data, status };
};

export const getServerData = async () => {
  const { data, status } = await axios.get<TServerDataResponse[]>(
    `${SERVER_URL}/api/server/get/data`,
    {
      withCredentials: true,
    }
  );

  return { data, status };
};
