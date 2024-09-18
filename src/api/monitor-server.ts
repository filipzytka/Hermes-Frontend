import axios from "axios";
import { SERVER_URL } from "./constants";
import {
  TMessageResponse,
  TServerDataChartResponse,
  TServerDataResponse,
} from "./response-types";

export const getServerStatus = async () => {
  const { data, status } = await axios.get<TMessageResponse>(
    `${SERVER_URL}/api/server/status`,
    {
      withCredentials: true,
    }
  );

  return { data, status };
};

export const getRecentServerData = async () => {
  const { data, status } = await axios.get<TServerDataResponse>(
    `${SERVER_URL}/api/server`,
    {
      withCredentials: true,
    }
  );

  return { data, status };
};

export const getRecentPlayerData = async () => {
  const { data, status } = await axios.get<TServerDataChartResponse[]>(
    `${SERVER_URL}/api/server/players`,
    {
      withCredentials: true,
    }
  );
  return { data, status };
};
