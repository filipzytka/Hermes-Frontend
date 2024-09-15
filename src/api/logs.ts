import axios from "axios";
import { SERVER_URL } from "./constants";
import { TLogsResponse } from "./response-types";
export const getLogs = async (pageNumber: number, pageSize: number) => {
  const { data } = await axios.get<TLogsResponse[]>(
    `${SERVER_URL}/api/log/get-logs/${pageNumber}/${pageSize}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
