import { TLogsResponse } from "./response-types";
import { axiosInstance } from "./axios";

export const getLogs = async (pageNumber: number, pageSize: number) => {
  const { data } = await axiosInstance.get<TLogsResponse>(
    `/log?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  return data;
};

export const searchLogs = async (
  pageNumber: number,
  pageSize: number,
  message: string
) => {
  const { data } = await axiosInstance.get<TLogsResponse>(
    `/log/search?pageNumber=${pageNumber}&pageSize=${pageSize}&message=${message}`
  );
  return data;
};
