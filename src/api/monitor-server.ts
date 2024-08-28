import { MONITORED_SERVER_URL } from "./constants";
import { fetchRequest } from "./helpers";
import {
  TServerDataChartResponse,
  TServerDataResponse,
} from "./response-types";

export const getServerData = () =>
  fetchRequest<TServerDataResponse>({
    method: "GET",
    endpoint: `${MONITORED_SERVER_URL}/check`,
  });

export const getChartData = () =>
  fetchRequest<TServerDataChartResponse[]>({
    method: "GET",
    endpoint: `${MONITORED_SERVER_URL}/jobs`,
  });
