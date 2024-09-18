import axios from "axios";
import { SERVER_URL } from "./constants";
import { TLogsResponse } from "./response-types";

export const getLogs = async (pageNumber: number, pageSize: number) => {
  const { data } = await axios.get<TLogsResponse>(
    `${SERVER_URL}/api/log?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const searchLogs = async (
  pageNumber: number,
  pageSize: number,
  message: string
) => {
  const { data } = await axios.get<TLogsResponse>(
    `${SERVER_URL}/api/log/search?pageNumber=${pageNumber}&pageSize=${pageSize}&message=${message}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
