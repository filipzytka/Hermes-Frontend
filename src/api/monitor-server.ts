import {
  TMessageResponse,
  TServerDataChartResponse,
  TServerDataResponse,
} from "./response-types";
import { axiosInstance } from "./axios";

export const getServerStatus = async () => {
  const { data, status } = await axiosInstance.get<TMessageResponse>(
    `/server/status`
  );

  return { data, status };
};

export const getRecentServerData = async () => {
  const { data, status } = await axiosInstance.get<TServerDataResponse>(
    `/server`
  );

  return { data, status };
};

export const getRecentPlayerData = async () => {
  const { data, status } = await axiosInstance.get<TServerDataChartResponse[]>(
    `/server/players`
  );
  return { data, status };
};
