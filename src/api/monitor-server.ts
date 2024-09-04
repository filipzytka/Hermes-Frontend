import { SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import {
  TServerDataChartResponse,
  TServerDataResponse,
} from "./response-types";

export const getServerData = () =>
  fetchRequest<TServerDataResponse>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/server/check`,
  });

export const getChartData = () =>
  fetchRequest<TServerDataChartResponse[]>({
    method: "GET",
    endpoint: `${SERVER_URL}/api/server/jobs`,
  });
